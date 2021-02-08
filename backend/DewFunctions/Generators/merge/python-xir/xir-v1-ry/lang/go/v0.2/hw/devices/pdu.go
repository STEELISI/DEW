package devices

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

func PDU() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "Rack PDU",
			Manufacturer: "APC",
			SKU:          "APXXXX",
		},
		Nics: []hw.Nic{{
			Base: hw.Base{Integrated: true},
			Kind: "eth",
			Ports: []*hw.Port{
				{Protocols: []hw.Layer1{hw.Base1000T}, Capacity: hw.Mbps(1000)},
			},
		}},
	}

	return d

}
