package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Department struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	NameCn       string             `bson:"nameCn,omitempty" json:"nameCn,omitempty"`
	NameEn       string             `bson:"nameEn,omitempty" json:"nameEn,omitempty"`
	Desc         string             `bson:"desc,omitempty" json:"desc,omitempty"`
	Tag          string             `bson:"tag,omitempty" json:"tag,omitempty"`
	Seq          int                `bson:"seq,omitempty" json:"seq,omitempty"`
	FavPickers   []string           `bson:"favPickers,omitempty" json:"favPickers,omitempty"`
	GoodCapacity int                `bson:"goodCapacity,omitempty" json:"goodCapacity,omitempty"`
	IsBin        bool               `bson:"isBin,omitempty" json:"isBin,omitempty"`
	LaborCosts   float64            `bson:"laborCosts,omitempty" json:"laborCosts,omitempty"`
	IsDailyBill  bool               `bson:"isDailyBill,omitempty" json:"isDailyBill,omitempty"`
	CreatedAt    time.Time          `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
}
