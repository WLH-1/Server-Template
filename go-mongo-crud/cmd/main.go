package main

import (
	"context"
	"log"
	"time"

	"go-mongo-crud/config"
	"go-mongo-crud/handlers"
	"go-mongo-crud/utils"

	"github.com/gin-gonic/gin"
)

func main() {
	// 加载配置
	cfg := config.LoadConfig()

	// 连接 MongoDB
	client, err := utils.ConnectDB(cfg.MongoURI)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	// 获取数据库和集合
	db := client.Database(cfg.DBName)
	usersCollection := db.Collection("users")

	// 创建上下文
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// 初始化 Gin
	r := gin.Default()
	r.SetTrustedProxies([]string{"127.0.0.1"}) // 只信任本地代理
	// 初始化处理器
	userHandler := handlers.NewUserHandler(ctx, usersCollection)

	// 设置路由
	r.GET("/users", userHandler.ListUsers)
	r.GET("/users/:id", userHandler.GetUser)
	r.POST("/users", userHandler.CreateUser)
	r.PUT("/users/:id", userHandler.UpdateUser)
	r.DELETE("/users/:id", userHandler.DeleteUser)

	// 启动服务器
	log.Printf("Server running on port %s", cfg.AppPort)
	if err := r.Run(":" + cfg.AppPort); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
