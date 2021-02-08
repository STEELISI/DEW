package components

import (
	"gitlab.com/mergetb/xir/lang/go/hw"
)

// I350DA4 is a thing
func I350DA4() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "i350-DA4",
		},
		Kind: "eth",
		Ports: []*hw.Port{
			{Protocol: hw.Base1000T, Capacity: hw.Gbps(1)},
			{Protocol: hw.Base1000T, Capacity: hw.Gbps(1)},
			{Protocol: hw.Base1000T, Capacity: hw.Gbps(1)},
			{Protocol: hw.Base1000T, Capacity: hw.Gbps(1)},
		},
	}

}

// XL710DA4 is a thing
func XL710DA4() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "XL710-DA4",
		},
		Kind: "eth",
		Ports: []*hw.Port{
			{Protocol: hw.GBase10SR, Capacity: hw.Gbps(10)},
			{Protocol: hw.GBase10SR, Capacity: hw.Gbps(10)},
			{Protocol: hw.GBase10SR, Capacity: hw.Gbps(10)},
			{Protocol: hw.GBase10SR, Capacity: hw.Gbps(10)},
		},
	}

}

// Ipmi is an IPMI NIC
func Ipmi() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "ASpeed",
			Model:        "IPMI NIC",
		},
		Kind: "eth",
		Ports: []*hw.Port{
			{Protocol: hw.Base1000T, Capacity: hw.Mbps(100)},
		},
	}

}

// ConnectX4_2x100 is a Mellanox 4th generation dual port 100 gbps NIC.
func ConnectX4_2x100() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "MCX516A-CCAT",
		},
		Ports: []*hw.Port{
			{Protocol: hw.GBase100SR4, Capacity: hw.Gbps(100)},
			{Protocol: hw.GBase100SR4, Capacity: hw.Gbps(100)},
		},
	}

}

// ConnectX4_2x25 is a Mellanox 4th generation dual port 25 gbps NIC.
func ConnectX4_2x25() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "MCX4121A-ACAT",
		},
		Ports: []*hw.Port{
			{Protocol: hw.GBase25SR, Capacity: hw.Gbps(25)},
			{Protocol: hw.GBase25SR, Capacity: hw.Gbps(25)},
		},
	}

}
