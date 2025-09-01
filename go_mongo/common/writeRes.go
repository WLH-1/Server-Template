package common

import (
	"encoding/json"
	"net/http"
)

// 成功响应
func WriteSuccess[T any](w http.ResponseWriter, payload T, msg string) {
	resp := Response[T]{
		Code:    http.StatusOK,
		Msg:     msg,
		Payload: payload,
	}
	writeJSON(w, http.StatusOK, resp)
}

// 错误响应
func WriteError(w http.ResponseWriter, statusCode int, msg string) {
	resp := Response[any]{
		Code: statusCode,
		Msg:  msg,
	}
	writeJSON(w, statusCode, resp)
}

// 底层统一 JSON 输出函数
func writeJSON(w http.ResponseWriter, statusCode int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	_ = json.NewEncoder(w).Encode(data)
}
