package main

import (
	"gitlab.com/mergetb/xir/lang/go/hw"
)

// Devices ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

func MinnowBoard() *hw.Device {

	return &hw.Device{
		Base: hw.Base{
			Model:        "MinnowBoard",
			Manufacturer: "ADI Engineering",
		},
		Procs: []hw.Proc{
			AtomE3845(),
		},
		Memory: []hw.Dimm{
			{Capacity: hw.Gb(1)},
			{Capacity: hw.Gb(1)},
		},
		Nics: []hw.Nic{
			I210AT(),
			I210AT(),
		},
		Ttys: []hw.Tty{
			{Protocol: hw.RS232},
		},
		Usbs: []hw.Usb{
			{Version: hw.USB31},
			{Version: hw.USB20},
		},
	}

}

func RccVe() *hw.Device {

	return &hw.Device{
		Base: hw.Base{
			Model:        "RCC-VE",
			Manufacturer: "ADI Engineering",
		},
		Procs: []hw.Proc{
			AtomC2558(),
		},
		Memory: []hw.Dimm{
			{Capacity: hw.Gb(1)},
			{Capacity: hw.Gb(1)},
			{Capacity: hw.Gb(1)},
			{Capacity: hw.Gb(1)},
			{Capacity: hw.Gb(1)},
			{Capacity: hw.Gb(1)},
			{Capacity: hw.Gb(1)},
			{Capacity: hw.Gb(1)},
		},
		Nics: []hw.Nic{
			I210AT(),
			I210AT(),
			I210AT(),
			I210AT(),
			I210AT(),
			I210AT(),
		},
		Ttys: []hw.Tty{
			{Protocol: hw.Uart},
		},
		Usbs: []hw.Usb{
			{Version: hw.USB20},
			{Version: hw.USB20},
		},
	}

}

func XPort() *hw.Device {

	return &hw.Device{
		Base: hw.Base{
			Model:        "XPort",
			Manufacturer: "Lantronix",
		},
		Nics: []hw.Nic{{
			Kind: "eth",
			Ports: []*hw.Port{{
				Protocol: hw.Base100T,
				Capacity: hw.Mbps(100),
			}},
		}},
	}

}

func Moa1000() *hw.Device {

	return &hw.Device{
		Base: hw.Base{
			Model:        "Moa1000",
			Manufacturer: "Silicon Mechanics",
		},
		Procs: []hw.Proc{
			Epyc7351(),
		},
		Memory: []hw.Dimm{
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
		},
		Nics: []hw.Nic{
			I350_DA4(),
			ConnectX4_2x100(),
			NetronomeLX_100(),
			NetronomeLX_100(),
		},
	}

}

func RSled1000() *hw.Device {

	return &hw.Device{
		Base: hw.Base{
			Model:        "RSled1000",
			Manufacturer: "Silicon Mechanics",
		},
		Procs: []hw.Proc{
			Epyc7301(),
		},
		Memory: []hw.Dimm{
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
			{Capacity: hw.Gb(16)}, {Capacity: hw.Gb(16)},
		},
		Nics: []hw.Nic{
			I350_DA4(),
			ConnectX4_2x25(),
			ConnectX4_2x25(),
		},
	}

}

func DComp1000() *hw.Device {

	return &hw.Device{
		Base: hw.Base{
			Model:        "RSled1000",
			Manufacturer: "Silicon Mechanics",
		},
		Procs: []hw.Proc{
			Epyc7281(),
		},
		Memory: []hw.Dimm{
			{Capacity: hw.Gb(8)}, {Capacity: hw.Gb(8)},
			{Capacity: hw.Gb(8)}, {Capacity: hw.Gb(8)},
			{Capacity: hw.Gb(8)}, {Capacity: hw.Gb(8)},
			{Capacity: hw.Gb(8)}, {Capacity: hw.Gb(8)},
			{Capacity: hw.Gb(8)}, {Capacity: hw.Gb(8)},
			{Capacity: hw.Gb(8)}, {Capacity: hw.Gb(8)},
			{Capacity: hw.Gb(8)}, {Capacity: hw.Gb(8)},
			{Capacity: hw.Gb(8)}, {Capacity: hw.Gb(8)},
		},
		Nics: []hw.Nic{
			I350_DA4(),
			ConnectX4_2x25(),
		},
	}

}

func EdgecoreAS4610() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "AS4610-54T",
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

func QuantaLYR4() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "Quanta T1048-LYR4",
			Manufacturer: "Quanta",
		},
		Nics: []hw.Nic{
			{Kind: "eth"},
			{Kind: "swp"},
			{Kind: "swp"},
		},
	}

	d.Nics[0].Ports = []*hw.Port{
		{Protocol: hw.Base1000T, Capacity: hw.Mbps(1000)},
		{Protocol: hw.Base1000T, Capacity: hw.Mbps(1000)},
	}

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

func Msn2100() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "SN2100",
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

func Msn2700() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "SN2700",
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

func Zpe96() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "Zpe96",
			Manufacturer: "ZPE",
		},
		Nics: []hw.Nic{{
			Kind: "eth",
			Ports: []*hw.Port{
				{Protocol: hw.Base1000T, Capacity: hw.Mbps(1000)},
				{Protocol: hw.Base1000T, Capacity: hw.Mbps(1000)},
			},
		}},
	}

	for i := 0; i < 96; i++ {
		d.Ttys = append(d.Ttys, hw.Tty{Protocol: hw.RS232})
	}

	return d

}

// Components +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

func AtomE3845() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "E3845",
		},
		ISA:           hw.X86_64,
		Family:        "Atom",
		BaseFrequency: hw.Mhz(1910),
		L2:            hw.Mb(2),
		Cores:         4,
		Threads:       4,
		Tdp:           10,
	}

}

func AtomC2558() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "C2558",
		},
		ISA:           hw.X86_64,
		Family:        "Atom",
		BaseFrequency: hw.Mhz(2400),
		L2:            hw.Mb(2),
		Cores:         4,
		Threads:       4,
		Tdp:           15,
	}

}

func Epyc7351() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7351",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.Mhz(2400),
		L2:            hw.Mb(8),
		Cores:         16,
		Threads:       32,
		Tdp:           155,
	}

}

func Epyc7301() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7301",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.Mhz(2200),
		L2:            hw.Mb(8),
		Cores:         16,
		Threads:       32,
		Tdp:           155,
	}

}

func Epyc7281() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7281",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.Mhz(2100),
		L2:            hw.Mb(8),
		Cores:         16,
		Threads:       32,
		Tdp:           155,
	}

}

func I210AT() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "i210-AT",
		},
		Kind: "eth",
		Ports: []*hw.Port{
			{
				Protocol: hw.Base1000T,
				Capacity: hw.Gbps(1),
			},
		},
	}

}

func I350_DA4() hw.Nic {

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

func ConnectX4_2x100() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "MCX416A-CCAT",
		},
		Kind: "eth",
		Ports: []*hw.Port{
			{Protocol: hw.GBase100SR4, Capacity: hw.Gbps(100)},
			{Protocol: hw.GBase100SR4, Capacity: hw.Gbps(100)},
		},
	}

}

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

func NetronomeLX_100() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Netronome",
			Model:        "LX-100G",
		},
		Ports: []*hw.Port{
			{Protocol: hw.GBase100SR10, Capacity: hw.Gbps(100)},
		},
	}

}

func FsDac100() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "Q28-PC01",
		},
		Kind: hw.DAC,
		Connectors: [2][]*hw.Connector{
			[]*hw.Connector{{
				Base:     hw.Base{Manufacturer: "Fiberstore", Model: "Q28-PC01"},
				Kind:     hw.QSFP28,
				Capacity: 100e9,
				Protocol: hw.GBase100CR4,
			}},
			[]*hw.Connector{{
				Base:     hw.Base{Manufacturer: "Fiberstore", Model: "Q28-PC01"},
				Kind:     hw.QSFP28,
				Capacity: 100e9,
				Protocol: hw.GBase100CR4,
			}},
		},
	}

}

func FsMpoBreakout40x10() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "Q28-PC01",
		},
		Kind: hw.FiberMPOBreakout,
		Connectors: [2][]*hw.Connector{
			[]*hw.Connector{{
				Base:     hw.Base{Manufacturer: "Fiberstore", Model: "QSFP-SR4-40G"},
				Kind:     hw.QSFPP,
				Capacity: 40e9,
				Protocol: hw.GBase40SR4,
			}},
			[]*hw.Connector{
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GSR-85"},
					Kind:     hw.SFPP,
					Capacity: 10e9,
					Protocol: hw.GBase10SR,
				},
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GSR-85"},
					Kind:     hw.SFPP,
					Capacity: 10e9,
					Protocol: hw.GBase10SR,
				},
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GSR-85"},
					Kind:     hw.SFPP,
					Capacity: 10e9,
					Protocol: hw.GBase10SR,
				},
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GSR-85"},
					Kind:     hw.SFPP,
					Capacity: 10e9,
					Protocol: hw.GBase10SR,
				},
			},
		},
	}

}

func Cat6() *hw.Cable {
	return &hw.Cable{
		Kind: hw.Cat6,
		Connectors: [2][]*hw.Connector{
			[]*hw.Connector{{Kind: hw.RJ45, Capacity: 1e9, Protocol: hw.Base1000T}},
			[]*hw.Connector{{Kind: hw.RJ45, Capacity: 1e9, Protocol: hw.Base1000T}},
		},
	}
}
