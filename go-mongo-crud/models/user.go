package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type MongoDBUser struct {
	ID    primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Name  string             `json:"name" bson:"name" binding:"required"`
	Email string             `json:"email" bson:"email" binding:"required,email"`
}

// 可以在这里添加其他与用户相关的模型结构
