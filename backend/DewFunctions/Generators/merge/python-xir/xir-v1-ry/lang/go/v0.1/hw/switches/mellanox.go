package switches

import (
	"gitlab.com/mergetb/xir/lang/go/hw"
)

// Msn2410 is a 48 port 25 gbps sfp28 switch with 8 100 gbps qsfp28 uplinks.
func Msn2410() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "Mellanox 2410 48x25G Switch",
			Manufacturer: "Mellanox",
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
			Protocol: hw.GBase25SR,
			Capacity: hw.Gbps(25),
		})
	}
	for i := 0; i < 8; i++ {
		d.Nics[2].Ports = append(d.Nics[2].Ports, &hw.Port{
			Protocol: hw.GBase100SR4,
			Capacity: hw.Gbps(100),
		})
	}

	return d

}

// Msn2700 is a 32 port 100 gbps qsfp28 switch. Based on the Spectrum ASIC.
func Msn2700() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "Mellanox SN2700 32x100G Switch",
			Manufacturer: "Mellanox",
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
			Protocol: hw.GBase100SR4,
			Capacity: hw.Gbps(100),
		})
	}

	return d

}

// Msn3700 is a 64 port 100 gbps qsfp28 switch. Based on the Spectrum 2 ASIC.
func Msn3700() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "Mellanox SN3700 64x100G Switch",
			Manufacturer: "Mellanox",
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

	for i := 0; i < 64; i++ {
		d.Nics[1].Ports = append(d.Nics[1].Ports, &hw.Port{
			Protocol: hw.GBase100SR4,
			Capacity: hw.Gbps(100),
		})
	}

	return d

}

// Msn2100 is a 16 port 100 gbps qsfp28 switch. Based on the Spectrum ASIC.
func Msn2100() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "Mellanox SN2100 16x100G Switch",
			Manufacturer: "Mellanox",
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

	for i := 0; i < 16; i++ {
		d.Nics[1].Ports = append(d.Nics[1].Ports, &hw.Port{
			Protocol: hw.GBase100SR4,
			Capacity: hw.Gbps(100),
		})
	}

	return d

}
