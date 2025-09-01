package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// 流程类型枚举
const (
	ProcessTypeCreate   = "create"
	ProcessTypeOrdered  = "ordered"
	ProcessTypeDelivery = "delivery"
	ProcessTypeReceive  = "receive"
	ProcessTypeInvoice  = "invoice"
	ProcessTypeAudit    = "audit"
	ProcessTypeBill     = "bill"
)

type PurchaseOrderProcess struct {
	ID            primitive.ObjectID            `bson:"_id,omitempty" json:"_id"`
	PurchaseOrder primitive.ObjectID            `bson:"purchaseOrder,omitempty" json:"purchaseOrder,omitempty"`
	CollectOrder  primitive.ObjectID            `bson:"collectOrder,omitempty" json:"collectOrder,omitempty"`
	ProcessType   string                        `bson:"processType,omitempty" json:"processType,omitempty"`
	OperationDesc string                        `bson:"operationDesc,omitempty" json:"operationDesc,omitempty"`
	Currency      string                        `bson:"currency,omitempty" json:"currency,omitempty"`
	Contents      []PurchaseOrderProcessContent `bson:"contents,omitempty" json:"contents,omitempty"`
	Total         float64                       `bson:"total,omitempty" json:"total,omitempty"`
	CreatedBy     string                        `bson:"createdBy,omitempty" json:"createdBy,omitempty"`
	Remark        string                        `bson:"remark,omitempty" json:"remark,omitempty"`
	InvoiceTotal  float64                       `bson:"invoiceTotal,omitempty" json:"invoiceTotal,omitempty"`
	Invoices      []string                      `bson:"invoices,omitempty" json:"invoices,omitempty"`
	IsAudit       bool                          `bson:"isAudit,omitempty" json:"isAudit,omitempty"`
	IsValid       bool                          `bson:"isValid,omitempty" json:"isValid,omitempty"`
	CreatedAt     time.Time                     `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
}

// 内嵌的 contents 元素
type PurchaseOrderProcessContent struct {
	Desc              string             `bson:"desc,omitempty" json:"desc,omitempty"`
	Product           primitive.ObjectID `bson:"product,omitempty" json:"product,omitempty"`
	PurchaseOrderItem primitive.ObjectID `bson:"purchaseOrderItem,omitempty" json:"purchaseOrderItem,omitempty"`
	OrgPrice          float64            `bson:"orgPrice,omitempty" json:"orgPrice,omitempty"`
	CrtPrice          float64            `bson:"crtPrice,omitempty" json:"crtPrice,omitempty"`
	OrgQuantity       float64            `bson:"orgQuantity,omitempty" json:"orgQuantity,omitempty"`
	CrtQuantity       float64            `bson:"crtQuantity,omitempty" json:"crtQuantity,omitempty"`
	Remark            string             `bson:"remark,omitempty" json:"remark,omitempty"`
}
