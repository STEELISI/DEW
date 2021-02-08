package hw

import (
	"fmt"
	"gitlab.com/mergetb/xir/lang/go/v0.2"
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

	DACBreakout

	// FiberLC indicates a fiber cable with LC type connectors
	FiberLC

	// FiberMPOTrunk indicates a fiber trunk cable with MPO connectors
	FiberMPOTrunk

	// FiberMPOBreakout indicates a fiber breakout cable with an MPO connector on
	// the trunk side.
	FiberMPOBreakout

	AOC
)

func (c CableKind) String() string {
	switch c {
	case Cat5:
		return "Cat5"
	case Cat5e:
		return "Cat5e"
	case Cat6:
		return "Cat6"
	case DAC:
		return "DAC"
	case DACBreakout:
		return "DAC Breakout"
	case FiberLC:
		return "Fiber LC"
	case FiberMPOTrunk:
		return "Fiber MPO"
	case FiberMPOBreakout:
		return "Fiber MPO Breakout"
	case AOC:
		return "AOC"
	default:
		return "?"
	}
}

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

	if a == nil || b == nil {
		panic("nil port connect")
	}

	c.Connectors[0][0].Connect(a)
	c.Connectors[1][0].Connect(b)

}

func (c Cable) BaseInfo() Base { return c.Base }
func (c Cable) Show() string {

	var cnx string
	if c.Connectors[0][0].Kind == c.Connectors[1][0].Kind &&
		len(c.Connectors[0]) == len(c.Connectors[1]) {
		cnx = fmt.Sprintf("%s", c.Connectors[0][0].Kind)
	} else {
		cnx = fmt.Sprintf(
			"%dx%s-%dx%s",
			len(c.Connectors[0]), c.Connectors[0][0].Kind,
			len(c.Connectors[1]), c.Connectors[1][0].Kind,
		)
	}

	return fmt.Sprintf("%s %s %s", c.Base.Model, c.Kind, cnx)

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

	// SFP56 type modular connector
	SFP56

	// QSFP56 type modular connector
	QSFP56

	// QSFP double density connector
	QSFPDD
)

func (c ConnectorKind) String() string {

	switch c {

	case RJ45:
		return "RJ45"
	case SFP:
		return "SFP"
	case QSFP:
		return "QSFP"
	case SFPP:
		return "SFP+"
	case QSFPP:
		return "QSFP+"
	case SFP28:
		return "SFP28"
	case QSFP28:
		return "QSFP28"
	case CXP:
		return "CXP"
	case LC:
		return "LC"
	case MPO:
		return "MPO"
	case SFP56:
		return "SFP56"
	case QSFP56:
		return "QSFP56"

	default:
		return "?"

	}

}

// A Connector couples a cable to a host.
type Connector struct {
	Base
	Kind      ConnectorKind `json:"kind,omitempty"`
	Protocols []Layer1      `json:"layer1,omitempty"`
	Capacity  uint64        `json:"capacity,omitempty"`

	Port *Port `json:"-" yaml:"-" mapstructure:"-"`
}

// Link creates an XIR parameterized link from a cable.
func (c *Cable) Link() *xir.Link {

	lnk := &xir.Link{}
	if lnk.Props == nil {
		lnk.Props = make(xir.Props)
	}

	lnk.Props["cable"] = c

	for i, end := range c.Connectors {
		for _, cx := range end {

			if cx.Port != nil && cx.Port.Endpoint != nil {
				cx.Port.Endpoint.Props["end"] = i
				lnk.Endpoints = append(lnk.Endpoints, cx.Port.Endpoint.Ref())
			}

		}
	}

	lnk.Id = xir.LinkID(lnk.Endpoints...)

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

	for i, p := range ps {
		p.Connector = e[i]
		e[i].Port = p
	}

	return nil

}

// Breakout connects a single port to multiple. This function assumes the first
// end is the trunk end of the cable.
func (c *Cable) Breakout(a *Port, b []*Port) {

	c.Connectors[0][0].Connect(a)
	c.Connectors[1].Connect(b...)

}
