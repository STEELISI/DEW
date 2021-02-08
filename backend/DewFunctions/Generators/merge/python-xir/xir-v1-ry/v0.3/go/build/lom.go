package build

import (
	"fmt"
	"os"
	"strings"
	"text/tabwriter"

	"gitlab.com/mergetb/xir/v0.3/go"
)

type Material struct {
	Unit     xir.Product
	Quantity int
	LOM      LOM
}

type LOM []*Material

type TBLOM struct {
	Nodes    LOM
	Switches LOM
	Cables   LOM
}

func listOfMaterials(fa *xir.Facility) {

	lom := calculateLOM(fa)
	lom.Print()

}

func (b LOM) Print() {

	var tw = tabwriter.NewWriter(os.Stdout, 0, 0, 4, ' ', 0)
	fmt.Fprintf(tw, "MANUFACTURER\tMODEL\tSKU\tQUANTITY\n")
	PrintMaterials(tw, b, 1, 0)
	tw.Flush()

}

func (tbl TBLOM) Print() {

	fmt.Println("NODES")
	fmt.Println(strings.Repeat("-", 80))
	tbl.Nodes.Print()

	fmt.Println("\n\nSWITCHES")
	fmt.Println(strings.Repeat("-", 80))
	tbl.Switches.Print()

	fmt.Println("\n\nCABLES")
	fmt.Println(strings.Repeat("-", 80))
	tbl.Cables.Print()

}

func (m *Material) ConfigItems() int {

	return len(m.LOM)

}

func PrintMaterials(
	tw *tabwriter.Writer,
	lom LOM,
	parentQuantity int,
	depth int,
) {

	for _, item := range lom {

		pi := item.Unit.GetProductInfo()

		fmt.Fprintf(tw, "%s%s\t%s\t%s\t%d\n",
			strings.Repeat("+", depth),
			pi.Manufacturer,
			pi.Model,
			pi.SKU,
			item.Quantity/parentQuantity,
		)

		if len(item.LOM) > 0 {
			PrintMaterials(tw, item.LOM, item.Quantity, depth+1)
		}

		if depth == 0 && item.ConfigItems() > 0 {
			fmt.Fprintf(tw, "\t\t\t\n")
		}

	}

}

func calculateLOM(fa *xir.Facility) TBLOM {

	var tbl TBLOM

	for _, x := range fa.Resources {

		pi := x.ProductInfo
		if pi != nil && pi.SKU != "" {

			if x.HasRole(
				xir.Role_XpSwitch,
				xir.Role_InfraSwitch,
				xir.Role_MgmtSwitch,
				xir.Role_Gateway,
			) {
				tbl.Switches.AddDevice(pi.SKU, x)
			} else {
				tbl.Nodes.AddDevice(pi.SKU, x)
			}
		}

	}

	for _, x := range fa.Cables {

		pi := x.ProductInfo
		if pi != nil && pi.SKU != "" {
			tbl.Cables.AddUnit(x)
		}

	}

	return tbl

}

func (b *LOM) AddDevice(sku string, p xir.Product) {

	m := b.AddUnit(p)
	if m == nil {
		return
	}

	r, ok := p.(*xir.Resource)
	if !ok {
		return
	}

	for _, x := range r.Procs {
		m.LOM.AddUnit(x)
	}

	for _, x := range r.Memory {
		m.LOM.AddUnit(x)
	}

	for _, x := range r.NICs {
		m.LOM.AddUnit(x)
	}

	for _, x := range r.Disks {
		m.LOM.AddUnit(x)
	}

}

func (b *LOM) AddUnit(e xir.Product) *Material {

	p := e.GetProductInfo()
	if p == nil {
		return nil
	}

	for _, x := range *b {
		if x.Unit.GetProductInfo().SKU == p.SKU {
			x.Quantity += 1
			return x
		}
	}

	m := &Material{
		Unit:     e,
		Quantity: 1,
	}

	*b = append(*b, m)

	return m
}
