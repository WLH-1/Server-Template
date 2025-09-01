package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CollectOrderItem struct {
	ID                primitive.ObjectID   `bson:"_id,omitempty" json:"_id"`
	CollectOrder      primitive.ObjectID   `bson:"collectOrder,omitempty" json:"collectOrder,omitempty"`
	PurchaseOrder     primitive.ObjectID   `bson:"purchaseOrder,omitempty" json:"purchaseOrder,omitempty"`
	PurchaseOrderItem primitive.ObjectID   `bson:"purchaseOrderItem,omitempty" json:"purchaseOrderItem,omitempty"`
	Product           primitive.ObjectID   `bson:"product,omitempty" json:"product,omitempty"`
	CollectOperations []primitive.ObjectID `bson:"collectOperations,omitempty" json:"collectOperations,omitempty"`
	PurchaseQuantity  float64              `bson:"purchaseQuantity,omitempty" json:"purchaseQuantity,omitempty"`
	CollectQuantity   float64              `bson:"collectQuantity,omitempty" json:"collectQuantity,omitempty"`
	PaymentQuantity   float64              `bson:"paymentQuantity,omitempty" json:"paymentQuantity,omitempty"`
	FreezeAt          *time.Time           `bson:"freezeAt,omitempty" json:"freezeAt,omitempty"`
	Status            string               `bson:"status,omitempty" json:"status,omitempty"`
	CreatedAt         time.Time            `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
	IsInStock         bool                 `bson:"isInStock,omitempty" json:"isInStock,omitempty"`
	InStockQuantity   float64              `bson:"inStockQuantity,omitempty" json:"inStockQuantity,omitempty"`
}
