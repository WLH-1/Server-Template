package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CollectOrder struct {
	ID              primitive.ObjectID  `bson:"_id,omitempty" json:"_id"`
	Code            string              `bson:"code,omitempty" json:"code,omitempty"`
	PurchaseOrder   primitive.ObjectID  `bson:"purchaseOrder,omitempty" json:"purchaseOrder,omitempty"`
	Status          string              `bson:"status,omitempty" json:"status,omitempty"`
	Remark          string              `bson:"remark,omitempty" json:"remark,omitempty"`
	Photos          []string            `bson:"photos,omitempty" json:"photos,omitempty"`
	CreatedBy       string              `bson:"createdBy,omitempty" json:"createdBy,omitempty"`
	InvoiceGst      float64             `bson:"invoiceGst,omitempty" json:"invoiceGst,omitempty"`
	InvoiceSubtotal float64             `bson:"invoiceSubtotal,omitempty" json:"invoiceSubtotal,omitempty"`
	InvoiceTotal    float64             `bson:"invoiceTotal,omitempty" json:"invoiceTotal,omitempty"`
	FreezeAt        *time.Time          `bson:"freezeAt,omitempty" json:"freezeAt,omitempty"`
	PhotoAt         *time.Time          `bson:"photoAt,omitempty" json:"photoAt,omitempty"`
	CreatedAt       time.Time           `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
	IsBin           bool                `bson:"isBin,omitempty" json:"isBin,omitempty"`
	IsDdSend        bool                `bson:"isDdSend,omitempty" json:"isDdSend,omitempty"`
	SortingCenter   *primitive.ObjectID `bson:"sortingCenter,omitempty" json:"sortingCenter,omitempty"`
}
