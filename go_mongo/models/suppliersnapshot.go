package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SupplierSnapshot struct {
	ID            primitive.ObjectID   `bson:"_id,omitempty" json:"_id"`
	Supplier      primitive.ObjectID   `bson:"supplier,omitempty" json:"supplier,omitempty"`
	Code          string               `bson:"code,omitempty" json:"code,omitempty"`
	NameCn        string               `bson:"nameCn,omitempty" json:"nameCn,omitempty"`
	NameEn        string               `bson:"nameEn,omitempty" json:"nameEn,omitempty"`
	IsActivePrice bool                 `bson:"isActivePrice,omitempty" json:"isActivePrice,omitempty"`
	Categories    []primitive.ObjectID `bson:"categories,omitempty" json:"categories,omitempty"`
	IsOtherFee    bool                 `bson:"isOtherFee,omitempty" json:"isOtherFee,omitempty"`
	OtherFeeDesc  string               `bson:"otherFeeDesc,omitempty" json:"otherFeeDesc,omitempty"`
	CountryCn     string               `bson:"countryCn,omitempty" json:"countryCn,omitempty"`
	CountryEn     string               `bson:"countryEn,omitempty" json:"countryEn,omitempty"`
	Currency      string               `bson:"currency,omitempty" json:"currency,omitempty"`
	BillingDelay  int                  `bson:"billingDelay,omitempty" json:"billingDelay,omitempty"`
	IsGst         bool                 `bson:"isGst,omitempty" json:"isGst,omitempty"`
	GstCode       string               `bson:"gstCode,omitempty" json:"gstCode,omitempty"`
	GstDesc       string               `bson:"gstDesc,omitempty" json:"gstDesc,omitempty"`
	Contact       string               `bson:"contact,omitempty" json:"contact,omitempty"`
	Phone         string               `bson:"phone,omitempty" json:"phone,omitempty"`
	Status        string               `bson:"status,omitempty" json:"status,omitempty"`
	CreatedAt     time.Time            `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
}
