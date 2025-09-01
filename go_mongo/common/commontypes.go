package common

// 通用响应结构
type Response[T any] struct {
	Code    int    `json:"code"`
	Msg     string `json:"msg"`
	Payload T      `json:"payload,omitempty"`
}

// 分页响应结构
type PaginationPayload[T any] struct {
	Total int `json:"total"`
	Data  []T `json:"data"`
}

// Token解码后的信息
type DecodeToken struct {
	IsActive bool   `json:"isActive"`
	Phone    string `json:"phone"`
	Username string `json:"username"`
	Name     string `json:"name"`
	ID       string `json:"_id"`
	Currency string `json:"currency,omitempty"`
}

// 请求参数示例
type RequestParameter struct {
	User DecodeToken `json:"user"`
}

// Header 参数示例
type HeaderParameter struct {
	Lang            string `json:"lang"`
	Authorization   string `json:"authorization"`
	CreatedPlatform string `json:"createdplatform"`
	DeviceID        string `json:"deviceid"`
}
