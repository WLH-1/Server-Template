package handler

import (
	"context"
	"goapp/internal/model"
	"goapp/internal/service"
	"goapp/pkg/response"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ShelfHandler struct {
	svc service.ShelfService
}

func NewShelfHandler(svc service.ShelfService) *ShelfHandler {
	return &ShelfHandler{svc: svc}
}

func (h *ShelfHandler) CreateShelf(c *gin.Context) {
	var req model.CreateShelfRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}
	if err := h.svc.CreateShelf(context.Background(), req); err != nil {
		response.Error(c, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(c, "用户创建成功", nil)
}

func (h *ShelfHandler) GetShelfs(c *gin.Context) {
	shelfs, err := h.svc.GetShelfs(context.Background())
	if err != nil {
		response.Error(c, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(c, "获取成功", shelfs)
}

func (h *ShelfHandler) GetShelfByID(c *gin.Context) {
	id := c.Param("id")
	shelf, err := h.svc.GetShelfByID(context.Background(), id)
	if err != nil {
		response.Error(c, http.StatusNotFound, err.Error())
		return
	}
	response.Success(c, "获取成功", shelf)
}

func (h *ShelfHandler) UpdateShelf(c *gin.Context) {
	id := c.Param("id")
	var req model.UpdateShelfRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}
	if err := h.svc.UpdateShelf(context.Background(), id, req); err != nil {
		response.Error(c, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(c, "更新成功", nil)
}

func (h *ShelfHandler) DeleteShelf(c *gin.Context) {
	id := c.Param("id")
	if err := h.svc.DeleteShelf(context.Background(), id); err != nil {
		response.Error(c, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(c, "删除成功", nil)
}
