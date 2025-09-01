package main

import (
	"context"
	"encoding/json"
	"fmt"
	"go_mongo/common"
	"go_mongo/models"
	"go_mongo/utils"
	"log"
	"net/http"
	"os"
	"sort"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func initMongo() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	fmt.Println("✅ MongoDB 已连接", os.Getenv("MONGO_URI"))

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err != nil {
		log.Fatal("连接失败:", err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Ping 失败:", err)
	}
	models.Client = client
	models.InitCollections(client.Database("ir"), client.Database("comm"))

	fmt.Println("✅ MongoDB 已连接")
}

func getStaffs(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	query := r.URL.Query()
	page, _ := strconv.Atoi(query.Get("page"))
	if page <= 0 {
		page = 1
	}
	pageSize, _ := strconv.Atoi(query.Get("pageSize"))
	if pageSize <= 0 {
		pageSize = 10
	}

	queryPayload := bson.M{"isBin": false}

	total, err := models.StaffCol.CountDocuments(ctx, queryPayload)
	if err != nil {
		http.Error(w, "CountDocuments 失败: "+err.Error(), http.StatusInternalServerError)
		return
	}

	ifPages := query.Get("ifPages") // 保持 string
	var findOptions *options.FindOptions

	// ✅ 这里设置 Projection 排除字段
	projection := bson.M{
		"password":    0,
		"specialCode": 0,
	}

	if ifPages == "true" {
		findOptions = options.Find().SetProjection(projection)
	} else {
		findOptions = options.Find().SetSkip(int64((page - 1) * pageSize)).SetLimit(int64(pageSize)).SetProjection(projection)
	}

	cursor, err := models.StaffCol.Find(ctx, queryPayload, findOptions)
	if err != nil {
		http.Error(w, "Find 失败: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var results []bson.M
	if err := cursor.All(ctx, &results); err != nil {
		http.Error(w, "Cursor 解析失败: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(bson.M{
		"code": http.StatusOK,
		"msg":  "查询成功",
		"payload": bson.M{
			"total": total,
			"data":  results,
		},
	})

}

func getPurchaseOrder(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	query := r.URL.Query()
	page, _ := strconv.Atoi(query.Get("page"))
	if page <= 0 {
		page = 1
	}
	pageSize, _ := strconv.Atoi(query.Get("pageSize"))
	if pageSize <= 0 {
		pageSize = 10
	}
	search := query.Get("search")
	auditStatus := query.Get("auditStatus")
	supplier := query.Get("supplier")
	ifPages := query.Get("ifPages")

	queryPayload := bson.M{"isBin": false}
	pendingQuery := bson.M{"isBin": false, "auditStatus": "pending"}
	rejectedQuery := bson.M{"isBin": false, "auditStatus": "rejected"}
	reviewQuery := bson.M{"isBin": false, "auditStatus": "review"}

	if search != "" {
		staffCur, _ := models.StaffCol.Find(ctx, bson.M{
			"isBin": false,
			"name":  bson.M{"$regex": search, "$options": "i"},
		})
		var staffResults []bson.M
		_ = staffCur.All(ctx, &staffResults)

		staffIDs := make([]primitive.ObjectID, 0, len(staffResults))
		for _, s := range staffResults {
			if id, ok := s["_id"].(primitive.ObjectID); ok {
				staffIDs = append(staffIDs, id)
			}
		}

		coCur, _ := models.CollectOrderCol.Find(ctx, bson.M{
			"code": bson.M{"$regex": search, "$options": "i"},
		})
		var coResults []bson.M
		_ = coCur.All(ctx, &coResults)
		coPurchaseOrderIDs := make([]primitive.ObjectID, 0, len(coResults))
		for _, co := range coResults {
			if poid, ok := co["purchaseOrder"].(primitive.ObjectID); ok {
				coPurchaseOrderIDs = append(coPurchaseOrderIDs, poid)
			}
		}

		poCur, _ := models.PurchaseOrderCol.Find(ctx, bson.M{
			"code": bson.M{"$regex": search, "$options": "i"},
		})
		var poResults []bson.M
		_ = poCur.All(ctx, &poResults)
		PurchaseOrderIDs := make([]primitive.ObjectID, 0, len(poResults))
		for _, co := range poResults {
			if poid, ok := co["purchaseOrder"].(primitive.ObjectID); ok {
				PurchaseOrderIDs = append(PurchaseOrderIDs, poid)
			}
		}

		orConditions := bson.A{
			bson.M{"code": bson.M{"$regex": search, "$options": "i"}},
			bson.M{"containerCode": bson.M{"$regex": search, "$options": "i"}},
		}

		if len(staffIDs) > 0 {
			orConditions = append(orConditions, bson.M{"purchaser": bson.M{"$in": staffIDs}})
			orConditions = append(orConditions, bson.M{"createdBy": bson.M{"$in": staffIDs}})
		}
		if len(coPurchaseOrderIDs) > 0 {
			orConditions = append(orConditions, bson.M{"_id": bson.M{"$in": coPurchaseOrderIDs}})
		}
		if len(PurchaseOrderIDs) > 0 {
			orConditions = append(orConditions, bson.M{"_id": bson.M{"$in": PurchaseOrderIDs}})
		}

		queryPayload["$or"] = orConditions
		pendingQuery["$or"] = orConditions
		rejectedQuery["$or"] = orConditions
		reviewQuery["$or"] = orConditions
	}

	if auditStatus != "" {
		queryPayload["auditStatus"] = auditStatus
	}

	if supplier != "" {
		snapshotCur, _ := models.SupplierSnapshotCol.Find(ctx, bson.M{"supplier": supplier})
		var snapshotResults []bson.M
		_ = snapshotCur.All(ctx, &snapshotResults)
		ids := make([]primitive.ObjectID, 0, len(snapshotResults))
		for _, s := range snapshotResults {
			if id, ok := s["_id"].(primitive.ObjectID); ok {
				ids = append(ids, id)
			}
		}

		queryPayload["supplierSnapshot"] = bson.M{"$in": ids}
		pendingQuery["supplierSnapshot"] = bson.M{"$in": ids}
		rejectedQuery["supplierSnapshot"] = bson.M{"$in": ids}
		reviewQuery["supplierSnapshot"] = bson.M{"$in": ids}
	}

	total, _ := models.PurchaseOrderCol.CountDocuments(ctx, queryPayload)
	var pendingTotal, rejectedTotal, reviewTotal int64

	sortOption := bson.D{{Key: "_id", Value: -1}}
	if auditStatus != "" {
		pendingTotal, _ = models.PurchaseOrderCol.CountDocuments(ctx, pendingQuery)
		rejectedTotal, _ = models.PurchaseOrderCol.CountDocuments(ctx, rejectedQuery)
		reviewTotal, _ = models.PurchaseOrderCol.CountDocuments(ctx, reviewQuery)
		switch auditStatus {
		case "review":
			sortOption = bson.D{{Key: "firstPassAt", Value: 1}}
		case "rejected":
			sortOption = bson.D{{Key: "rejectionAt", Value: 1}}
		case "confirmed":
			sortOption = bson.D{{Key: "reviewPassAt", Value: -1}}
		default:
			sortOption = bson.D{{Key: "_id", Value: 1}}
		}
	}

	var findOptions *options.FindOptions

	if ifPages == "true" {
		findOptions = options.Find().SetSort(sortOption)
	} else {
		findOptions = options.Find().SetSkip(int64((page - 1) * pageSize)).SetLimit(int64(pageSize)).SetSort(sortOption)
	}
	// 具体逻辑
	cursor, err := models.PurchaseOrderCol.Find(ctx, queryPayload, findOptions)
	if err != nil {
		http.Error(w, "查询采购订单失败: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	// 真正要看结果：要么用 for 循环，要么用 All
	var results []bson.M
	if err := cursor.All(ctx, &results); err != nil {
		log.Fatal("解析失败:", err)
	}

	// 查询全局信息
	globalInfo := models.GlobalCol.FindOne(ctx, bson.M{})
	var global bson.M
	_ = globalInfo.Decode(&global)

	// 处理每个po
	var pos []bson.M

	for _, re := range results {
		// 直接拷贝
		po := re

		// 展开 supplierSnapshot
		var supplier models.SupplierSnapshot // ✅ 使用结构体接收结果
		if snapshotID, ok := po["supplierSnapshot"].(primitive.ObjectID); ok {
			err := models.SupplierSnapshotCol.FindOne(ctx, bson.M{"_id": snapshotID}).Decode(&supplier)
			if err == nil {
				po["supplierSnapshot"] = supplier
			} else {
				po["supplierSnapshot"] = nil
			}
		} else {
			po["supplierSnapshot"] = nil
		}
		// 查询采集单信息
		co := models.CollectOrderCol.FindOne(ctx, bson.M{
			"purchaseOrder": po["_id"],
			"isBin":         false,
		})
		var coData bson.M
		if co.Err() == nil {
			_ = co.Decode(&coData)
			// 查询采集单项
			coItemCur, _ := models.CollectOrderItemCol.Find(ctx, bson.M{
				"collectOrder": coData["_id"],
			})

			var coItems []bson.M
			_ = coItemCur.All(ctx, &coItems)

			for i, item := range coItems {
				poItemID, ok := item["purchaseOrderItem"].(primitive.ObjectID)
				if !ok {
					continue
				}

				var poItemDoc bson.M
				err := models.PurchaseOrderItemCol.FindOne(ctx, bson.M{"_id": poItemID}).Decode(&poItemDoc)
				if err != nil {
					continue
				}
				coItems[i]["purchaseOrderItem"] = poItemDoc
			}

			// 准备 Good 切片，单位换算 quantity = paymentQuantity / ratio
			var goods []utils.Good
			for _, item := range coItems {
				poItemRaw, ok := item["purchaseOrderItem"].(bson.M)
				if !ok {
					continue
				}

				unitPrice, ok := utils.ToFloat64(poItemRaw["unitPrice"])
				if !ok {
					unitPrice = 0
				}

				paymentQuantity, ok := utils.ToFloat64(poItemRaw["paymentQuantity"])
				if !ok {
					paymentQuantity = 0
				}

				quantity, ok := utils.ToFloat64(poItemRaw["quantity"])
				if !ok {
					quantity = 0
				}

				// 拿 operationUnit 里的 ratio
				ratio := 1.0 // 外层变量
				if opUnit, ok := poItemRaw["operationUnit"].(bson.M); ok {
					r, ok := utils.ToFloat64(opUnit["ratio"])
					if ok {
						ratio = r
					} else {
						ratio = 0
					}
				}
				// 如果 ratio 最终还是 0，强制改成 1，防止除以 0 panic
				if ratio == 0 {
					ratio = 1
				}
				goods = append(goods, utils.Good{
					UnitPrice:        unitPrice,
					DeliveryQuantity: paymentQuantity / ratio,
					Quantity:         quantity,
				})
			}

			// 计算原始小计
			orgSubtotal := utils.ComputedOrgSubtotal(goods)

			// 查找匹配的 GST 率
			crtGstRatio := 0.0
			expectedOn, ok := po["expectedOn"].(primitive.DateTime)
			if ok {
				if gstRatesRaw, ok := global["gstRates"].(primitive.A); ok {
					for _, g := range gstRatesRaw {
						gstMap, ok := g.(bson.M)
						if !ok {
							continue
						}
						gstStart, ok1 := gstMap["gstStart"].(primitive.DateTime)
						gstEnd, ok2 := gstMap["gstEnd"].(primitive.DateTime)
						poGst, ok3 := utils.ToFloat64(gstMap["poGst"])

						if !ok1 || !ok2 || !ok3 {
							continue
						}
						if expectedOn.Time().After(gstStart.Time()) && expectedOn.Time().Before(gstEnd.Time()) {
							crtGstRatio = poGst
							break
						}
					}
				}
			}

			// 读取其他费用
			otherFee := 0.0
			if po["otherFee"] != nil {
				otherFee, _ = utils.ToFloat64(po["otherFee"])
			}

			// 计算最终含GST总价
			supplier := po["supplierSnapshot"].(models.SupplierSnapshot)
			result := utils.ComputedSubtotal(orgSubtotal, supplier, otherFee, crtGstRatio)

			// 赋值
			po["collectTotal"] = result.Total
			po["collectAt"] = coData["createdAt"]
			po["freezeAt"] = coData["freezeAt"]

			// 查询采集人
			if collectByStr, ok := po["collectBy"].(string); ok {
				objectId, err := primitive.ObjectIDFromHex(collectByStr)
				if err == nil {
					staff := models.StaffCol.FindOne(ctx, bson.M{"_id": objectId})
					var staffData bson.M
					if staff.Err() == nil {
						_ = staff.Decode(&staffData)
						po["collectBy"] = staffData["name"]
					}
				} else {
					po["collectBy"] = collectByStr
				}
			}

			po["collectOrder"] = bson.M{
				"code": coData["code"],
				"_id":  coData["_id"],
			}
		}

		// 处理采购订单关联信息
		if purchaseOrders, ok := po["purchaseOrders"].(bson.A); !ok || purchaseOrders == nil {
			po["purchaseOrders"] = bson.A{}
		}

		// ===== 1️⃣ 批量查询 purchaseOrders 详情 =====
		if poIDs, ok := po["purchaseOrders"].(primitive.A); ok {
			var purchaseOrderSnapshots []bson.M

			for _, poIDRaw := range poIDs {
				poID, ok := poIDRaw.(primitive.ObjectID)
				if !ok {
					continue
				}
				poDoc := models.PurchaseOrderCol.FindOne(ctx, bson.M{"_id": poID},
					options.FindOne().SetProjection(bson.M{"code": 1, "createdAt": 1}))
				var poData bson.M
				if poDoc.Err() == nil {
					_ = poDoc.Decode(&poData)
					purchaseOrderSnapshots = append(purchaseOrderSnapshots, poData)
				}
			}
			if purchaseOrderSnapshots == nil {
				purchaseOrderSnapshots = []bson.M{}
			}
			po["purchaseOrders"] = purchaseOrderSnapshots
		} else {
			po["purchaseOrders"] = nil
		}

		// ===== 2️⃣ 批量排序并标记是否为原始单 =====
		if purchaseOrders, ok := po["purchaseOrders"].(bson.A); ok && len(purchaseOrders) > 0 {
			// 取主单创建时间
			createdAtRaw, ok := po["createdAt"]
			if !ok {
				createdAtRaw = primitive.NewDateTimeFromTime(time.Now())
			}
			createdAt, ok := createdAtRaw.(primitive.DateTime)
			if !ok {
				createdAt = primitive.NewDateTimeFromTime(time.Now())
			}

			// 判断是否存在比主单更早的子单
			isOrigin := true
			for _, orderRaw := range purchaseOrders {
				order, ok := orderRaw.(bson.M)
				if !ok {
					continue
				}
				orderCreatedAtRaw, ok := order["createdAt"]
				if !ok {
					continue
				}
				orderCreatedAt, ok := orderCreatedAtRaw.(primitive.DateTime)
				if !ok {
					continue
				}
				if orderCreatedAt.Time().Before(createdAt.Time()) {
					isOrigin = false
					break
				}
			}

			// 按创建时间升序排序子单
			sort.Slice(purchaseOrders, func(i, j int) bool {
				oi := purchaseOrders[i].(bson.M)
				oj := purchaseOrders[j].(bson.M)
				oiTime := oi["createdAt"].(primitive.DateTime)
				ojTime := oj["createdAt"].(primitive.DateTime)
				return oiTime.Time().Before(ojTime.Time())
			})

			// 标记第一个子单是 origin
			for idx, orderRaw := range purchaseOrders {
				order, ok := orderRaw.(bson.M)
				if ok {
					order["isOrigin"] = (idx == 0)
				}
			}

			// 重新赋值回 po["purchaseOrders"]
			po["purchaseOrders"] = purchaseOrders
			po["isOrigin"] = isOrigin
		} else {
			po["isOrigin"] = true
		}

		// 查询产品总数
		productTotal, _ := models.PurchaseOrderItemCol.CountDocuments(ctx, bson.M{
			"purchaseOrder": po["_id"],
			"isBin":         false,
		})
		po["productTotal"] = productTotal

		// 查询库存记录
		isStock := models.StockRecordCol.FindOne(ctx, bson.M{
			"purchaseOrder": po["_id"],
			"type":          "in",
			"scope":         "purchase",
		})
		po["isStock"] = isStock.Err() == nil

		// 查询发票
		invoice := models.SupplierInvoiceCol.FindOne(ctx, bson.M{
			"status": "valid",
			"purchaseOrders": bson.M{
				"$elemMatch": bson.M{"$eq": po["_id"]},
			},
		})
		po["isInvoice"] = invoice.Err() == nil

		// ===== 2️⃣ departments =====
		if deptIDs, ok := po["departments"].(primitive.A); ok {
			var departments []bson.M

			for _, deptIDRaw := range deptIDs {
				deptID, ok := deptIDRaw.(primitive.ObjectID)
				if !ok {
					continue
				}
				deptDoc := models.DepartmentCol.FindOne(ctx, bson.M{"_id": deptID},
					options.FindOne().SetProjection(bson.M{"nameCn": 1, "nameEn": 1}))
				var deptData bson.M
				if deptDoc.Err() == nil {
					_ = deptDoc.Decode(&deptData)
					departments = append(departments, deptData)
				}
			}

			po["departments"] = departments
		} else {
			po["departments"] = []bson.M{}
		}

		// ===== 3️⃣ sortingCenter =====
		if sortingCenterID, ok := po["sortingCenter"].(primitive.ObjectID); ok {
			scDoc := models.SortingCenterCol.FindOne(ctx, bson.M{"_id": sortingCenterID},
				options.FindOne().SetProjection(bson.M{"nameCn": 1, "nameEn": 1}))
			var scData bson.M
			if scDoc.Err() == nil {
				_ = scDoc.Decode(&scData)
				po["sortingCenter"] = scData
			} else {
				po["sortingCenter"] = nil
			}
		} else {
			po["sortingCenter"] = nil
		}

		// 查询流程信息
		var auditProcess []bson.M
		procCur, _ := models.PurchaseOrderProcessCol.Find(ctx, bson.M{
			"purchaseOrder": po["_id"],
			"processType":   "audit",
		}, options.Find().SetSort(bson.D{{Key: "_id", Value: -1}}))

		var procList []bson.M
		_ = procCur.All(ctx, &procList)

		// 筛选初审和复审
		for _, proc := range procList {
			if proc["operationDesc"] == "初审审核" || proc["operationDesc"] == "复审审核" {
				if createdBy, ok := proc["createdBy"].(primitive.ObjectID); ok {
					staff := models.StaffCol.FindOne(ctx, bson.M{"_id": createdBy})
					var staffData bson.M
					if staff.Err() == nil {
						_ = staff.Decode(&staffData)
						proc["createdBy"] = staffData["name"]
					}
				}
				auditProcess = append(auditProcess, proc)
			}
		}
		if auditProcess == nil {
			auditProcess = []bson.M{}
		}
		po["auditProcess"] = auditProcess

		// 查询发票流程
		invoiceProc := models.PurchaseOrderProcessCol.FindOne(ctx, bson.M{
			"purchaseOrder": po["_id"],
			"processType":   "invoice",
		}, options.FindOne().SetSort(bson.D{{Key: "_id", Value: -1}}))

		var invoiceProcData bson.M
		if invoiceProc.Err() == nil {
			_ = invoiceProc.Decode(&invoiceProcData)
			po["processInvoiceTotal"] = invoiceProcData["invoiceTotal"]
		}

		if createdByStr, ok := po["createdBy"].(string); ok {
			// 你数据库的用户_id是字符串，需要转换成 ObjectID 查询
			objectId, err := primitive.ObjectIDFromHex(createdByStr)
			if err == nil {
				staff := models.StaffCol.FindOne(ctx, bson.M{"_id": objectId})
				var staffData bson.M
				if staff.Err() == nil {
					_ = staff.Decode(&staffData)
					po["createdBy"] = staffData["name"]
				}
			} else {
				// 如果转换失败，说明ID无效，可以直接返回字符串（或留空）
				po["createdBy"] = createdByStr
			}
		}

		if purchaserStr, ok := po["purchaser"].(string); ok {
			// 你数据库的用户_id是字符串，需要转换成 ObjectID 查询
			objectId, err := primitive.ObjectIDFromHex(purchaserStr)
			if err == nil {
				staff := models.StaffCol.FindOne(ctx, bson.M{"_id": objectId})
				var staffData bson.M
				if staff.Err() == nil {
					_ = staff.Decode(&staffData)
					po["purchaser"] = staffData["name"]
					po["purchaserId"] = po["purchaser"]
				}
			} else {
				// 如果转换失败，说明ID无效，可以直接返回字符串（或留空）
				po["purchaser"] = purchaserStr
				po["purchaserId"] = po["purchaser"]
			}
		}

		if reviewerStr, ok := po["reviewer"].(string); ok {
			// 你数据库的用户_id是字符串，需要转换成 ObjectID 查询
			objectId, err := primitive.ObjectIDFromHex(reviewerStr)
			if err == nil {
				staff := models.StaffCol.FindOne(ctx, bson.M{"_id": objectId})
				var staffData bson.M
				if staff.Err() == nil {
					_ = staff.Decode(&staffData)
					po["reviewer"] = staffData["name"]
				}
			} else {
				// 如果转换失败，说明ID无效，可以直接返回字符串（或留空）
				po["reviewer"] = reviewerStr
			}
		}

		pos = append(pos, po)
	}

	common.WriteSuccess(w,
		bson.M{
			"total":         total,
			"data":          pos,
			"pendingTotal":  pendingTotal,
			"rejectedTotal": rejectedTotal,
			"reviewTotal":   reviewTotal,
		},
		"查询成功")
}

type PurchaseOrderProcessDTO struct {
	InvoiceTotal      float64   `json:"invoiceTotal"`
	Invoices          *[]string `json:"invoices"`
	IsAudit           bool      `json:"isAudit"`
	Remark            string    `json:"remark"`
	PurchaseOrder     string    `json:"purchaseOrder"`
	CustomsImportForm string    `json:"customsImportForm"`
}

func createPurchaseOrderProcess(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	user, ok := common.GetUserFromContext(r.Context())
	if !ok {
		http.Error(w, "未登录或身份验证失败", http.StatusUnauthorized)
		return
	}

	// 2. 解析 JSON 请求体
	var dto PurchaseOrderProcessDTO
	if err := json.NewDecoder(r.Body).Decode(&dto); err != nil {
		http.Error(w, "请求体错误", http.StatusBadRequest)
		return
	}

	// 转换字符串为 ObjectID
	objectID, err := primitive.ObjectIDFromHex(dto.PurchaseOrder)
	if err != nil {
		http.Error(w, "无效的 purchaseOrder ID", http.StatusBadRequest)
		return
	}

	filter := bson.M{"_id": objectID}

	// 查询 PurchaseOrder
	var purchaseOrder bson.M
	err = models.PurchaseOrderCol.FindOne(ctx, filter).Decode(&purchaseOrder)
	if err != nil {
		common.WriteError(w, http.StatusConflict, "无效的采购单")
		return
	}

	coFilter := bson.D{
		{Key: "purchaseOrder", Value: objectID}, // 注意 purchaseOrder.ID 应为 ObjectID 类型
	}
	var collectOrder bson.M
	err = models.CollectOrderCol.FindOne(ctx, coFilter).Decode(&collectOrder)
	if err != nil {
		common.WriteError(w, http.StatusConflict, "无效的采购单")
		return
	}

	// 展开 supplierSnapshot
	var supplier models.SupplierSnapshot // ✅ 使用结构体接收结果
	if snapshotID, ok := purchaseOrder["supplierSnapshot"].(primitive.ObjectID); ok {
		err := models.SupplierSnapshotCol.FindOne(ctx, bson.M{"_id": snapshotID}).Decode(&supplier)
		if err == nil {
			purchaseOrder["supplierSnapshot"] = supplier
		} else {
			purchaseOrder["supplierSnapshot"] = nil
		}
	} else {
		purchaseOrder["supplierSnapshot"] = nil
	}

	// 查询全局信息
	globalInfo := models.GlobalCol.FindOne(ctx, bson.M{})
	var global bson.M
	_ = globalInfo.Decode(&global)

	// 查询 poItems
	poCursor, err := models.PurchaseOrderItemCol.Find(ctx, bson.M{
		"purchaseOrder": objectID,
		"isBin":         false,
	})
	if err != nil {
		log.Println("查询 poItems 失败:", err)
		return
	}
	var poItems []models.PurchaseOrderItem
	if err := poCursor.All(ctx, &poItems); err != nil {
		log.Println("解析 poItems 失败:", err)
		return
	}

	// 收集 poItem 的 ID
	var allPoItemIDs []primitive.ObjectID
	for _, po := range poItems {
		allPoItemIDs = append(allPoItemIDs, po.ID)
	}

	// 查询 coItems
	coCursor, err := models.CollectOrderItemCol.Find(ctx, bson.M{
		"purchaseOrder":     objectID,
		"purchaseOrderItem": bson.M{"$in": allPoItemIDs},
	})
	if err != nil {
		log.Println("查询 coItems 失败:", err)
		return
	}
	var coItems []models.CollectOrderItem
	if err := coCursor.All(ctx, &coItems); err != nil {
		log.Println("解析 coItems 失败:", err)
		return
	}

	// 构建 coItemMap
	coItemMap := make(map[primitive.ObjectID]models.CollectOrderItem)
	for _, co := range coItems {
		coItemMap[co.PurchaseOrderItem] = co
	}

	// 构建 goods
	var goods []utils.Good
	// 假设你定义了一个结构体 GoodItem{ UnitPrice float64, Quantity float64 }
	for _, poItem := range poItems {
		coItem, ok := coItemMap[poItem.ID]
		if !ok {
			continue
		}

		// 拿 operationUnit 里的 ratio
		ratio := 1.0
		if poItem.OperationUnit != nil {
			ratio = poItem.OperationUnit.Ratio
		}
		// 防止 ratio = 0 导致除零
		if ratio == 0 {
			ratio = 1
		}

		quantity, ok := utils.ToFloat64(poItem.Quantity)
		if !ok {
			quantity = 0
		}

		unitPrice, ok := utils.ToFloat64(poItem.UnitPrice)
		if !ok {
			unitPrice = 0
		}

		paymentQuantity, ok := utils.ToFloat64(coItem.PaymentQuantity)
		if !ok {
			paymentQuantity = 0
		}

		goods = append(goods, utils.Good{
			UnitPrice:        unitPrice,
			DeliveryQuantity: paymentQuantity / ratio,
			Quantity:         quantity,
		})
	}
	// 查找匹配的 GST 率
	crtGstRatio := 0.0
	expectedOn, ok := purchaseOrder["expectedOn"].(primitive.DateTime)
	if ok {
		if gstRatesRaw, ok := global["gstRates"].(primitive.A); ok {
			for _, g := range gstRatesRaw {
				gstMap, ok := g.(bson.M)
				if !ok {
					continue
				}
				gstStart, ok1 := gstMap["gstStart"].(primitive.DateTime)
				gstEnd, ok2 := gstMap["gstEnd"].(primitive.DateTime)
				poGst, ok3 := utils.ToFloat64(gstMap["poGst"])

				if !ok1 || !ok2 || !ok3 {
					continue
				}
				if expectedOn.Time().After(gstStart.Time()) && expectedOn.Time().Before(gstEnd.Time()) {
					crtGstRatio = poGst
					break
				}
			}
		}
	}
	// 计算总价
	orgSubtotal := utils.ComputedOrgSubtotal(goods)
	otherFee, ok := utils.ToFloat64(purchaseOrder["otherFee"])
	if !ok {
		otherFee = 0
	}
	grTotal := utils.ComputedSubtotal(
		orgSubtotal,
		supplier,
		otherFee,
		crtGstRatio,
	)

	auditTeam := global["auditTeam"]
	reviewAuditTeam := global["reviewAuditTeam"]

	var desc string
	if dto.Invoices != nil && len(*dto.Invoices) > 0 {
		desc = "采购上传INVOICE"
	} else {
		desc = "管理层审核"

		// 查询审核流程记录（倒序找最后一条）
		var poProcess bson.M
		err := models.PurchaseOrderProcessCol.
			FindOne(ctx, bson.M{
				"purchaseOrder": purchaseOrder,
				"processType":   "audit",
			}, options.FindOne().SetSort(bson.D{{Key: "_id", Value: -1}})).
			Decode(&poProcess)

		if err != nil && err != mongo.ErrNoDocuments {
			http.Error(w, "查询流程记录失败", http.StatusInternalServerError)
			return
		}

		if purchaseOrder["auditStatus"] == "rejected" {
			descStr := "已被他人拒绝，无需再审"
			if poProcess["operationDesc"] == "初审审核" {
				descStr = "已被他人初审拒绝，无需再审"
			} else {
				descStr = "已被他人复审拒绝，无需再审"
			}
			common.WriteError(w, http.StatusConflict, descStr)
			return
		}

		var auditType string
		var ifAudit bool

		userID := user.ID

		auditTeamArr, ok := auditTeam.(primitive.A)
		if !ok {
			http.Error(w, "auditTeam 类型错误", http.StatusInternalServerError)
			return
		}

		for _, v := range auditTeamArr {
			idStr, ok := v.(string)
			if !ok {
				continue
			}
			if idStr == userID {
				auditType = "pending"
				break
			}
		}

		reviewAuditTeamArr, ok := reviewAuditTeam.(primitive.A)
		if !ok {
			http.Error(w, "reviewAuditTeam 类型错误", http.StatusInternalServerError)
			return
		}

		for _, v := range reviewAuditTeamArr {
			idStr, ok := v.(string)
			if !ok {
				continue
			}
			if idStr == userID {
				auditType = "review"
				break
			}
		}

		// 判断当前审核状态是否包含该审核人
		switch purchaseOrder["auditStatus"] {
		case "pending":
			for _, id := range auditTeamArr {
				if id == userID {
					ifAudit = true
					break
				}
			}
		case "review":
			for _, id := range reviewAuditTeamArr {
				if id == userID {
					ifAudit = true
					break
				}
			}
		}

		if !ifAudit {
			var msg string
			switch {
			case auditType == "pending" && purchaseOrder["auditStatus"] == "review":
				msg = "已被他人初审通过，无需再审"
			case auditType == "review" && purchaseOrder["auditStatus"] == "confirmed":
				msg = "已被他人复审通过，无需再审"
			default:
				msg = "您不是当前层级审核人"
			}
			common.WriteError(w, http.StatusConflict, msg)
			return
		}
	}

	var status string
	isUploadInvoice := false

	if dto.Invoices == nil {
		// 这里假设 isAudit 是一个 bool 变量，表示是否审核通过
		switch dto.IsAudit {
		case true:
			if purchaseOrder["auditStatus"] == "pending" {
				status = "review"
			} else {
				status = "confirmed"
			}
		default:
			status = "rejected"
		}
	}

	updatePayload := bson.M{} // 使用 MongoDB 更新结构体

	// 上传 invoices 时变更 po 审核状态
	if dto.Invoices != nil {
		status = "pending"
		isUploadInvoice = true
	}

	// 有 status 才更新 PO 状态
	if status != "" {
		updatePayload["auditStatus"] = status
	}
	fmt.Printf("status %+v\n", status)

	// 上传发票则附加字段
	if isUploadInvoice {
		updatePayload["isUploadInvoice"] = isUploadInvoice
		updatePayload["customsImportForm"] = dto.CustomsImportForm
	}

	endDesc := desc
	if desc == "管理层审核" {
		if purchaseOrder["auditStatus"] == "pending" {
			endDesc = "初审审核"
		} else {
			endDesc = "复审审核"
		}
	}

	// 审核通过时记录通过时间
	if dto.IsAudit && endDesc == "初审审核" {
		updatePayload["firstPassAt"] = time.Now()
	}
	if dto.IsAudit && endDesc == "复审审核" {
		updatePayload["reviewPassAt"] = time.Now()
	}

	// 审核拒绝时记录拒绝时间
	if !dto.IsAudit && (endDesc == "初审审核" || endDesc == "复审审核") {
		updatePayload["rejectionAt"] = time.Now()
	}

	fmt.Printf("updatePayload %+v\n", updatePayload)
	if len(updatePayload) > 0 {
		filter := bson.D{{Key: "_id", Value: objectID}}
		_, err := models.PurchaseOrderCol.UpdateOne(ctx, filter, bson.M{
			"$set": updatePayload,
		})
		if err != nil {
			log.Printf("更新采购订单失败: %v\n", err)
			// 这里可以处理错误逻辑
		}
	}

	payload := bson.D{
		{Key: "purchaseOrder", Value: objectID},
		{Key: "collectOrder", Value: collectOrder["_id"]},
		{Key: "processType", Value: func() string {
			if desc == "管理层审核" {
				return "audit"
			}
			return "invoice"
		}()},
		{Key: "operationDesc", Value: func() string {
			if desc == "管理层审核" {
				if dto.IsAudit {
					if purchaseOrder["auditStatus"] == "pending" {
						return "初审审核"
					}
					return "复审审核"
				}
				if purchaseOrder["auditStatus"] == "pending" {
					return "初审审核"
				}
				return "复审审核"
			}
			return desc
		}()},
		{Key: "currency", Value: supplier.Currency},
		{Key: "contents", Value: bson.A{
			bson.D{
				{Key: "desc", Value: func() string {
					if desc == "管理层审核" {
						if dto.IsAudit {
							return "审核通过"
						}
						return "审核拒绝"
					}
					return desc + func() string {
						if desc != "管理层审核" {
							return "、K1/K2:" + dto.CustomsImportForm
						}
						return ""
					}()
				}()},
			},
		}},
		{Key: "total", Value: grTotal.Total},
		{Key: "createdBy", Value: user.ID},
		{Key: "remark", Value: dto.Remark},

		{Key: "isAudit", Value: dto.IsAudit},
		{Key: "createdAt", Value: time.Now()}, // 显式设置
		{Key: "isValid", Value: true},         // 显式设置
	}

	if desc != "管理层审核" {
		payload = append(payload, bson.E{Key: "invoiceTotal", Value: dto.InvoiceTotal})
		payload = append(payload, bson.E{Key: "invoices", Value: *dto.Invoices})
	}

	// 插入 MongoDB
	insertResult, err := models.PurchaseOrderProcessCol.InsertOne(ctx, payload)
	if err != nil {
		http.Error(w, "新增失败："+err.Error(), http.StatusInternalServerError)
		return
	}

	// 用插入的ID查询文档
	var newDoc bson.M
	filter = bson.M{"_id": insertResult.InsertedID}
	err = models.PurchaseOrderProcessCol.FindOne(ctx, filter).Decode(&newDoc)
	if err != nil {
		http.Error(w, "查询新增文档失败："+err.Error(), http.StatusInternalServerError)
		return
	}
	common.WriteSuccess(w, &newDoc, "新增成功")
}

func getPurchaseOrderProcess(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	query := r.URL.Query()
	purchaseOrderStr := query.Get("purchaseOrder")
	// 将字符串转换为 ObjectID
	purchaseOrderID, err := primitive.ObjectIDFromHex(purchaseOrderStr)
	if err != nil {
		common.WriteError(w, http.StatusConflict, "无效的PO")
		return
	}
	queryPayload := bson.M{"purchaseOrder": purchaseOrderID}
	total, _ := models.PurchaseOrderProcessCol.CountDocuments(ctx, queryPayload)

	cursor, err := models.PurchaseOrderProcessCol.Find(ctx, queryPayload, options.Find())
	if err != nil {
		http.Error(w, "Find 失败: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var results []bson.M
	if err := cursor.All(ctx, &results); err != nil {
		log.Fatal("解析失败:", err)
	}

	// 1. 提取所有 productId 和 purchaseOrderItemId
	productIDsMap := map[primitive.ObjectID]struct{}{}
	poItemIDsMap := map[primitive.ObjectID]struct{}{}

	for _, re := range results {
		if contents, ok := re["contents"].(primitive.A); ok {
			for _, c := range contents {
				if contMap, ok := c.(bson.M); ok {
					if pid, ok := contMap["product"].(primitive.ObjectID); ok {
						productIDsMap[pid] = struct{}{}
					}
					if poiid, ok := contMap["purchaseOrderItem"].(primitive.ObjectID); ok {
						poItemIDsMap[poiid] = struct{}{}
					}
				}
			}
		}
	}

	// 转换为 slice
	var productIDs, poItemIDs []primitive.ObjectID
	for id := range productIDsMap {
		productIDs = append(productIDs, id)
	}
	for id := range poItemIDsMap {
		poItemIDs = append(poItemIDs, id)
	}

	// 2. 并发查找 Product 和 PurchaseOrderItem
	productCh := make(chan map[string]bson.M)
	poItemCh := make(chan map[string]bson.M)

	go func() {
		cursor, _ := models.ProductCol.Find(ctx, bson.M{"_id": bson.M{"$in": productIDs}},
			options.Find().SetProjection(bson.M{
				"nameCn": 1,
				"nameEn": 1,
				"unitCn": 1,
				"unitEn": 1,
			}))
		defer cursor.Close(ctx)
		productMap := make(map[string]bson.M)
		var products []bson.M
		_ = cursor.All(ctx, &products)
		for _, p := range products {
			id := p["_id"].(primitive.ObjectID).Hex()
			productMap[id] = p
		}
		productCh <- productMap
	}()

	go func() {
		cursor, _ := models.PurchaseOrderItemCol.Find(ctx, bson.M{"_id": bson.M{"$in": poItemIDs}},
			options.Find().SetProjection(bson.M{"operationUnit": 1}))
		defer cursor.Close(ctx)
		poItemMap := make(map[string]bson.M)
		var poItems []bson.M
		_ = cursor.All(ctx, &poItems)
		for _, p := range poItems {
			id := p["_id"].(primitive.ObjectID).Hex()
			poItemMap[id] = p
		}
		poItemCh <- poItemMap
	}()

	productMap := <-productCh
	poItemMap := <-poItemCh
	var poProcesss []bson.M
	var findOneOptions *options.FindOneOptions
	for _, re := range results {
		poPr := re
		// projection 设置为排除字段
		findOneOptions = options.FindOne().SetProjection(bson.M{
			"code":   1,
			"status": 1,
		})

		if purchaseOrderID, ok := poPr["purchaseOrder"].(primitive.ObjectID); ok {
			var purchaseOrderData bson.M
			err := models.PurchaseOrderCol.FindOne(ctx, bson.M{"_id": purchaseOrderID}, findOneOptions).Decode(&purchaseOrderData)
			if err == nil {
				poPr["purchaseOrder"] = purchaseOrderData
			} else {
				poPr["purchaseOrder"] = nil
			}
		} else {
			poPr["purchaseOrder"] = nil
		}

		if collectOrderID, ok := poPr["collectOrder"].(primitive.ObjectID); ok {
			var collectOrderData bson.M
			err := models.CollectOrderCol.FindOne(ctx, bson.M{"_id": collectOrderID}, findOneOptions).Decode(&collectOrderData)
			if err == nil {
				poPr["collectOrder"] = collectOrderData
			} else {
				poPr["collectOrder"] = nil
			}
		} else {
			poPr["collectOrder"] = nil
		}

		if createdByStr, ok := poPr["createdBy"].(string); ok {
			// 你数据库的用户_id是字符串，需要转换成 ObjectID 查询
			objectId, err := primitive.ObjectIDFromHex(createdByStr)
			if err == nil {
				staff := models.StaffCol.FindOne(ctx, bson.M{"_id": objectId})
				var staffData bson.M
				if staff.Err() == nil {
					_ = staff.Decode(&staffData)
					poPr["createdBy"] = bson.M{
						"_id":  objectId,
						"name": staffData["name"],
					}
				} else {
					// 查询不到用户，仍然保留原始 ID
					poPr["createdBy"] = bson.M{
						"_id":  objectId,
						"name": "",
					}
				}
			} else {
				// 如果转换失败，说明ID无效，可以直接保留字符串
				poPr["createdBy"] = bson.M{
					"_id":  createdByStr,
					"name": "",
				}
			}
		}
		// 回填 contents 中的 product 和 purchaseOrderItem
		if contents, ok := poPr["contents"].(primitive.A); ok {
			var updatedContents []bson.M
			for _, c := range contents {
				if contMap, ok := c.(bson.M); ok {
					if pid, ok := contMap["product"].(primitive.ObjectID); ok {
						contMap["product"] = productMap[pid.Hex()]
					}
					if poiid, ok := contMap["purchaseOrderItem"].(primitive.ObjectID); ok {
						contMap["purchaseOrderItem"] = poItemMap[poiid.Hex()]
					}
					updatedContents = append(updatedContents, contMap)
				}
			}
			poPr["contents"] = updatedContents
		}
		poProcesss = append(poProcesss, poPr)
	}

	filter := bson.M{"_id": purchaseOrderID}
	projection := bson.M{
		"auditStatus":      1,
		"expectedOn":       1,
		"otherFee":         1,
		"supplierSnapshot": 1, // 必须先查出这个 ID，后面才能 populate
	}
	findOpts := options.FindOne().SetProjection(projection)

	var purchaseOrder bson.M
	err = models.PurchaseOrderCol.FindOne(ctx, filter, findOpts).Decode(&purchaseOrder)
	if err != nil {
		http.Error(w, "purchaseOrder not found", http.StatusNotFound)
		return
	}

	// 展开 supplierSnapshot
	var supplier models.SupplierSnapshot // ✅ 使用结构体接收结果
	if snapshotID, ok := purchaseOrder["supplierSnapshot"].(primitive.ObjectID); ok {
		err := models.SupplierSnapshotCol.FindOne(ctx, bson.M{"_id": snapshotID}).Decode(&supplier)
		if err == nil {
			purchaseOrder["supplierSnapshot"] = supplier
		} else {
			purchaseOrder["supplierSnapshot"] = nil
		}
	} else {
		purchaseOrder["supplierSnapshot"] = nil
	}
	// 查询全局信息
	globalInfo := models.GlobalCol.FindOne(ctx, bson.M{})
	var global bson.M
	_ = globalInfo.Decode(&global)

	// 查询 poItems
	poCursor, err := models.PurchaseOrderItemCol.Find(ctx, bson.M{
		"purchaseOrder": purchaseOrderID,
		"isBin":         false,
	})
	if err != nil {
		log.Println("查询 poItems 失败:", err)
		return
	}
	var poItems []models.PurchaseOrderItem
	if err := poCursor.All(ctx, &poItems); err != nil {
		log.Println("解析 poItems 失败:", err)
		return
	}

	// 收集 poItem 的 ID
	var allPoItemIDs []primitive.ObjectID
	for _, po := range poItems {
		allPoItemIDs = append(allPoItemIDs, po.ID)
	}

	// 查询 coItems
	coCursor, err := models.CollectOrderItemCol.Find(ctx, bson.M{
		"purchaseOrder":     purchaseOrderID,
		"purchaseOrderItem": bson.M{"$in": allPoItemIDs},
	})
	if err != nil {
		log.Println("查询 coItems 失败:", err)
		return
	}
	var coItems []models.CollectOrderItem
	if err := coCursor.All(ctx, &coItems); err != nil {
		log.Println("解析 coItems 失败:", err)
		return
	}

	// 构建 coItemMap
	coItemMap := make(map[primitive.ObjectID]models.CollectOrderItem)
	for _, co := range coItems {
		coItemMap[co.PurchaseOrderItem] = co
	}

	// 构建 goods
	var goods []utils.Good
	// 假设你定义了一个结构体 GoodItem{ UnitPrice float64, Quantity float64 }
	for _, poItem := range poItems {
		coItem, ok := coItemMap[poItem.ID]
		if !ok {
			continue
		}

		// 拿 operationUnit 里的 ratio
		ratio := 1.0
		if poItem.OperationUnit != nil {
			ratio = poItem.OperationUnit.Ratio
		}
		// 防止 ratio = 0 导致除零
		if ratio == 0 {
			ratio = 1
		}

		quantity, ok := utils.ToFloat64(poItem.Quantity)
		if !ok {
			quantity = 0
		}

		unitPrice, ok := utils.ToFloat64(poItem.UnitPrice)
		if !ok {
			unitPrice = 0
		}

		paymentQuantity, ok := utils.ToFloat64(coItem.PaymentQuantity)
		if !ok {
			paymentQuantity = 0
		}

		goods = append(goods, utils.Good{
			UnitPrice:        unitPrice,
			DeliveryQuantity: paymentQuantity / ratio,
			Quantity:         quantity,
		})
	}
	// 查找匹配的 GST 率
	crtGstRatio := 0.0
	expectedOn, ok := purchaseOrder["expectedOn"].(primitive.DateTime)
	if ok {
		if gstRatesRaw, ok := global["gstRates"].(primitive.A); ok {
			for _, g := range gstRatesRaw {
				gstMap, ok := g.(bson.M)
				if !ok {
					continue
				}
				gstStart, ok1 := gstMap["gstStart"].(primitive.DateTime)
				gstEnd, ok2 := gstMap["gstEnd"].(primitive.DateTime)
				poGst, ok3 := utils.ToFloat64(gstMap["poGst"])

				if !ok1 || !ok2 || !ok3 {
					continue
				}
				if expectedOn.Time().After(gstStart.Time()) && expectedOn.Time().Before(gstEnd.Time()) {
					crtGstRatio = poGst
					break
				}
			}
		}
	}
	// 计算总价
	orgSubtotal := utils.ComputedOrgSubtotal(goods)
	otherFee, ok := utils.ToFloat64(purchaseOrder["otherFee"])
	if !ok {
		otherFee = 0
	}
	grTotal := utils.ComputedSubtotal(
		orgSubtotal,
		supplier,
		otherFee,
		crtGstRatio,
	)

	purchaseOrder["grTotal"] = grTotal.Total

	common.WriteSuccess(w,
		bson.M{
			"total":         total,
			"purchaseOrder": purchaseOrder,
			"data":          poProcesss,
		},
		"查询成功")

}

func LogMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("✅ %s %s completed in %v", r.Method, r.URL.String(), time.Since(start))
	})
}
func init() {
	env := os.Getenv("APP_ENV")
	if env == "" {
		// 默认加载开发环境
		env = "dev"
	}
}

func allowCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// 写死 CORS 头
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// 预检请求，直接返回
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// 继续执行原始 handler
		next.ServeHTTP(w, r)
	})
}

func main() {
	// 打印当前环境
	env := os.Getenv("APP_ENV")
	if env == "" {
		env = "dev" // 默认值，防止未设置
	}
	fmt.Println("当前运行环境:", env)
	initMongo()
	// 正确的唯一关闭
	defer func() {
		if err := models.Client.Disconnect(context.Background()); err != nil {
			log.Fatal("关闭失败:", err)
		}
		fmt.Println("✅ MongoDB 已关闭")
	}()
	http.Handle("/manage/staffs", common.TokenMiddleware(LogMiddleware(allowCORS(http.HandlerFunc(getStaffs)))))
	http.Handle("/manage/purchaseOrder", common.TokenMiddleware(LogMiddleware(allowCORS(http.HandlerFunc(getPurchaseOrder)))))
	http.Handle("/manage/createPurchaseOrderProcess", common.TokenMiddleware(LogMiddleware(allowCORS(http.HandlerFunc(createPurchaseOrderProcess)))))
	http.Handle("/manage/purchaseOrderProcess", common.TokenMiddleware(LogMiddleware(allowCORS(http.HandlerFunc(getPurchaseOrderProcess)))))
	fmt.Println("Server running on 3001")
	log.Fatal(http.ListenAndServe(":3001", nil))
}
