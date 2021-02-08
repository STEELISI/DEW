package hw

import (
	"fmt"
	"text/tabwriter"

	"github.com/dustin/go-humanize"
)

type DiskFormFactor int

const (
	DiskFormFactorUnknown DiskFormFactor = iota

	HDD35
	HDD25

	SSD35
	SSD25

	MSATA
	M2_2216
	M2_2226
	M2_2230
	M2_2238
	M2_2242
	M2_2260
	M2_2280
	M2_22110

	U2

	EMMC
	EUSB
)

func (dff DiskFormFactor) String() string {

	switch dff {
	case HDD35:
		return "3.5 inch HDD"
	case HDD25:
		return "2.5 inch HDD"
	case SSD35:
		return "3.5 inch SSD"
	case SSD25:
		return "2.5 inch SSD"
	case MSATA:
		return "mSATA"
	case M2_2216:
		return "M.2 22x16mm"
	case M2_2226:
		return "M.2 22x26mm"
	case M2_2230:
		return "M.2 22x30mm"
	case M2_2238:
		return "M.2 22x38mm"
	case M2_2242:
		return "M.2 22x42mm"
	case M2_2260:
		return "M.2 22x60mm"
	case M2_2280:
		return "M.2 22x80mm"
	case M2_22110:
		return "M.2 22x110mm"
	case U2:
		return "U.2"
	case EMMC:
		return "eMMC"
	case EUSB:
		return "eUSB"
	default:
		return "?"
	}

}

type DiskInterface int

const (
	DiskInterfaceUnknown DiskInterface = iota

	SATA1
	SATA2
	SATA3

	NVMEx2
	NVMEx4

	MMC
	SD

	USB

	SAS
)

func (di DiskInterface) String() string {
	switch di {
	case SATA1:
		return "SATA1"
	case SATA2:
		return "SATA2"
	case SATA3:
		return "SATA3"
	case NVMEx2:
		return "NVMe x2"
	case NVMEx4:
		return "NVMe x4"
	case USB:
		return "USB"
	default:
		return "?"
	}
}

type Disk struct {
	Base
	Capacity   uint64         `json:"capacity"`
	FormFactor DiskFormFactor `json:"formfactor"`
	Interface  DiskInterface  `json:"interface"`
}

func DiskHeader(tw *tabwriter.Writer) {

	fmt.Fprintf(tw, "COUNT\tMANUFACTURER\tMODEL\tCAPACITY\tINTERFACE\tFORM FACTOR\n")

}

func (d Disk) Show() string {

	return fmt.Sprintf("%s %s",
		d.Base.Model,
		humanize.IBytes(d.Capacity),
	)

}

func (d Disk) BaseInfo() Base { return d.Base }

func (d Disk) Table(count int, tw *tabwriter.Writer) {

	fmt.Fprintf(tw, "%d\t%s\t%s\t%s\t%s\t%s\n",
		count,
		d.Base.Manufacturer,
		d.Base.Model,
		humanize.IBytes(d.Capacity),
		d.Interface,
		d.FormFactor,
	)
}
