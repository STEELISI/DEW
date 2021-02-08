package hw

import (
	"gitlab.com/mergetb/xir/lang/go"
)

// Layer 1 (physical) protocol
type Layer1 uint

const (
	UnspecProtocol Layer1 = iota

	// 100 mbps
	Base100T

	// 1 gbps
	Base1000T
	Base1000X
	Base1000CX
	Base1000SX
	Base1000LX
	Base1000LX10
	Base1000EX
	Base1000BX10
	Base1000ZX

	// 10 gbps
	GBase10T
	GBase10CR
	GBase10SR
	GBase10LR
	GBase10LRM
	GBase10ER
	GBase10ZR
	GBase10LX4
	GBase10PR

	// 25 gbps
	GBase25CR
	GBase25SR
	GBase25LR
	GBase25ER

	// 40 gbps
	GBase40CR4
	GBase40SR4
	GBase40LR4
	GBase40ER4

	// 100 gbps
	GBase100CR4
	GBase100SR4
	GBase100SR10
	GBase100LR4
	GBase100ER4

	// Console
	RS232
	Uart
)

type Nic struct {
	Base
	Ports []*Port `json:"ports"`
	Kind  string  `json:"kind"`
}

func (n *Nic) GetKind() string {
	if n.Kind == "" {
		return "eth"
	} else {
		return n.Kind
	}
}

type Port struct {
	Protocol  Layer1     `json:"protocol"`
	Capacity  uint64     `json:"capacity"` //bits per second
	Mac       string     `json:"mac"`
	Connector *Connector `json:"connector"`

	Endpoint *xir.Endpoint `json:"-"`
}
