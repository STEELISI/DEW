package xir

import (
	"fmt"
	"os"
	"text/tabwriter"
)

var tw = tabwriter.NewWriter(os.Stdout, 0, 0, 1, ' ', 0)

func (n *Net) Table() {

	fmt.Println(n.Label())

	for _, n := range n.Nodes {

		var nbrs []string
		for _, e := range n.Neighbors() {
			nbrs = append(nbrs, e.Parent.Label())
		}
		s := "\t" + n.Label() + "\t\t"
		for i, x := range nbrs {
			// break up lines by 24 elements
			if i != 0 && i%24 == 0 {
				s += "\n\t\t\t"
			}
			s += x + "\t"
		}
		fmt.Fprintf(tw, "%s\n", s)
		tw.Flush()

	}

	for _, n := range n.Nets {
		n.Table()
	}

}
