package switches

import (
	"gitlab.com/mergetb/xir/lang/go/hw"
)

// QuantaT1048LY4R is a 48 port 1 gbps RJ45 switch
func QuantaT1048LY4R() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "QuantaMesh T1048-LY4R",
			Manufacturer: "Quanta Cloud Technology",
		},
		Nics: []hw.Nic{
			{Kind: "eth"},
			{Kind: "swp"},
			{Kind: "swp"},
		},
	}

	d.Nics[0].Ports = []*hw.Port{{
		Protocol: hw.Base1000T,
		Capacity: hw.Mbps(1000),
	}}

	for i := 0; i < 48; i++ {
		d.Nics[1].Ports = append(d.Nics[1].Ports, &hw.Port{
			Protocol: hw.Base1000T,
			Capacity: hw.Mbps(1000),
		})
	}

	for i := 0; i < 4; i++ {
		d.Nics[2].Ports = append(d.Nics[2].Ports, &hw.Port{
			Protocol: hw.GBase10SR,
			Capacity: hw.Mbps(10000),
		})
	}

	return d

}
