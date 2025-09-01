package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Type 枚举
const (
	TypeLink       = "link"
	TypeInsideLink = "insideLink"
	TypeCategory   = "category"
	TypeGood       = "good"
)

// 单个 GST Rate
type GSTRatePayload struct {
	GSTStart time.Time `bson:"gstStart,omitempty" json:"gstStart,omitempty"`
	GSTEnd   time.Time `bson:"gstEnd,omitempty" json:"gstEnd,omitempty"`
	GST      float64   `bson:"gst,omitempty" json:"gst,omitempty"`
	PoGST    float64   `bson:"poGst,omitempty" json:"poGst,omitempty"`
}

// 系数 Coefficient
type Coefficient struct {
	OrderNum                 int `bson:"orderNum,omitempty" json:"orderNum,omitempty"`
	OrderItemPickCounty      int `bson:"orderItemPickCounty,omitempty" json:"orderItemPickCounty,omitempty"`
	OrderItemPickWeightCount int `bson:"orderItemPickWeightCount,omitempty" json:"orderItemPickWeightCount,omitempty"`
}

// 单个 Swiper
type Swiper struct {
	Type    string `bson:"type,omitempty" json:"type,omitempty"`
	URL     string `bson:"url,omitempty" json:"url,omitempty"`
	CoverCn string `bson:"coverCn,omitempty" json:"coverCn,omitempty"`
	CoverEn string `bson:"coverEn,omitempty" json:"coverEn,omitempty"`
	IsShow  bool   `bson:"isShow,omitempty" json:"isShow,omitempty"`
}

type Global struct {
	ID                        primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	GSTRates                  []GSTRatePayload   `bson:"gstRates,omitempty" json:"gstRates,omitempty"`
	HomeOrderThreshold        float64            `bson:"homeOrderThreshold,omitempty" json:"homeOrderThreshold,omitempty"`
	AllOrderThreshold         float64            `bson:"allOrderThreshold,omitempty" json:"allOrderThreshold,omitempty"`
	OrderThreshold            float64            `bson:"orderThreshold,omitempty" json:"orderThreshold,omitempty"`
	CrtOrderThreshold         float64            `bson:"crtOrderThreshold,omitempty" json:"crtOrderThreshold,omitempty"`
	BunOrderThreshold         float64            `bson:"bunOrderThreshold,omitempty" json:"bunOrderThreshold,omitempty"`
	CrtBunOrderThreshold      float64            `bson:"crtBunOrderThreshold,omitempty" json:"crtBunOrderThreshold,omitempty"`
	FroOrderThreshold         float64            `bson:"froOrderThreshold,omitempty" json:"froOrderThreshold,omitempty"`
	CrtFroOrderThreshold      float64            `bson:"crtFroOrderThreshold,omitempty" json:"crtFroOrderThreshold,omitempty"`
	DgsOrderThreshold         float64            `bson:"dgsOrderThreshold,omitempty" json:"dgsOrderThreshold,omitempty"`
	CrtDgsOrderThreshold      float64            `bson:"crtDgsOrderThreshold,omitempty" json:"crtDgsOrderThreshold,omitempty"`
	FruOrderThreshold         float64            `bson:"fruOrderThreshold,omitempty" json:"fruOrderThreshold,omitempty"`
	CrtFruOrderThreshold      float64            `bson:"crtFruOrderThreshold,omitempty" json:"crtFruOrderThreshold,omitempty"`
	EbpOrderThreshold         float64            `bson:"ebpOrderThreshold,omitempty" json:"ebpOrderThreshold,omitempty"`
	CrtEbpOrderThreshold      float64            `bson:"crtEbpOrderThreshold,omitempty" json:"crtEbpOrderThreshold,omitempty"`
	AppendOrderThreshold      float64            `bson:"appendOrderThreshold,omitempty" json:"appendOrderThreshold,omitempty"`
	GoodCapacity              float64            `bson:"goodCapacity,omitempty" json:"goodCapacity,omitempty"`
	ClosedAt                  string             `bson:"closedAt,omitempty" json:"closedAt,omitempty"`
	MysClosedAt               string             `bson:"mysClosedAt,omitempty" json:"mysClosedAt,omitempty"`
	MysPickClosedAt           string             `bson:"mysPickClosedAt,omitempty" json:"mysPickClosedAt,omitempty"`
	SgpCutVegClosedAt         string             `bson:"sgpCutVegClosedAt,omitempty" json:"sgpCutVegClosedAt,omitempty"`
	SelfFroClosedAt           string             `bson:"selfFroClosedAt,omitempty" json:"selfFroClosedAt,omitempty"`
	Coefficient               Coefficient        `bson:"coefficient,omitempty" json:"coefficient,omitempty"`
	MalaysiaNextDayClosedAt   string             `bson:"malaysiaNextDayClosedAt,omitempty" json:"malaysiaNextDayClosedAt,omitempty"`
	OrderToMalaysiaCompany    []string           `bson:"orderToMalaysiaCompany,omitempty" json:"orderToMalaysiaCompany,omitempty"`
	OrderToMalaysiaDepartment []string           `bson:"orderToMalaysiaDepartment,omitempty" json:"orderToMalaysiaDepartment,omitempty"`
	Tel                       string             `bson:"tel,omitempty" json:"tel,omitempty"`
	Swipers                   []Swiper           `bson:"swipers,omitempty" json:"swipers,omitempty"`
	AuditTeam                 []string           `bson:"auditTeam,omitempty" json:"auditTeam,omitempty"`
	ReviewAuditTeam           []string           `bson:"reviewAuditTeam,omitempty" json:"reviewAuditTeam,omitempty"`
	CreatedAt                 time.Time          `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
}
