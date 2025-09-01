package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoClient *mongo.Client

func InitMongo(uri string) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal("MongoDB 连接失败: ", err)
	}

	if err := client.Ping(ctx, nil); err != nil {
		log.Fatal("MongoDB Ping 失败: ", err)
	}

	MongoClient = client
	log.Println("✅ MongoDB 连接成功")
}
