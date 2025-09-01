package router

import (
	"goapp/internal/handler"

	"github.com/gin-gonic/gin"
)

func SetupRouter(
	shelfHandler *handler.ShelfHandler,
) *gin.Engine {
	r := gin.Default()

	apiGroup := r.Group("/api")

	// 注册模块路由
	RegisterShelfRoutes(apiGroup, shelfHandler)
	return r
}
