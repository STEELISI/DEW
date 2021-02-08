package switches

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw/components"
)

// QuantaT1048LY4R is a 48 port 1 gbps RJ45 switch
func QuantaT1048LY4R() *hw.Device {

	cpu := components.AtomC2338()
	cpu.Base.Integrated = true

	mem := components.GenericDimm(hw.Gb(4), hw.MHz(1600), hw.DDR3)
	mem.Base.Integrated = true

	disk := components.GenericDisk(hw.Gb(8), hw.EUSB, hw.USB)
	disk.Base.Integrated = true

	return &hw.Device{
		Base: hw.Base{
			Model:        "QuantaMesh BMS T1048-LY4R",
			Manufacturer: "QCT",
			SKU:          "BMS-T1048-LY4R",
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
					Model:        "Hurricane 2",
					SKU:          "BCMH21G",
					Integrated:   true,
				},
				Ports: hw.Ports(48, &hw.Port{
					Capacity:   hw.Gbps(1),
					FormFactor: hw.RJ45,
					Protocols:  []hw.Layer1{hw.Base100T},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Broadcom",
					Model:        "Hurricane 2",
					SKU:          "BCMH210G",
					Integrated:   true,
				},
				Ports: hw.Ports(4, &hw.Port{
					Capacity:   hw.Gbps(10),
					FormFactor: hw.SFPP,
					Protocols:  []hw.Layer1{hw.GBase10SR},
				}),
			},
		},
		PSUs: []hw.PSU{
			components.Quanta66WPSU(),
			components.Quanta66WPSU(),
		},
	}

}

// QuantaT1048LY4R is a 48 port 10 gbps sfp+ switch
func QuantaT3048LY8() *hw.Device {

	cpu := components.AtomC2758()
	cpu.Base.Integrated = true

	mem := components.GenericDimm(hw.Gb(4), hw.MHz(1600), hw.DDR3)
	mem.Base.Integrated = true

	disk := components.GenericDisk(hw.Gb(8), hw.EUSB, hw.USB)
	disk.Base.Integrated = true

	return &hw.Device{
		Base: hw.Base{
			Model:        "QuantaMesh BMS T3048-LY8",
			Manufacturer: "QCT",
			SKU:          "BMS-T3048-LY8",
		},
		Procs: []hw.Proc{cpu},
		//TODO memory info may not be correct, check when we get one
		Memory: []hw.Dimm{mem},
		//TODO disk info may not be correct, check when we get one
		Disks: []hw.Disk{disk},
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
					SKU:          "BCMT210G",
					Integrated:   true,
				},
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
					Model:        "Trident2",
					SKU:          "BCMT240G",
					Integrated:   true,
				},
				Ports: hw.Ports(6, &hw.Port{
					Capacity:   hw.Gbps(40),
					FormFactor: hw.SFPP,
					Protocols:  []hw.Layer1{hw.GBase40SR4},
				}),
			},
		},
		PSUs: []hw.PSU{
			components.Quanta215WPSU(),
			components.Quanta215WPSU(),
		},
	}

}
