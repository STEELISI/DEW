package build

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	"gitlab.com/mergetb/xir/v0.3/go"
)

func cablingSpec(fa *xir.Facility) {

	topo := fa.Lift()

	for _, d := range topo.Devices {

		var info string
		pi := d.Resource().ProductInfo
		if pi != nil {
			info = pi.Model
			if pi.SKU != "" {
				info += " " + pi.SKU
			}
		}

		fmt.Printf("[%s] %s:\n", info, d.Id())
		_listNeighbors(d, "  ", true)
	}

}

type GraphologyNode struct {
	Label string  `json:"label"`
	X     float32 `json:"x,omitempty"`
	Y     float32 `json:"y,omitempty"`
	Color string  `json:"color,omitempty"`
	Size  int     `size:"size,omitempty"`
}

type GraphologyEdge struct {
	Nodes [2]string `json:"nodes"`
	Color string    `json:"color,omitempty"`
	Size  int       `json:"size,omitempty"`
}

type GraphologySpec struct {
	Nodes []GraphologyNode `json:"nodes"`
	Edges []GraphologyEdge `json:"edges"`
}

func saveGraphologySpec(fa *xir.Facility) {

	gs := graphologySpec(fa)

	out, err := json.MarshalIndent(gs, "", "  ")
	if err != nil {
		log.Fatal("encode: %v", err)
	}

	err = ioutil.WriteFile("graphology.json", out, 0644)
	if err != nil {
		log.Fatal("write: %v", err)
	}

}

func graphologySpec(fa *xir.Facility) GraphologySpec {

	topo := fa.Lift()

	var gs GraphologySpec

	for _, d := range topo.Devices {

		gs.Nodes = append(gs.Nodes, GraphologyNode{
			Label: d.Id(),
			Size:  10,
		})

	}

	for _, c := range topo.Connections {
		for i, e1 := range c.Edges {

			color := "#222222"

			if e1.Interface == nil {
				continue
			}
			if e1.Interface.Device == nil {
				continue
			}
			d1 := e1.Interface.Device

			switch e1.Interface.Port().Role {
			case xir.LinkRole_InfraLink:
				color = "#247F50"
			case xir.LinkRole_XpLink:
				color = "#083D77"
			case xir.LinkRole_MgmtLink:
				color = "#EE5622"
			}

			for _, e2 := range c.Edges[i:len(c.Edges)] {
				if e2.Interface == nil {
					continue
				}
				if e2.Interface.Device == nil {
					continue
				}
				d2 := e2.Interface.Device

				if d1 == d2 {
					continue
				}

				gs.Edges = append(gs.Edges, GraphologyEdge{
					Nodes: [2]string{d1.Id(), d2.Id()},
					Color: color,
				})

			}
		}
	}

	return gs

}
