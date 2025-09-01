package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SupplierInvoice struct {
	ID                         primitive.ObjectID   `bson:"_id,omitempty" json:"_id"`
	Type                       string               `bson:"type,omitempty" json:"type,omitempty"` // saleSupplier / supplier
	Supplier                   primitive.ObjectID   `bson:"supplier,omitempty" json:"supplier,omitempty"`
	PurchaseOrders             []primitive.ObjectID `bson:"purchaseOrders,omitempty" json:"purchaseOrders,omitempty"`
	SaleSupplier               primitive.ObjectID   `bson:"saleSupplier,omitempty" json:"saleSupplier,omitempty"`
	SaleSupplierPurchaseOrders []primitive.ObjectID `bson:"saleSupplierPurchaseOrders,omitempty" json:"saleSupplierPurchaseOrders,omitempty"`
	Code                       string               `bson:"code,omitempty" json:"code,omitempty"`
	CreatedBy                  string               `bson:"createdBy,omitempty" json:"createdBy,omitempty"`
	OperationUnits             []OperationUnit      `bson:"operationUnits,omitempty" json:"operationUnits,omitempty"`
	Status                     string               `bson:"status,omitempty" json:"status,omitempty"` // valid / invalid
	IsUpload                   bool                 `bson:"isUpload,omitempty" json:"isUpload,omitempty"`
	Total                      float64              `bson:"total,omitempty" json:"total,omitempty"`
	Subtotal                   float64              `bson:"subtotal,omitempty" json:"subtotal,omitempty"`
	Gst                        float64              `bson:"gst,omitempty" json:"gst,omitempty"`
	InvoiceAt                  time.Time            `bson:"invoiceAt,omitempty" json:"invoiceAt,omitempty"`
	InvoiceEnd                 time.Time            `bson:"invoiceEnd,omitempty" json:"invoiceEnd,omitempty"`
	CreatedAt                  time.Time            `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
}
