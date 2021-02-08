package tb

import (
	"fmt"
	"os"
	"strings"

	"text/tabwriter"

	"gitlab.com/mergetb/xir/lang/go/v0.2"
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

type Material struct {
	Unit     hw.Element
	Quantity int
	LOM      LOM
}

func (m *Material) ConfigItems() int {

	count := 0
	for _, x := range m.LOM {
		if !x.Unit.BaseInfo().Integrated {
			count++
		}
	}
	return count

}

type LOM []*Material

type TBLOM struct {
	Nodes    LOM
	Switches LOM
	Cables   LOM
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

func PrintMaterials(
	tw *tabwriter.Writer,
	lom LOM,
	parentQuantity int,
	depth int,
) {

	for _, item := range lom {

		if item.Unit.BaseInfo().Integrated {
			continue
		}

		fmt.Fprintf(tw, "%s%s\t%s\t%s\t%d\n",
			strings.Repeat("+", depth),
			item.Unit.BaseInfo().Manufacturer,
			item.Unit.Show(),
			item.Unit.BaseInfo().SKU,
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

func CalculateLOM(net *xir.Net) TBLOM {

	var tbl TBLOM

	for _, x := range net.AllNodes() {

		r := GetResourceSpec(x)
		if r == nil {
			continue
		}

		if r.HasRole(XpSwitch, InfraSwitch, MgmtSwitch, Gateway) {
			tbl.Switches.AddDevice(r.System.Device.SKU, r.System.Device)
		} else {
			tbl.Nodes.AddDevice(r.System.Device.SKU, r.System.Device)
		}
	}

	for _, x := range net.AllLinks() {

		c := GetCableSpec(x)
		if c == nil {
			continue
		}

		tbl.Cables.AddUnit(c)

	}

	return tbl

}

func (b *LOM) AddUnit(e hw.Element) *Material {

	for _, x := range *b {
		if x.Unit.BaseInfo().SKU == e.BaseInfo().SKU {
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

func (b *LOM) AddDevice(sku string, dev *hw.Device) {

	m := b.AddUnit(dev)

	for _, x := range dev.Procs {
		m.LOM.AddUnit(x)
	}

	for _, x := range dev.Memory {
		m.LOM.AddUnit(x)
	}

	for _, x := range dev.Nics {
		m.LOM.AddUnit(x)
	}

	for _, x := range dev.Disks {
		m.LOM.AddUnit(x)
	}

}
