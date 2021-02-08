package components

import (
	"fmt"

	"github.com/dustin/go-humanize"
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

func GenericDimm(capacity uint64, frequency uint64, typ hw.MemoryType) hw.Dimm {

	return hw.Dimm{
		Base: hw.Base{
			Manufacturer: "Generic",
			Model: fmt.Sprintf("%s-%s %s",
				typ,
				humanize.SI(float64(frequency), "Hz"),
				humanize.IBytes(capacity),
			),
			SKU: fmt.Sprintf("%s%d%d",
				typ,
				frequency/1e6,
				capacity/1e6,
			),
		},
		Capacity:  capacity,
		Frequency: frequency,
		Type:      typ,
	}

}
