package build

import (
	"fmt"
	"strings"

	"gitlab.com/mergetb/xir/v0.3/go"
)

// Model

type ProductModel struct {
	value string
}

func Model(x string) ProductModel           { return ProductModel{value: x} }
func (p ProductModel) Modify(x interface{}) { productInfo(x).Model = p.value }

// SKU

type ProductSKU struct {
	value string
}

func SKU(x string) ProductSKU             { return ProductSKU{value: x} }
func (p ProductSKU) Modify(x interface{}) { productInfo(x).SKU = p.value }

// Manufacturer

type ProductManufacturer struct {
	value string
}

func Manufacturer(x string) ProductManufacturer {
	return ProductManufacturer{value: x}
}
func (p ProductManufacturer) Modify(x interface{}) {
	productInfo(x).Manufacturer = p.value
}

// Product

type ProductInfo struct {
	value xir.ProductInfo
}

func Product(args ...string) ProductInfo {
	if len(args) < 2 {
		panic("product must provide at least manufacturer and model")
	}
	manufacturer := args[0]
	model := args[1]
	sku := strings.Replace(args[1], " ", "_", -1)
	if len(args) > 2 {
		sku = args[2]
	}
	return ProductInfo{
		value: xir.ProductInfo{
			Manufacturer: manufacturer,
			Model:        model,
			SKU:          sku,
		},
	}
}
func (p ProductInfo) Modify(x interface{}) {
	*productInfo(x) = p.value
}

func productInfo(x interface{}) *xir.ProductInfo {

	prod := x.(xir.Product)
	if prod == nil {
		panic(fmt.Sprintf("%#v is not a product", x))
	}

	if prod.GetProductInfo() == nil {
		prod.SetProductInfo(new(xir.ProductInfo))
	}

	return prod.GetProductInfo()

}
