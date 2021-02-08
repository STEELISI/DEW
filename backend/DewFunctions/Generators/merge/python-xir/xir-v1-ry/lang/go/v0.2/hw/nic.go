package hw

import (
	"fmt"
	"strings"
	"text/tabwriter"

	"github.com/dustin/go-humanize"
	"gitlab.com/mergetb/xir/lang/go/v0.2"
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

	// 50 gbps
	GBase50SR4
	GBase50LR4
	GBase50ER4
	GBase50CR
	GBase50KR
	GBase50SR
	GBase50LR
	GBase50FR
	GBase50ER
	LAUI_2
	GAUI50_1
	GAUI50_2

	// 200 gbps
	GBase200CR4
	GBase200KR4
	GBase200SR4
	GBase200DR4
	GBase200FR4
	GBase200LR4
	GBase200ER4
	GAUI200_4
	GAUI200_8

	// 400 gbps
	GBase400SR16
	GBase400SR8
	GBase400SR4_2
	GBase400DR4
	GBase400FR8
	GBase400ER8
	GBase400ZR
	GAUI400_16
	GAUI400_8

	XBee
	ZWave
	Zigbee

	CXP100
	CXP120
)

func (l Layer1) String() string {

	switch l {
	// 100 mbps
	case Base100T:
		return "Base100T"

	// 1 gbps
	case Base1000T:
		return "Base1000T"
	case Base1000X:
		return "Base1000X"
	case Base1000CX:
		return "Base1000CX"
	case Base1000SX:
		return "Base1000SX"
	case Base1000LX:
		return "Base1000LX"
	case Base1000LX10:
		return "Base1000LX10"
	case Base1000EX:
		return "Base1000EX"
	case Base1000BX10:
		return "Base1000BX10"
	case Base1000ZX:
		return "Base1000ZX"

	// 10 gbps
	case GBase10T:
		return "GBase10T"
	case GBase10CR:
		return "GBase10CR"
	case GBase10SR:
		return "GBase10SR"
	case GBase10LR:
		return "GBase10LR"
	case GBase10LRM:
		return "GBase10LRM"
	case GBase10ER:
		return "GBase10ER"
	case GBase10ZR:
		return "GBase10ZR"
	case GBase10LX4:
		return "GBase10LX4"
	case GBase10PR:
		return "GBase10PR"

	// 25 gbps
	case GBase25CR:
		return "GBase25CR"
	case GBase25SR:
		return "GBase25SR"
	case GBase25LR:
		return "GBase25LR"
	case GBase25ER:
		return "GBase25ER"

	// 40 gbps
	case GBase40CR4:
		return "GBase40CR4"
	case GBase40SR4:
		return "GBase40SR4"
	case GBase40LR4:
		return "GBase40LR4"
	case GBase40ER4:
		return "GBase40ER4"

	// 100 gbps
	case GBase100CR4:
		return "GBase100CR4"
	case GBase100SR4:
		return "GBase100SR4"
	case GBase100SR10:
		return "GBase100SR10"
	case GBase100LR4:
		return "GBase100LR4"
	case GBase100ER4:
		return "GBase100ER4"

		// Console
	case RS232:
		return "RS232"
	case Uart:
		return "Uart"

	// 50 gbps
	case GBase50CR:
		return "GBase50CR"
	case GBase50KR:
		return "GBase50KR"
	case GBase50SR:
		return "GBase50SR"
	case GBase50LR:
		return "GBase50LR"
	case GBase50FR:
		return "GBase50FR"
	case GBase50ER:
		return "GBase50ER"
	case LAUI_2:
		return "LAUI_2"
	case GAUI50_1:
		return "GAUI50_1"
	case GAUI50_2:
		return "GAUI50_2"

	// 200 gbps
	case GBase200CR4:
		return "GBase200CR4"
	case GBase200KR4:
		return "GBase200KR4"
	case GBase200SR4:
		return "GBase200SR4"
	case GBase200DR4:
		return "GBase200DR4"
	case GBase200FR4:
		return "GBase200FR4"
	case GBase200LR4:
		return "GBase200LR4"
	case GBase200ER4:
		return "GBase200ER4"
	case GAUI200_4:
		return "GAUI200_4"
	case GAUI200_8:
		return "GAUI200_8"

	//400 gbps
	case GBase400SR16:
		return "Gbase400SR16"
	case GBase400SR8:
		return "Gbase400SR8"
	case GBase400SR4_2:
		return "Gbase400SR4_2"
	case GBase400DR4:
		return "Gbase400DR4"
	case GBase400FR8:
		return "Gbase400FR8"
	case GBase400ER8:
		return "Gbase400ER8"
	case GBase400ZR:
		return "Gbase400ZR"
	case GAUI400_16:
		return "GAUI400_16"
	case GAUI400_8:
		return "GAUI400_8"

	default:
		return "?"

	}

}

type Nic struct {
	Base
	StartingIndex int     `json:"starting_index"`
	Ports         []*Port `json:"ports"`
	Kind          string  `json:"kind"`
}

const (
	Onboard    = "eno"
	Peripheral = "enp"
)

func (n Nic) BaseInfo() Base { return n.Base }
func (n Nic) Show() string {
	return fmt.Sprintf("%s %dx%s %s",
		n.Base.Model,
		len(n.Ports),
		strings.ToLower(humanize.SI(float64(n.Ports[0].Capacity), "bps")),
		n.Ports[0].FormFactor,
	)
}

func NicHeader(tw *tabwriter.Writer) {

	fmt.Fprintf(tw, "COUNT\tMANUFACTURER\tMODEL\tPORTS\tCAPACITY\tFORM FACTOR\n")

}

func (n Nic) Table(count int, tw *tabwriter.Writer) {

	fmt.Fprintf(tw, "%d\t%s\t%s\t%d\t%s\t%s\n",
		count,
		n.Base.Manufacturer,
		n.Base.Model,
		len(n.Ports),
		strings.ToLower(humanize.SI(float64(n.Ports[0].Capacity), "bps")),
		n.Ports[0].FormFactor,
	)

}

func (n *Nic) GetKind() string {
	if n.Kind == "" {
		return "eth"
	} else {
		return n.Kind
	}
}

func (n *Nic) Onboard() {
	n.Kind = "eno"
}

type Port struct {
	Protocols  []Layer1      `json:"protocol,omitempty"`
	Capacity   uint64        `json:"capacity,omitempty"` //bits per second
	Mac        string        `json:"mac,omitempty"`
	FormFactor ConnectorKind `json:"form_factor,omitempty"`
	Connector  *Connector    `json:"-" yaml:"-" mapstructure:"-"`
	Breakout   string

	Endpoint *xir.Endpoint `json:"-" yaml:"-" mapstructure:"-"`
}

func Ports(count int, p *Port) []*Port {

	result := []*Port{p}

	for i := 0; i < count-1; i++ {
		x := new(Port)
		*x = *p
		result = append(result, x)
	}

	return result

}
