package switches

import (
	"gitlab.com/mergetb/xir/lang/go/hw"
)

// EdgeCoreAS6712 is a 32 port 40 gbps switch
func EdgeCoreAS6712() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "AS5712",
			Manufacturer: "EdgeCore",
		},
		Nics: []hw.Nic{
			{Kind: "eth"},
			{Kind: "swp"},
		},
	}

	d.Nics[0].Ports = []*hw.Port{{
		Protocol: hw.Base1000T,
		Capacity: hw.Mbps(1000),
	}}

	for i := 0; i < 32; i++ {
		d.Nics[1].Ports = append(d.Nics[1].Ports, &hw.Port{
			Protocol: hw.GBase40SR4,
			Capacity: hw.Gbps(40),
		})
	}

	return d

}

// EdgeCoreAS4610 is a 48 port 1 gbps switch.
func EdgeCoreAS4610() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "EdgeCore AS4610-54T 48x1G Switch",
			Manufacturer: "Edgecore",
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

// EdgecoreAS5812T is a 48 port 10 gbps switch.
func EdgecoreAS5812T() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "EdgeCore AS5812 48x10G (BaseT) Switch",
			Manufacturer: "EdgeCore",
		},
		Nics: []hw.Nic{
			{Kind: "eth"},
			{Kind: "swp"},
		},
	}

	d.Nics[0].Ports = []*hw.Port{{
		Protocol: hw.Base1000T,
		Capacity: hw.Mbps(1000),
	}}

	for i := 0; i < 48; i++ {
		d.Nics[1].Ports = append(d.Nics[1].Ports, &hw.Port{
			Protocol: hw.GBase10T,
			Capacity: hw.Gbps(10),
		})
	}
	for i := 0; i < 8; i++ {
		d.Nics[1].Ports = append(d.Nics[1].Ports, &hw.Port{
			Protocol: hw.GBase40SR4,
			Capacity: hw.Gbps(40),
		})
	}

	return d

}

// EdgeCoreAS5710 is a 48 port 10 gbps switch
func EdgeCoreAS5710() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "EdgeCore AS4610-54 48x10G Switch",
			Manufacturer: "Edgecore",
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
			Protocol: hw.GBase10SR,
			Capacity: hw.Mbps(1000),
		})
	}

	for i := 0; i < 4; i++ {
		d.Nics[2].Ports = append(d.Nics[2].Ports, &hw.Port{
			Protocol: hw.GBase40SR4,
			Capacity: hw.Mbps(10000),
		})
	}

	return d

}
