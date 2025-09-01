package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
	ID               primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Sku              string             `bson:"sku" json:"sku"`
	Ean13            string             `bson:"ean13" json:"ean13"`
	NameCn           string             `bson:"nameCn" json:"nameCn"`
	NameEn           string             `bson:"nameEn" json:"nameEn"`
	Alias            []string           `bson:"alias" json:"alias"`
	Spell            string             `bson:"spell" json:"spell"`
	SpecCn           string             `bson:"specCn" json:"specCn"`
	UnitCn           string             `bson:"unitCn" json:"unitCn"`
	UnitEn           string             `bson:"unitEn" json:"unitEn"`
	OperationUnits   []OperationUnit    `bson:"operationUnits" json:"operationUnits"`
	OriginCn         string             `bson:"originCn" json:"originCn"`
	OriginEn         string             `bson:"originEn" json:"originEn"`
	CategoryCn       string             `bson:"categoryCn" json:"categoryCn"`
	CategoryEn       string             `bson:"categoryEn" json:"categoryEn"`
	Cover            string             `bson:"cover" json:"cover"`
	FinishRate       int                `bson:"finishRate" json:"finishRate"`
	StockRange       []int              `bson:"stockRange" json:"stockRange"`
	Status           string             `bson:"status" json:"status"` // enum: pending, confirmed, rejected
	IsSale           bool               `bson:"isSale" json:"isSale"`
	IsMonitor        bool               `bson:"isMonitor" json:"isMonitor"`
	IsLocal          bool               `bson:"isLocal" json:"isLocal"`
	CreatedBy        string             `bson:"createdBy" json:"createdBy"`
	Reviewer         string             `bson:"reviewer" json:"reviewer"`
	Remark           string             `bson:"remark" json:"remark"`
	DeleteRemark     string             `bson:"deleteRemark" json:"deleteRemark"`
	UnTemplateRemark string             `bson:"unTemplateRemark" json:"unTemplateRemark"`
	WarningType      string             `bson:"warningType" json:"warningType"` // default / over / less
	ImminentItemcode string             `bson:"imminentItemcode" json:"imminentItemcode"`
	LatestAdventAt   *time.Time         `bson:"latestAdventAt,omitempty" json:"latestAdventAt,omitempty"`
	ExpiredAt        *time.Time         `bson:"expiredAt,omitempty" json:"expiredAt,omitempty"`
	Department       primitive.ObjectID `bson:"department" json:"department"`
	ReviewAt         *time.Time         `bson:"reviewAt,omitempty" json:"reviewAt,omitempty"`
	IsBin            bool               `bson:"isBin" json:"isBin"`
	CreatedAt        time.Time          `bson:"createdAt" json:"createdAt"`
}
