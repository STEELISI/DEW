package tb

import (
	"fmt"
	"os"
	"sort"

	"text/tabwriter"

	"github.com/leekchan/accounting"
	"gitlab.com/mergetb/xir/lang/go/v0.2"
)

type Cost struct {
	Price    float64
	Quantity int
	SKU      string
}

type Tally map[string]*Cost

type TallyItem struct {
	Name string
	Cost *Cost
}

func (t Tally) Add(item, sku string, price float64) {

	if price == 0.0 {
		return
	}

	x, ok := t[item]
	if ok {
		x.Quantity += 1
	} else {
		t[item] = &Cost{
			Price:    price,
			SKU:      sku,
			Quantity: 1,
		}
	}

}

func (t Tally) Print() {

	var tw = tabwriter.NewWriter(os.Stdout, 0, 0, 4, ' ', 0)

	ac := accounting.Accounting{Symbol: "$", Precision: 2}

	var sorted []TallyItem
	for item, cost := range t {
		sorted = append(sorted, TallyItem{item, cost})
	}

	sort.Slice(sorted, func(i, j int) bool {
		a := sorted[i].Cost.Price * float64(sorted[i].Cost.Quantity)
		b := sorted[j].Cost.Price * float64(sorted[j].Cost.Quantity)
		return a > b
	})

	total := 0.0

	fmt.Fprintf(tw, "%s\t%s\t%s\t%s\t%s\n", "ITEM", "SKU", "PRICE", "QUANTITY", "COST")
	for _, x := range sorted {

		c := x.Cost.Price * float64(x.Cost.Quantity)
		fmt.Fprintf(tw, "%s\t%s\t%s\t%d\t%s\n",
			x.Name,
			x.Cost.SKU,
			ac.FormatMoney(x.Cost.Price),
			x.Cost.Quantity,
			ac.FormatMoney(c),
		)
		total += c

	}
	fmt.Fprintf(tw, "%s\t%s\t%s\t%s\t%s\n",
		"--------------------", "----------", "----------", "--------", "----------")
	fmt.Fprintf(tw, "%s\t%s\t%s\t%s\t%s\n", "", "", "", "", ac.FormatMoney(total))
	tw.Flush()

}

func CalculateCost(net *xir.Net) Tally {

	tally := make(Tally)

	calculateCost(net, tally)

	return tally
}

func calculateCost(net *xir.Net, tally Tally) {

	for _, x := range net.Nodes {

		r := GetResourceSpec(x)
		if r == nil {
			continue
		}

		dev := r.System.Device

		tally.Add(dev.Model, dev.SKU, dev.Cost)

		for _, x := range dev.Procs {
			tally.Add(x.Model, x.SKU, x.Cost)
		}

		for _, x := range dev.Memory {
			tally.Add(x.Model, x.SKU, x.Cost)
		}

		for _, x := range dev.Nics {
			tally.Add(x.Model, x.SKU, x.Cost)
		}

		for _, x := range dev.Disks {
			tally.Add(x.Model, x.SKU, x.Cost)
		}

		for _, x := range dev.GPUs {
			tally.Add(x.Model, x.SKU, x.Cost)
		}

		for _, x := range dev.PSUs {
			tally.Add(x.Model, x.SKU, x.Cost)
		}

	}

	for _, x := range net.Links {

		c := GetCableSpec(x)
		if c == nil {
			continue
		}

		if c.Cost > 0.0 {
			tally.Add(c.Model, c.SKU, c.Cost)
		}

	}

	for _, x := range net.Nets {
		calculateCost(x, tally)
	}

}
