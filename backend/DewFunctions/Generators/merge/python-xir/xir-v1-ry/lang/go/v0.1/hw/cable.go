package hw

import (
	"fmt"

	"github.com/satori/go.uuid"
	"gitlab.com/mergetb/xir/lang/go"
)

// CableKind defines the type of cable
type CableKind uint16

const (
	// UnspecCable indicates the cable kind is not defined
	UnspecCable CableKind = iota

	// Cat5 indicates a category 5 copper cable
	Cat5

	// Cat5e indicates a category 5 enhanced copper cable
	Cat5e

	// Cat6 indicates a category 6 copper cable
	Cat6

	// DAC indicates a direct attach copper cable
	DAC

	// FiberLC indicates a fiber cable with LC type connectors
	FiberLC

	// FiberMPOTrunk indicates a fiber trunk cable with MPO connectors
	FiberMPOTrunk

	// FiberMPOBreakout indicates a fiber breakout cable with an MPO connector on
	// the trunk side.
	FiberMPOBreakout
)

// An End represents an end of a cable that may have 1 or many connectors
// (breakout cable).
type End []*Connector

// A Cable is a physical link between two hosts.
type Cable struct {
	Base
	Kind       CableKind
	Connectors [2]End
	Length     uint64 //meters
	Props      xir.Props
}

// Connect a simple straight cable. Breakouts require more detailed attention.
func (c *Cable) Connect(a, b *Port) {

	c.Connectors[0][0].Connect(a)
	c.Connectors[1][0].Connect(b)

}

// ConnectorKind defines the type of connector.
type ConnectorKind uint16

const (
	// UnspecConnector indicates the connector kind is not defined
	UnspecConnector ConnectorKind = iota

	// RJ45 type twisted pair connector.
	RJ45

	// SFP type modular connector.
	SFP

	// QSFP type modular connector.
	QSFP

	// SFPP indicates SFP+ type modular connector
	SFPP

	// QSFPP indicates QSFP+ type modular connector
	QSFPP

	// SFP28 type modular connector
	SFP28

	// QSFP28 type modular connector
	QSFP28

	// CXP type modular connector
	CXP

	// LC type fiber connector
	LC

	// MPO type fiber connector
	MPO
)

// A Connector couples a cable to a host.
type Connector struct {
	Base
	Kind     ConnectorKind
	Protocol Layer1
	Capacity uint64

	Port *Port `json:"-" yaml:"-"`
}

// Link creates an XIR parameterized link from a cable.
func (c *Cable) Link() *xir.Link {

	lnk := &xir.Link{
		Id:    uuid.NewV4().String(),
		Props: c.Props,
	}
	if lnk.Props == nil {
		lnk.Props = make(xir.Props)
	}
	lnk.Props["model"] = c.Model

	for _, end := range c.Connectors {
		for _, cx := range end {

			if cx.Port != nil && cx.Port.Endpoint != nil {
				lnk.Endpoints = append(lnk.Endpoints, cx.Port.Endpoint)
			}

		}
	}

	return lnk

}

// Connect a connector to a port.
func (c *Connector) Connect(p *Port) {

	p.Connector = c
	c.Port = p

}

// Connect a cable end to a set of ports
func (e End) Connect(ps ...*Port) error {

	if len(ps) > len(e) {
		return fmt.Errorf(
			"cannot connect %d ports to %d connectors", len(ps), len(e))
	}

	for _, p := range ps {
		for _, c := range e {
			p.Connector = c
			c.Port = p
		}
	}

	return nil

}

// Breakout connects a single port to multiple. This function assumes the first
// end is the trunk end of the cable.
func (c *Cable) Breakout(a *Port, b []*Port) {

	c.Connectors[0][0].Connect(a)
	c.Connectors[1].Connect(b...)

}
