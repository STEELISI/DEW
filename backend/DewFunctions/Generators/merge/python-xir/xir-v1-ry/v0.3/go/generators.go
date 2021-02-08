package xir

import (
	"fmt"
	"github.com/dustin/go-humanize"
	"math/rand"
)

func GenericNIC(
	parent *Resource,
	kind NICKind,
	linkRole LinkRole,
	radix uint,
	capacity uint64,
	protocols []Layer1,
	formFactor ConnectorKind,
) *NIC {

	startingIndex := uint32(0)
	if kind == NICKind_SWP {
		startingIndex = 1
	}

	idx := uint32(0)
	for _, n := range parent.NICs {
		for _ = range n.Ports {
			idx++
		}
	}

	n := &NIC{
		StartingIndex: startingIndex,
		Kind:          kind,
		ProductInfo: &ProductInfo{
			Manufacturer: "Generic",
			Model: fmt.Sprintf("Generic NIC %dx%d",
				radix, humanize.SI(float64(capacity), "bps")),
			SKU: fmt.Sprintf("GNIC%dX%d",
				radix, humanize.SI(float64(capacity), "")),
		},
	}

	for i := uint(1); i <= radix; i++ {
		n.Ports = append(n.Ports, &Port{
			Parent:     parent.Id,
			Index:      idx,
			Protocols:  protocols,
			Capacity:   capacity,
			Mac:        macgen(),
			FormFactor: formFactor,
			Role:       linkRole,
		})
		idx++

	}

	parent.NICs = append(parent.NICs, n)

	return n

}

func macgen() string {
	x := rand.Int31()
	s := fmt.Sprintf("%08x", x)
	return fmt.Sprintf("00:00:%s:%s:%s:%s", s[0:2], s[2:4], s[4:6], s[6:8])
}

func GenericConnector(
	index uint32,
	parent string,
	capacity uint64,
	kind ConnectorKind,
	protocols ...Layer1,
) *Connector {

	return &Connector{
		Index:     index,
		Parent:    parent,
		Kind:      kind,
		Protocols: protocols,
		Capacity:  capacity,
	}

}

func GenericCable(
	id string,
	capacity uint64,
	cableKind CableKind,
	connectorKind ConnectorKind,
	protocols ...Layer1,
) *Cable {

	return &Cable{
		Id:   id,
		Kind: cableKind,
		Ends: []*End{
			{
				Connectors: []*Connector{
					GenericConnector(0, id, capacity, connectorKind, protocols...),
				},
			},
			{
				Connectors: []*Connector{
					GenericConnector(1, id, capacity, connectorKind, protocols...),
				},
			},
		},
	}

}

func (c *Cable) Connect(ports ...*Port) {

}
