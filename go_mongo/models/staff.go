package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Staff struct {
	ID               primitive.ObjectID   `bson:"_id,omitempty" json:"_id"`
	Name             string               `bson:"name,omitempty" json:"name,omitempty"`
	Username         string               `bson:"username,omitempty" json:"username,omitempty"`
	Alias            string               `bson:"alias,omitempty" json:"alias,omitempty"`
	Password         string               `bson:"password,omitempty" json:"password,omitempty"`
	StaffAppDeviceID string               `bson:"staffAppDeviceId,omitempty" json:"staffAppDeviceId,omitempty"`
	ManageDeviceID   string               `bson:"manageDeviceId,omitempty" json:"manageDeviceId,omitempty"`
	SpecialCode      string               `bson:"specialCode,omitempty" json:"specialCode,omitempty"`
	Phone            string               `bson:"phone,omitempty" json:"phone,omitempty"`
	IsActive         bool                 `bson:"isActive,omitempty" json:"isActive,omitempty"`
	Roles            []primitive.ObjectID `bson:"roles,omitempty" json:"roles,omitempty"`
	SortingCenter    *primitive.ObjectID  `bson:"sortingCenter,omitempty" json:"sortingCenter,omitempty"`
	IsBin            bool                 `bson:"isBin,omitempty" json:"isBin,omitempty"`
	IsMerits         bool                 `bson:"isMerits,omitempty" json:"isMerits,omitempty"`
	CreatedAt        time.Time            `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
	MeritsNum        int                  `bson:"meritsNum,omitempty" json:"meritsNum,omitempty"`
	SaleSuppliers    []primitive.ObjectID `bson:"saleSuppliers,omitempty" json:"saleSuppliers,omitempty"`
}
