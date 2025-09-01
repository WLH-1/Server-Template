package utils

import (
	"go_mongo/models"
	"math"
)

type Good struct {
	Quantity         float64
	DeliveryQuantity float64
	UnitPrice        float64
}

// Round 保留两位小数
func Round(val float64) float64 {
	return math.Round(val*100) / 100
}

// 计算原始小计（未含税）
func ComputedOrgSubtotal(goods []Good) float64 {
	orgSubtotal := 0.0
	for _, g := range goods {
		qty := g.Quantity
		if g.DeliveryQuantity != 0 {
			qty = g.DeliveryQuantity
		}
		orgSubtotal += Round(qty * g.UnitPrice)
	}
	return orgSubtotal
}

// SubtotalResult 返回结构
type SubtotalResult struct {
	Subtotal float64
	Gst      float64
	Total    float64
}

// 计算含税、总价
func ComputedSubtotal(
	orgSubtotal float64,
	supplier models.SupplierSnapshot,
	otherFee float64,
	gstRatio float64,
) SubtotalResult {
	if math.IsNaN(orgSubtotal) {
		orgSubtotal = 0
	}
	if math.IsNaN(otherFee) {
		otherFee = 0
	}

	subtotal := 0.0
	if supplier.GstDesc == "Purchases from Non-GST Registered Suppliers" {
		subtotal = orgSubtotal + otherFee
	} else if supplier.IsGst {
		subtotal = (orgSubtotal + otherFee) / (1 + gstRatio)
	} else {
		subtotal = orgSubtotal + otherFee
	}

	gst := 0.0
	if supplier.GstDesc == "Purchases from Non-GST Registered Suppliers" {
		gst = 0
	} else {
		gst = subtotal * gstRatio
	}

	subtotal = Round(subtotal)
	gst = Round(gst)

	total := subtotal + gst
	total = Round(total)

	// 如果有特殊处理，这里可以额外封装
	total = SpecialTotal(total)

	return SubtotalResult{
		Subtotal: subtotal,
		Gst:      gst,
		Total:    total,
	}
}

// SpecialTotal 特殊处理，若没有则原值返回
func SpecialTotal(val float64) float64 {
	// 这里可以放你自己的特殊逻辑，否则直接返回
	return val
}

// 泛型 Map 函数
func Map[T any, R any](items []T, fn func(T) R) []R {
	results := make([]R, 0, len(items))
	for _, item := range items {
		results = append(results, fn(item))
	}
	return results
}

func ToFloat64(value interface{}) (float64, bool) {
	switch v := value.(type) {
	case float64:
		return v, true
	case float32:
		return float64(v), true
	case int:
		return float64(v), true
	case int8:
		return float64(v), true
	case int16:
		return float64(v), true
	case int32:
		return float64(v), true
	case int64:
		return float64(v), true
	case uint:
		return float64(v), true
	case uint8:
		return float64(v), true
	case uint16:
		return float64(v), true
	case uint32:
		return float64(v), true
	case uint64:
		return float64(v), true
	default:
		return 0, false
	}
}
