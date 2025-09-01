package models

import (
	"go.mongodb.org/mongo-driver/mongo"
)

// 数据库集合变量
var (
	Client *mongo.Client
	EbuyDB *mongo.Database
	CommDB *mongo.Database

	// 采购订单相关集合
	PurchaseOrderCol        *mongo.Collection
	CollectOrderCol         *mongo.Collection
	CollectOrderItemCol     *mongo.Collection
	SupplierSnapshotCol     *mongo.Collection
	PurchaseOrderItemCol    *mongo.Collection
	PurchaseOrderProcessCol *mongo.Collection
	StockRecordCol          *mongo.Collection
	SupplierInvoiceCol      *mongo.Collection
	SortingCenterCol        *mongo.Collection
	DepartmentCol           *mongo.Collection
	GlobalCol               *mongo.Collection
	ProductCol              *mongo.Collection

	// 公共集合
	StaffCol *mongo.Collection
	// 其他集合...
)

// InitCollections 初始化所有集合
func InitCollections(ebuyDB, commDB *mongo.Database) {
	EbuyDB = ebuyDB
	CommDB = commDB

	// 初始化采购订单相关集合
	PurchaseOrderCol = EbuyDB.Collection("purchaseorder")
	CollectOrderCol = EbuyDB.Collection("collectorder")
	CollectOrderItemCol = EbuyDB.Collection("collectorderitem")
	SupplierSnapshotCol = EbuyDB.Collection("suppliersnapshot")
	PurchaseOrderItemCol = EbuyDB.Collection("purchaseorderitem")
	PurchaseOrderProcessCol = EbuyDB.Collection("purchaseorderprocess")
	StockRecordCol = EbuyDB.Collection("stockrecord")
	SupplierInvoiceCol = EbuyDB.Collection("supplierinvoice")
	SortingCenterCol = EbuyDB.Collection("sortingcenter")
	DepartmentCol = EbuyDB.Collection("department")
	GlobalCol = EbuyDB.Collection("global")
	ProductCol = EbuyDB.Collection("product")
	// 初始化公共集合
	StaffCol = CommDB.Collection("staff")
	// 其他集合初始化...
}
