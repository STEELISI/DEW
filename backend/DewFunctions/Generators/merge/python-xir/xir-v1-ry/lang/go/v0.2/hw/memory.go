package hw

import (
	"fmt"
	"text/tabwriter"

	"github.com/dustin/go-humanize"
)

type MemoryType int

const (
	MemoryTypeUnknown MemoryType = iota
	DDR3
	DDR4
)

func (t MemoryType) String() string {
	switch t {
	case DDR3:
		return "DDR3"
	case DDR4:
		return "DDR4"
	default:
		return "?"
	}
}

type Dimm struct {
	Base
	Type      MemoryType `json:"type,omitempty"`
	Capacity  uint64     `json:"capacity,omitempty"`
	Frequency uint64     `json:"frequency,omitempty"`
}

func (d Dimm) BaseInfo() Base { return d.Base }
func (d Dimm) Show() string   { return d.Base.Model }

func DimmHeader(tw *tabwriter.Writer) {

	fmt.Fprintf(tw, "COUNT\tTYPE\tCAPACITY\tFREQUENCY\n")

}

func (d Dimm) Table(count int, tw *tabwriter.Writer) {

	fmt.Fprintf(tw, "%d\t%s\t%s\t%s\n",
		count,
		d.Type,
		humanize.IBytes(d.Capacity),
		humanize.SI(float64(d.Frequency), "Hz"),
	)

}
