package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Payload interface{} `json:"payload,omitempty"`
}

func Success(c *gin.Context, message string, payload interface{}) {
	c.JSON(http.StatusOK, Response{
		Code:    0,
		Message: message,
		Payload: payload,
	})
}

func Error(c *gin.Context, status int, message string) {
	c.JSON(status, Response{
		Code:    status,
		Message: message,
	})
}
