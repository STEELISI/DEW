package switches

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

// CxExpress1G is a thing
func CxExpress1G() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "Cumulus Express 1G",
			Manufacturer: "Cumulus",
		},
		Nics: []hw.Nic{
			{Kind: "eth"},
			{Kind: "swp"},
			{Kind: "swp"},
		},
	}

	d.Nics[0].Ports = []*hw.Port{
		{Protocols: []hw.Layer1{hw.Base1000T}, Capacity: hw.Mbps(1000)},
		{Protocols: []hw.Layer1{hw.Base1000T}, Capacity: hw.Mbps(1000)},
	}

	for i := 0; i < 48; i++ {
		d.Nics[1].Ports = append(d.Nics[1].Ports, &hw.Port{
			Protocols: []hw.Layer1{hw.Base1000T},
			Capacity:  hw.Mbps(1000),
		})
	}

	for i := 0; i < 4; i++ {
		d.Nics[2].Ports = append(d.Nics[2].Ports, &hw.Port{
			Protocols: []hw.Layer1{hw.GBase10SR},
			Capacity:  hw.Mbps(10000),
		})
	}

	return d

}
