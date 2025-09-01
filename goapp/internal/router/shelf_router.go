package router

import (
	"goapp/internal/handler"

	"github.com/gin-gonic/gin"
)

func RegisterShelfRoutes(rg *gin.RouterGroup, shelfHandler *handler.ShelfHandler) {
	shelfGroup := rg.Group("/shelfs")
	{
		shelfGroup.POST("", shelfHandler.CreateShelf)
		shelfGroup.GET("", shelfHandler.GetShelfs)
		shelfGroup.GET("/:id", shelfHandler.GetShelfByID)
		shelfGroup.PUT("/:id", shelfHandler.UpdateShelf)
		shelfGroup.DELETE("/:id", shelfHandler.DeleteShelf)
	}
}
