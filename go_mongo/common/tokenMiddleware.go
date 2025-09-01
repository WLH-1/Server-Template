package common

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"os"
	"strings"
	"time"
)

type contextKey string

const UserContextKey contextKey = "user"

var whiteList = []string{
	// 这里放白名单路径前缀，比如 "/public", "/health" 等
}

// 用户信息结构体（根据你实际结构定义）
type User struct {
	IsActive bool    `bson:"isActive" json:"isActive"`
	Phone    string  `bson:"phone" json:"phone"`
	Username string  `bson:"username" json:"username"`
	Name     string  `bson:"name" json:"name"`
	ID       string  `bson:"_id" json:"_id"`
	Currency *string `bson:"currency,omitempty" json:"currency,omitempty"` // 可选字段，用指针表示
}

func getUserInfo(authHeader, deviceID, uri string) (*User, error) {
	req, err := http.NewRequest("GET", uri, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", authHeader)
	req.Header.Set("Deviceid", deviceID)

	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return nil, errors.New("unauthorized")
	}

	body, _ := io.ReadAll(resp.Body)
	var res struct {
		Payload User `json:"payload"`
	}
	if err := json.Unmarshal(body, &res); err != nil {
		return nil, err
	}
	return &res.Payload, nil
}

func TokenMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		for _, p := range whiteList {
			if strings.HasPrefix(path, p) {
				next.ServeHTTP(w, r)
				return
			}
		}

		port := strings.Split(strings.TrimPrefix(path, "/"), "/")[0]
		coreURL := os.Getenv("CORE_URI")
		var uri string

		switch port {
		case "manage":
			uri = coreURL + "/core/api/manage/authorization/staffInfo"
		case "staffApp":
			uri = coreURL + "/core/api/staffApp/authorization/staffInfo"
		case "canteenApp":
			uri = coreURL + "/core/api/canteenApp/authorization/canteenInfo"
		default:
			http.Error(w, "unauthorized path", http.StatusUnauthorized)
			return
		}

		auth := r.Header.Get("Authorization")
		deviceID := r.Header.Get("Deviceid")

		user, err := getUserInfo(auth, deviceID, uri)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), UserContextKey, user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// 辅助函数：方便从 Context 取 user
func GetUserFromContext(ctx context.Context) (*User, bool) {
	userVal := ctx.Value(UserContextKey)
	user, ok := userVal.(*User)
	return user, ok
}
