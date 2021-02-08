package xir

type Product interface {
	GetProductInfo() *ProductInfo
	SetProductInfo(*ProductInfo)
}

func (x *Resource) SetProductInfo(pi *ProductInfo) { x.ProductInfo = pi }
func (x *Proc) SetProductInfo(pi *ProductInfo)     { x.ProductInfo = pi }
func (x *Dimm) SetProductInfo(pi *ProductInfo)     { x.ProductInfo = pi }
func (x *NIC) SetProductInfo(pi *ProductInfo)      { x.ProductInfo = pi }
func (x *Disk) SetProductInfo(pi *ProductInfo)     { x.ProductInfo = pi }
func (x *Cable) SetProductInfo(pi *ProductInfo)    { x.ProductInfo = pi }
