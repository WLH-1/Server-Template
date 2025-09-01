package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SortingCenter struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	NameCn    string             `bson:"nameCn,omitempty" json:"nameCn,omitempty"`
	NameEn    string             `bson:"nameEn,omitempty" json:"nameEn,omitempty"`
	CountryCn string             `bson:"countryCn,omitempty" json:"countryCn,omitempty"`
	CountryEn string             `bson:"countryEn,omitempty" json:"countryEn,omitempty"`
	Cover     string             `bson:"cover,omitempty" json:"cover,omitempty"`
	Address   string             `bson:"address,omitempty" json:"address,omitempty"`
	IsBin     bool               `bson:"isBin,omitempty" json:"isBin,omitempty"`
	IsDefault bool               `bson:"isDefault,omitempty" json:"isDefault,omitempty"`
	CreatedAt time.Time          `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
}
