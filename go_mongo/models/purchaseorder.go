package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PurchaseOrder struct {
	ID                 primitive.ObjectID   `bson:"_id,omitempty" json:"_id"`
	Code               string               `bson:"code" json:"code"`
	Type               string               `bson:"type,omitempty" json:"type,omitempty"`
	Status             string               `bson:"status,omitempty" json:"status,omitempty"`
	CollectStatus      string               `bson:"collectStatus,omitempty" json:"collectStatus,omitempty"`
	DeliveryStatus     string               `bson:"deliveryStatus,omitempty" json:"deliveryStatus,omitempty"`
	DeliveryCode       string               `bson:"deliveryCode,omitempty" json:"deliveryCode,omitempty"`
	DeliveryRemark     string               `bson:"deliveryRemark,omitempty" json:"deliveryRemark,omitempty"`
	Target             string               `bson:"target,omitempty" json:"target,omitempty"`
	OtherFee           float64              `bson:"otherFee,omitempty" json:"otherFee,omitempty"`
	Total              float64              `bson:"total,omitempty" json:"total,omitempty"`
	Gst                float64              `bson:"gst,omitempty" json:"gst,omitempty"`
	GstRatio           float64              `bson:"gstRatio,omitempty" json:"gstRatio,omitempty"`
	Subtotal           float64              `bson:"subtotal,omitempty" json:"subtotal,omitempty"`
	Departments        []primitive.ObjectID `bson:"departments,omitempty" json:"departments,omitempty"`
	SupplierSnapshot   *primitive.ObjectID  `bson:"supplierSnapshot,omitempty" json:"supplierSnapshot,omitempty"`
	Purchaser          string               `bson:"purchaser,omitempty" json:"purchaser,omitempty"`
	CostCenter         string               `bson:"costCenter,omitempty" json:"costCenter,omitempty"`
	ContainerCode      string               `bson:"containerCode,omitempty" json:"containerCode,omitempty"`
	PurchaseOn         *time.Time           `bson:"purchaseOn,omitempty" json:"purchaseOn,omitempty"`
	ExpectedOn         *time.Time           `bson:"expectedOn,omitempty" json:"expectedOn,omitempty"`
	EndAt              *time.Time           `bson:"endAt,omitempty" json:"endAt,omitempty"`
	CollectionWithin   int                  `bson:"collectionWithin,omitempty" json:"collectionWithin,omitempty"`
	CreatedBy          string               `bson:"createdBy,omitempty" json:"createdBy,omitempty"`
	DeleteRemark       string               `bson:"deleteRemark,omitempty" json:"deleteRemark,omitempty"`
	Reviewer           string               `bson:"reviewer,omitempty" json:"reviewer,omitempty"`
	ReviewAt           *time.Time           `bson:"reviewAt,omitempty" json:"reviewAt,omitempty"`
	Remark             string               `bson:"remark,omitempty" json:"remark,omitempty"`
	AuditStatus        string               `bson:"auditStatus,omitempty" json:"auditStatus,omitempty"`
	ExtendFrozenRemark string               `bson:"extendFrozenRemark,omitempty" json:"extendFrozenRemark,omitempty"`
	CollectAt          *time.Time           `bson:"collectAt,omitempty" json:"collectAt,omitempty"`
	ExchangeRate       float64              `bson:"exchangeRate,omitempty" json:"exchangeRate,omitempty"`
	ShippingFee        float64              `bson:"shippingFee,omitempty" json:"shippingFee,omitempty"`
	TruckingFee        float64              `bson:"truckingFee,omitempty" json:"truckingFee,omitempty"`
	OpenFee            float64              `bson:"openFee,omitempty" json:"openFee,omitempty"`
	ContainerQuantity  int                  `bson:"containerQuantity,omitempty" json:"containerQuantity,omitempty"`
	CustomsImportForm  string               `bson:"customsImportForm,omitempty" json:"customsImportForm,omitempty"`
	CargoBoxPrice      float64              `bson:"cargoBoxPrice,omitempty" json:"cargoBoxPrice,omitempty"`
	CargoBoxQuantity   int                  `bson:"cargoBoxQuantity,omitempty" json:"cargoBoxQuantity,omitempty"`
	TotalKg            float64              `bson:"totalKg,omitempty" json:"totalKg,omitempty"`
	TotalVolume        float64              `bson:"totalVolume,omitempty" json:"totalVolume,omitempty"`
	CurrentVolume      float64              `bson:"currentVolume,omitempty" json:"currentVolume,omitempty"`
	IsBin              bool                 `bson:"isBin,omitempty" json:"isBin,omitempty"`
	IsFromMobile       bool                 `bson:"isFromMobile,omitempty" json:"isFromMobile,omitempty"`
	IsToSP             bool                 `bson:"isToSP,omitempty" json:"isToSP,omitempty"`
	IsUploadInvoice    bool                 `bson:"isUploadInvoice,omitempty" json:"isUploadInvoice,omitempty"`
	PurchaseOrders     []primitive.ObjectID `bson:"purchaseOrders,omitempty" json:"purchaseOrders,omitempty"`
	SortingCenter      *primitive.ObjectID  `bson:"sortingCenter,omitempty" json:"sortingCenter,omitempty"`
	CreatedAt          time.Time            `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
}
