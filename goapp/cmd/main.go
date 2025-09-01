package main

import (
	"goapp/internal/db"
	"goapp/internal/handler"
	"goapp/internal/repository"
	"goapp/internal/router"
	"goapp/internal/service"
	"log"
)

func main() {
	// 1. 初始化 MongoDB
	db.InitMongo("mongodb://192.168.6.38:27018,192.168.6.38:27019,192.168.6.38:27020")

	// 3. 初始化依赖（Repository -> Service -> Handler）
	shelfRepo := repository.NewShelfRepository()
	shelfService := service.NewShelfService(shelfRepo)
	shelfHandler := handler.NewShelfHandler(shelfService)

	r := router.SetupRouter(shelfHandler)

	// 5. 启动服务
	if err := r.Run(":8080"); err != nil {
		log.Fatal("服务器启动失败: ", err)
	}
}
