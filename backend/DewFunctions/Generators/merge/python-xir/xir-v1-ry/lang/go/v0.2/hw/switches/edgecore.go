package switches

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw/components"
)

// EdgeCoreAS6712 is a 32 port 40 gbps switch with a Trident 2 ASIC
func EdgeCoreAS6712() *hw.Device {

	cpu := components.AtomC2538()
	cpu.Base.Integrated = true

	mem := components.GenericDimm(hw.Gb(8), hw.MHz(1600), hw.DDR3)
	mem.Base.Integrated = true

	disk := components.GenericDisk(hw.Gb(8), hw.EUSB, hw.USB)
	disk.Base.Integrated = true

	return &hw.Device{
		Base: hw.Base{
			Manufacturer: "EdgeCore",
			Model:        "AS6712",
			SKU:          "ECAS6712",
		},
		Procs:  []hw.Proc{cpu},
		Memory: []hw.Dimm{mem},
		Disks:  []hw.Disk{disk},
		Nics: []hw.Nic{
			{
				Kind: "eth",
				Base: hw.Base{
					Manufacturer: "Intel",
					Model:        "i354",
					SKU:          "I354",
					Integrated:   true,
				},
				Ports: hw.Ports(1, &hw.Port{
					Capacity:   hw.Mbps(1000),
					FormFactor: hw.RJ45,
					Protocols:  []hw.Layer1{hw.Base1000T},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Broadcom",
					Model:        "Trident2",
					SKU:          "BCMT240G",
					Integrated:   true,
				},
				StartingIndex: 1,
				Ports: hw.Ports(32, &hw.Port{
					Capacity:   hw.Gbps(40),
					FormFactor: hw.QSFPP,
					Protocols:  []hw.Layer1{hw.GBase40SR4},
				}),
			},
		},
	}

}

// EdgeCoreAS4610 is a 48 port 1 gbps switch.
func EdgeCoreAS4610() *hw.Device {

	cpu := components.BCMCoretexA9(2)
	cpu.Base.Integrated = true

	mem := components.GenericDimm(hw.Gb(2), hw.MHz(1600), hw.DDR3)
	mem.Base.Integrated = true

	disk := components.GenericDisk(hw.Gb(8), hw.EUSB, hw.USB)
	disk.Base.Integrated = true

	return &hw.Device{
		Base: hw.Base{
			Manufacturer: "Edgecore",
			Model:        "AS4610T",
			SKU:          "ECAS4610T",
		},
		Procs:  []hw.Proc{cpu},
		Memory: []hw.Dimm{mem},
		Disks:  []hw.Disk{disk},
		Nics: []hw.Nic{
			//TODO this may not be correct, difficult to tell what exactly the card is
			//on this platform.
			{
				Kind: "eth",
				Base: hw.Base{
					Manufacturer: "Intel",
					Model:        "i354",
					SKU:          "I354",
					Integrated:   true,
				},
				Ports: hw.Ports(1, &hw.Port{
					Capacity:   hw.Mbps(1000),
					FormFactor: hw.RJ45,
					Protocols:  []hw.Layer1{hw.Base1000T},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Broadcom",
					Model:        "Helix4",
					SKU:          "BCMHX41G",
					Integrated:   true,
				},
				StartingIndex: 1,
				Ports: hw.Ports(48, &hw.Port{
					Capacity:   hw.Gbps(1),
					FormFactor: hw.RJ45,
					Protocols:  []hw.Layer1{hw.Base1000T},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Broadcom",
					Model:        "Helix4",
					SKU:          "BCMHX410G",
					Integrated:   true,
				},
				StartingIndex: 49,
				Ports: hw.Ports(4, &hw.Port{
					Capacity:   hw.Gbps(10),
					FormFactor: hw.SFPP,
					Protocols:  []hw.Layer1{hw.GBase10SR},
				}),
			},
		},
	}

}

// EdgecoreAS5812T is a 48 port 10 gbps switch.
func EdgecoreAS5812T() *hw.Device {

	return &hw.Device{
		Base: hw.Base{
			Manufacturer: "EdgeCore",
			Model:        "AS5812-T",
			SKU:          "ECAS5812T",
		},
		Procs:  []hw.Proc{components.AtomC2538()},
		Memory: []hw.Dimm{components.GenericDimm(hw.Gb(8), hw.MHz(1600), hw.DDR3)},
		Disks:  []hw.Disk{components.GenericDisk(hw.Gb(8), hw.EUSB, hw.USB)},
		Nics: []hw.Nic{
			{
				Kind: "eth",
				Base: hw.Base{
					Manufacturer: "Intel",
					Model:        "i354",
					SKU:          "I354",
				},
				Ports: hw.Ports(1, &hw.Port{
					Capacity:   hw.Mbps(1000),
					FormFactor: hw.RJ45,
					Protocols:  []hw.Layer1{hw.Base1000T},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Broadcom",
					Model:        "Trident2+",
					SKU:          "BCMT2+10GT",
				},
				StartingIndex: 1,
				Ports: hw.Ports(48, &hw.Port{
					Capacity:   hw.Gbps(10),
					FormFactor: hw.RJ45,
					Protocols:  []hw.Layer1{hw.GBase10T},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Broadcom",
					Model:        "Trident2+",
					SKU:          "BCMT2+40G",
				},
				StartingIndex: 49,
				Ports: hw.Ports(48, &hw.Port{
					Capacity:   hw.Gbps(40),
					FormFactor: hw.QSFPP,
					Protocols:  []hw.Layer1{hw.GBase40SR4},
				}),
			},
		},
	}

}

// EdgeCoreAS5710 is a 48 port 10 gbps switch
func EdgeCoreAS5812() *hw.Device {

	cpu := components.AtomC2538()
	cpu.Integrated = true

	mem := components.GenericDimm(hw.Gb(8), hw.MHz(1600), hw.DDR3)
	mem.Integrated = true

	disk := components.GenericDisk(hw.Gb(8), hw.EUSB, hw.USB)
	disk.Integrated = true

	return &hw.Device{
		Base: hw.Base{
			Manufacturer: "Edgecore",
			Model:        "AS5812",
			SKU:          "ECAS5812",
		},
		Procs:  []hw.Proc{cpu},
		Memory: []hw.Dimm{mem},
		Disks:  []hw.Disk{disk},
		Nics: []hw.Nic{
			{
				Kind: "eth",
				Base: hw.Base{
					Manufacturer: "Intel",
					Model:        "i354",
					SKU:          "I354",
					Integrated:   true,
				},
				Ports: hw.Ports(1, &hw.Port{
					Capacity:   hw.Mbps(1000),
					FormFactor: hw.RJ45,
					Protocols:  []hw.Layer1{hw.Base1000T},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Broadcom",
					Model:        "Trident2+",
					SKU:          "BCMT2+10G",
					Integrated:   true,
				},
				StartingIndex: 1,
				Ports: hw.Ports(48, &hw.Port{
					Capacity:   hw.Gbps(10),
					FormFactor: hw.SFPP,
					Protocols:  []hw.Layer1{hw.GBase10SR},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Broadcom",
					Model:        "Trident2+",
					SKU:          "BCMT2+40G",
					Integrated:   true,
				},
				StartingIndex: 49,
				Ports: hw.Ports(48, &hw.Port{
					Capacity:   hw.Gbps(40),
					FormFactor: hw.QSFPP,
					Protocols:  []hw.Layer1{hw.GBase40SR4},
				}),
			},
		},
	}

}
