package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Shelf 数据库模型
type Shelf struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Name      string             `bson:"name" json:"name"`
	Warehouse primitive.ObjectID `bson:"warehouse" json:"warehouse"`
	IsBin     bool               `bson:"isBin" json:"isBin"`
	CreatedAt time.Time          `bson:"createdAt" json:"createdAt"`
}

// CreateShelfRequest 创建仓位请求 DTO
// binding:"required" 是 Gin 的校验标签，自动帮你验证必填。
type CreateShelfRequest struct {
	Name      string             `json:"name" binding:"required"`
	Warehouse primitive.ObjectID `json:"warehouse" binding:"required"`
}

// UpdateShelfRequest 更新仓位请求 DTO
// 这里用的是 *string（指针类型），代表这个字段可以不传。
type UpdateShelfRequest struct {
	Name      *string             `json:"name"`
	Warehouse *primitive.ObjectID `json:"warehouse"`
}
