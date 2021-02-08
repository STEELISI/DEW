package hw

import (
	"fmt"
	"text/tabwriter"

	"github.com/dustin/go-humanize"
)

// instruction set architecture

// ISA enum indicates instruction set achitecture.
type ISA uint

const (
	Unknown ISA = iota
	// X86_64 indicates Intel x86 ISA with 64 bit addresses
	X86_64
)

func (i ISA) String() string {

	switch i {
	case Unknown:
		return "?"
	case X86_64:
		return "x86_64"
	default:
		return "?"
	}

}

// Proc represents a processor
type Proc struct {
	Base
	ISA           ISA    `json:"isa,omitempty"`
	Family        string `json:"family,omitempty"`
	BaseFrequency uint64 `json:"basefrequency,omitempty"`
	L2            uint64 `json:"l2,omitempty"`
	Cores         uint   `json:"cores,omitempty"`
	Threads       uint   `json:"threads,omitempty"`
	Tdp           uint   `json:"tdp,omitempty"`
}

func (p Proc) BaseInfo() Base { return p.Base }
func (p Proc) Show() string   { return p.Base.Model }

func ProcHeader(tw *tabwriter.Writer) {

	fmt.Fprintf(tw, "COUNT\tMODEL\tISA\tFAMILY\tBASE FREQUENCY\tL2\tCORES\tTHREADS\tTDP\n")

}

func (p Proc) Table(count int, tw *tabwriter.Writer) {

	fmt.Fprintf(tw, "%d\t%s\t%s\t%s\t%s\t%s\t%d\t%d\t%s\n",
		count,
		p.Base.Model,
		p.ISA,
		p.Family,
		humanize.SI(float64(p.BaseFrequency), "Hz"),
		humanize.IBytes(p.L2),
		p.Cores,
		p.Threads,
		humanize.SI(float64(p.Tdp), "W"),
	)

}
