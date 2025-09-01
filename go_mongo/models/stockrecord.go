package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type StockRecord struct {
	ID                 primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Type               string             `bson:"type,omitempty" json:"type,omitempty"` // in/out
	Before             float64            `bson:"before,omitempty" json:"before,omitempty"`
	Change             float64            `bson:"change,omitempty" json:"change,omitempty"`
	After              float64            `bson:"after,omitempty" json:"after,omitempty"`
	ReturnType         string             `bson:"returnType,omitempty" json:"returnType,omitempty"` // site/customer
	Scope              string             `bson:"scope,omitempty" json:"scope,omitempty"`           // purchase/sale/move/...
	Shelf              primitive.ObjectID `bson:"shelf,omitempty" json:"shelf,omitempty"`
	ItemCode           string             `bson:"itemCode,omitempty" json:"itemCode,omitempty"`
	Photos             []string           `bson:"photos,omitempty" json:"photos,omitempty"`
	Product            primitive.ObjectID `bson:"product,omitempty" json:"product,omitempty"`
	PurchaseOrder      primitive.ObjectID `bson:"purchaseOrder,omitempty" json:"purchaseOrder,omitempty"`
	PurchaseOrderItem  primitive.ObjectID `bson:"purchaseOrderItem,omitempty" json:"purchaseOrderItem,omitempty"`
	SaleOrder          primitive.ObjectID `bson:"saleOrder,omitempty" json:"saleOrder,omitempty"`
	SaleOrderItem      primitive.ObjectID `bson:"saleOrderItem,omitempty" json:"saleOrderItem,omitempty"`
	StockMove          primitive.ObjectID `bson:"stockMove,omitempty" json:"stockMove,omitempty"`
	StockMoveItem      primitive.ObjectID `bson:"stockMoveItem,omitempty" json:"stockMoveItem,omitempty"`
	InventoryOrder     primitive.ObjectID `bson:"inventoryOrder,omitempty" json:"inventoryOrder,omitempty"`
	InventoryOrderItem primitive.ObjectID `bson:"inventoryOrderItem,omitempty" json:"inventoryOrderItem,omitempty"`
	Order              primitive.ObjectID `bson:"order,omitempty" json:"order,omitempty"`
	OrderItem          primitive.ObjectID `bson:"orderItem,omitempty" json:"orderItem,omitempty"`
	ConsigneeOrder     primitive.ObjectID `bson:"consigneeOrder,omitempty" json:"consigneeOrder,omitempty"`
	ConsigneeOrderItem primitive.ObjectID `bson:"consigneeOrderItem,omitempty" json:"consigneeOrderItem,omitempty"`
	PrepareOrder       primitive.ObjectID `bson:"prepareOrder,omitempty" json:"prepareOrder,omitempty"`
	StockSnapshot      primitive.ObjectID `bson:"stockSnapshot,omitempty" json:"stockSnapshot,omitempty"`
	CreatedBy          string             `bson:"createdBy,omitempty" json:"createdBy,omitempty"`
	Remark             string             `bson:"remark,omitempty" json:"remark,omitempty"`
	OperationUnit      *OperationUnit     `bson:"operationUnit,omitempty" json:"operationUnit,omitempty"`
	CreatedAt          time.Time          `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
}
