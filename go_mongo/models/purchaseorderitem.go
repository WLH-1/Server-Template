package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ProductSnapshot struct {
	NameCn   string `bson:"nameCn,omitempty" json:"nameCn,omitempty"`
	NameEn   string `bson:"nameEn,omitempty" json:"nameEn,omitempty"`
	SpecCn   string `bson:"specCn,omitempty" json:"specCn,omitempty"`
	OriginCn string `bson:"originCn,omitempty" json:"originCn,omitempty"`
	OriginEn string `bson:"originEn,omitempty" json:"originEn,omitempty"`
}

type OperationUnit struct {
	NameCn      string  `bson:"nameCn,omitempty" json:"nameCn,omitempty"`
	NameEn      string  `bson:"nameEn,omitempty" json:"nameEn,omitempty"`
	Ratio       float64 `bson:"ratio,omitempty" json:"ratio,omitempty"`
	OriginRatio float64 `bson:"originRatio,omitempty" json:"originRatio,omitempty"`
}

type Expiration struct {
	ProductionAt time.Time `bson:"productionAt,omitempty" json:"productionAt,omitempty"`
	Expiration   float64   `bson:"expiration,omitempty" json:"expiration,omitempty"`
	ExpiredAt    time.Time `bson:"expiredAt,omitempty" json:"expiredAt,omitempty"`
	Quantity     float64   `bson:"quantity,omitempty" json:"quantity,omitempty"`
}

type PurchaseOrderItem struct {
	ID               primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	PurchaseOrder    primitive.ObjectID `bson:"purchaseOrder,omitempty" json:"purchaseOrder,omitempty"`
	Product          primitive.ObjectID `bson:"product,omitempty" json:"product,omitempty"`
	PriceQuoted      primitive.ObjectID `bson:"priceQuoted,omitempty" json:"priceQuoted,omitempty"`
	ProductSnapshot  *ProductSnapshot   `bson:"productSnapshot,omitempty" json:"productSnapshot,omitempty"`
	Price            float64            `bson:"price,omitempty" json:"price,omitempty"`
	ActivePrice      float64            `bson:"activePrice,omitempty" json:"activePrice,omitempty"`
	UnitPrice        float64            `bson:"unitPrice,omitempty" json:"unitPrice,omitempty"`
	Quantity         float64            `bson:"quantity,omitempty" json:"quantity,omitempty"`
	DeliveryQuantity float64            `bson:"deliveryQuantity,omitempty" json:"deliveryQuantity,omitempty"`
	Target           string             `bson:"target,omitempty" json:"target,omitempty"`
	Expirations      []Expiration       `bson:"expirations,omitempty" json:"expirations,omitempty"`
	CostPrice        float64            `bson:"costPrice,omitempty" json:"costPrice,omitempty"`
	UnitCn           string             `bson:"unitCn,omitempty" json:"unitCn,omitempty"`
	UnitEn           string             `bson:"unitEn,omitempty" json:"unitEn,omitempty"`
	OperationUnit    *OperationUnit     `bson:"operationUnit,omitempty" json:"operationUnit,omitempty"`
	Total            float64            `bson:"total,omitempty" json:"total,omitempty"`
	Seq              int                `bson:"seq,omitempty" json:"seq,omitempty"`
	Gst              float64            `bson:"gst,omitempty" json:"gst,omitempty"`
	Subtotal         float64            `bson:"subtotal,omitempty" json:"subtotal,omitempty"`
	Remark           string             `bson:"remark,omitempty" json:"remark,omitempty"`
	IsBin            bool               `bson:"isBin,omitempty" json:"isBin,omitempty"`
	IsAdvancePrint   bool               `bson:"isAdvancePrint,omitempty" json:"isAdvancePrint,omitempty"`
	CreatedAt        time.Time          `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
	ItemCode         string             `bson:"itemCode,omitempty" json:"itemCode,omitempty"`
}
