package switches

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw/components"
)

// Msn2410 is a 48 port 25 gbps sfp28 switch with 8 100 gbps qsfp28 uplinks.
func Msn2410() *hw.Device {

	cpu := components.AtomC2558()
	cpu.Integrated = true

	mem := components.GenericDimm(hw.Gb(8), hw.MHz(1600), hw.DDR3)
	mem.Integrated = true

	disk := components.GenericDisk(hw.Gb(15), hw.M2_2260, hw.SATA3)
	disk.Integrated = true

	d := &hw.Device{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "SN2410",
			SKU:          "MSN2410",
		},
		Procs:  []hw.Proc{cpu},
		Memory: []hw.Dimm{mem},
		Disks:  []hw.Disk{disk},
		Nics: []hw.Nic{
			{
				Kind: "eth",
				Base: hw.Base{
					Manufacturer: "Intel",
					Model:        "i350",
					SKU:          "i354",
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
					Manufacturer: "Mellanox",
					Model:        "Spectrum",
					SKU:          "MSN_25",
					Integrated:   true,
				},
				StartingIndex: 1,
				Ports: hw.Ports(48, &hw.Port{
					Capacity:   hw.Gbps(25),
					FormFactor: hw.SFP28,
					Protocols:  []hw.Layer1{hw.GBase25SR},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Mellanox",
					Model:        "Spectrum",
					SKU:          "MSN_100",
					Integrated:   true,
				},
				StartingIndex: 49,
				Ports: hw.Ports(8, &hw.Port{
					Capacity:   hw.Gbps(100),
					FormFactor: hw.QSFP28,
					Protocols:  []hw.Layer1{hw.GBase100SR4},
				}),
			},
		},
	}

	return d

}

func Msn2010() *hw.Device {

	cpu := components.AtomC2558()
	cpu.Integrated = true

	mem := components.GenericDimm(hw.Gb(8), hw.MHz(1600), hw.DDR3)
	mem.Integrated = true

	disk := components.GenericDisk(hw.Gb(15), hw.M2_2260, hw.SATA3)
	disk.Integrated = true

	d := &hw.Device{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "SN2010",
			SKU:          "MSN2010",
		},
		Procs:  []hw.Proc{cpu},
		Memory: []hw.Dimm{mem},
		Disks:  []hw.Disk{disk},
		Nics: []hw.Nic{
			{
				Kind: "eth",
				Base: hw.Base{
					Manufacturer: "Intel",
					Model:        "i350",
					SKU:          "i354",
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
					Manufacturer: "Mellanox",
					Model:        "Spectrum",
					SKU:          "MSN_25",
					Integrated:   true,
				},
				StartingIndex: 1,
				Ports: hw.Ports(18, &hw.Port{
					Capacity:   hw.Gbps(25),
					FormFactor: hw.SFP28,
					Protocols:  []hw.Layer1{hw.GBase25SR},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Mellanox",
					Model:        "Spectrum",
					SKU:          "MSN_100",
					Integrated:   true,
				},
				StartingIndex: 19,
				Ports: hw.Ports(4, &hw.Port{
					Capacity:   hw.Gbps(100),
					FormFactor: hw.QSFP28,
					Protocols:  []hw.Layer1{hw.GBase100SR4},
				}),
			},
		},
	}

	return d

}

// Msn3510 is a 48 port 50 gbps sfp56 switch with 6 400 gbps qsfp56 uplinks.
func Msn3510() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "SN3510",
			SKU:          "MSN2510",
		},
		Procs: []hw.Proc{components.XeonD1527()},
		//TODO memory info may not be correct, check when we have one of these
		Memory: []hw.Dimm{components.GenericDimm(hw.Gb(8), hw.MHz(1600), hw.DDR3)},
		//TODO disk info may not be correct, check when we have one of these
		Disks: []hw.Disk{components.GenericDisk(hw.Gb(32), hw.M2_2260, hw.SATA3)},
		Nics: []hw.Nic{
			{
				Kind: "eth",
				Base: hw.Base{
					Manufacturer: "Intel",
					Model:        "i350",
					SKU:          "i354",
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
					Manufacturer: "Mellanox",
					Model:        "Spectrum2",
					SKU:          "MSN2_50",
				},
				StartingIndex: 1,
				Ports: hw.Ports(48, &hw.Port{
					Capacity:   hw.Gbps(50),
					FormFactor: hw.SFP56,
					Protocols:  []hw.Layer1{hw.GBase50SR},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Mellanox",
					Model:        "Spectrum2",
					SKU:          "MSN2_400",
				},
				StartingIndex: 49,
				Ports: hw.Ports(8, &hw.Port{
					Capacity:   hw.Gbps(400),
					FormFactor: hw.QSFPDD,
					Protocols: []hw.Layer1{
						hw.GBase400DR4,
						hw.GBase200SR4,
					},
				}),
			},
		},
		PSUs: []hw.PSU{
			components.Mellanox765WPSU(),
			components.Mellanox765WPSU(),
		},
	}

	return d

}

// Msn2700 is a 32 port 100 gbps qsfp28 switch. Based on the Spectrum ASIC.
func Msn2700() *hw.Device {

	cpu := components.AtomC2558()
	cpu.Base.Integrated = true

	mem := components.GenericDimm(hw.Gb(8), hw.MHz(1600), hw.DDR3)
	mem.Base.Integrated = true

	disk := components.GenericDisk(hw.Gb(16), hw.M2_2260, hw.SATA3)
	disk.Base.Integrated = true

	return &hw.Device{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "SN2700",
			SKU:          "MSN2700",
		},
		Procs:  []hw.Proc{cpu},
		Memory: []hw.Dimm{mem},
		Disks:  []hw.Disk{disk},
		Nics: []hw.Nic{
			{
				Kind: "eth",
				Base: hw.Base{
					Manufacturer: "Intel",
					Model:        "i350",
					SKU:          "i354",
					Integrated:   true,
				},
				Ports: hw.Ports(2, &hw.Port{
					Capacity:   hw.Mbps(1000),
					FormFactor: hw.RJ45,
					Protocols:  []hw.Layer1{hw.Base1000T},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Mellanox",
					Model:        "Spectrum",
					SKU:          "MSN_100",
					Integrated:   true,
				},
				StartingIndex: 1,
				Ports: hw.Ports(32, &hw.Port{
					Capacity:   hw.Gbps(100),
					FormFactor: hw.QSFP28,
					Protocols:  []hw.Layer1{hw.GBase100SR4},
				}),
			},
		},
	}

}

// Msn3700 is a 32 port 200 gbps qsfp56 switch. Based on the Spectrum ASIC.
func Msn3700() *hw.Device {

	cpu := components.XeonD1527()
	cpu.Base.Integrated = true

	//TODO memory info may not be correct, check when we have one of these
	mem := components.GenericDimm(hw.Gb(8), hw.MHz(1600), hw.DDR3)
	mem.Base.Integrated = true

	//TODO disk info may not be correct, check when we have one of these
	disk := components.GenericDisk(hw.Gb(32), hw.M2_2260, hw.SATA3)
	disk.Base.Integrated = true

	d := &hw.Device{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "SN3700",
			SKU:          "MSN3700",
		},
		Procs:  []hw.Proc{cpu},
		Memory: []hw.Dimm{mem},
		Disks:  []hw.Disk{disk},
		Nics: []hw.Nic{
			{
				Kind: "eth",
				Base: hw.Base{
					Manufacturer: "Intel",
					Model:        "i350",
					SKU:          "i354",
					Integrated:   true,
				},
				Ports: hw.Ports(2, &hw.Port{
					Capacity:   hw.Mbps(1000),
					FormFactor: hw.RJ45,
					Protocols:  []hw.Layer1{hw.Base1000T},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Mellanox",
					Model:        "Spectrum2",
					SKU:          "MSN2_200",
					Integrated:   true,
				},
				StartingIndex: 1,
				Ports: hw.Ports(32, &hw.Port{
					Capacity:   hw.Gbps(200),
					FormFactor: hw.QSFP56,
					Protocols:  []hw.Layer1{hw.GBase200SR4},
				}),
			},
		},
		PSUs: []hw.PSU{
			components.Mellanox765WPSU(),
			components.Mellanox765WPSU(),
		},
	}

	return d

}

// Msn3700C is a 32 port 100 gbps qsfp28 switch. Based on the Spectrum ASIC.
func Msn3700C() *hw.Device {

	cpu := components.PentiumD1508()
	cpu.Base.Integrated = true

	mem := components.GenericDimm(hw.Gb(8), hw.MHz(1600), hw.DDR3)
	mem.Base.Integrated = true

	disk := components.GenericDisk(hw.Gb(32), hw.M2_2260, hw.SATA3)
	disk.Base.Integrated = true

	d := &hw.Device{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "SN3700C",
			SKU:          "MSN3700C",
		},
		Procs: []hw.Proc{cpu},
		//TODO memory info may not be correct, check when we have one of these
		Memory: []hw.Dimm{mem},
		//TODO disk info may not be correct, check when we have one of these
		Disks: []hw.Disk{disk},
		Nics: []hw.Nic{
			{
				Kind: "eth",
				Base: hw.Base{
					Manufacturer: "Intel",
					Model:        "i350",
					SKU:          "i354",
					Integrated:   true,
				},
				Ports: hw.Ports(2, &hw.Port{
					Capacity:   hw.Mbps(1000),
					FormFactor: hw.RJ45,
					Protocols:  []hw.Layer1{hw.Base1000T},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Mellanox",
					Model:        "Spectrum2",
					SKU:          "MSN2_100",
					Integrated:   true,
				},
				StartingIndex: 1,
				Ports: hw.Ports(32, &hw.Port{
					Capacity:   hw.Gbps(100),
					FormFactor: hw.QSFP28,
					Protocols:  []hw.Layer1{hw.GBase100SR4},
				}),
			},
		},
		PSUs: []hw.PSU{
			components.Mellanox765WPSU(),
			components.Mellanox765WPSU(),
		},
	}

	return d

}

// Msn3800 is a 64 port 100 gbps qsfp28 switch. Based on the Spectrum 2 ASIC.
func Msn3800() *hw.Device {

	cpu := components.XeonD1527()
	cpu.Base.Integrated = true

	mem := components.GenericDimm(hw.Gb(8), hw.MHz(1600), hw.DDR3)
	mem.Base.Integrated = true

	disk := components.GenericDisk(hw.Gb(32), hw.M2_2260, hw.SATA3)
	disk.Base.Integrated = true

	return &hw.Device{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "SN3800",
			SKU:          "MSN3800",
		},
		Procs: []hw.Proc{cpu},
		//TODO memory info may not be correct, check when we have one of these
		Memory: []hw.Dimm{mem},
		//TODO disk info may not be correct, check when we have one of these
		Disks: []hw.Disk{disk},
		Nics: []hw.Nic{
			{
				Kind: "eth",
				Base: hw.Base{
					Manufacturer: "Intel",
					Model:        "i350",
					SKU:          "i354",
					Integrated:   true,
				},
				Ports: hw.Ports(2, &hw.Port{
					Capacity:   hw.Mbps(1000),
					FormFactor: hw.RJ45,
					Protocols:  []hw.Layer1{hw.Base1000T},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Mellanox",
					Model:        "Spectrum2",
					SKU:          "MSN2_100",
					Integrated:   true,
				},
				StartingIndex: 1,
				Ports: hw.Ports(64, &hw.Port{
					Capacity:   hw.Gbps(100),
					FormFactor: hw.QSFP28,
					Protocols:  []hw.Layer1{hw.GBase100SR4},
				}),
			},
		},
		PSUs: []hw.PSU{
			components.Mellanox765WPSU(),
			components.Mellanox765WPSU(),
		},
	}

}

// Msn2100 is a 16 port 100 gbps qsfp28 switch. Based on the Spectrum ASIC.
func Msn2100() *hw.Device {

	cpu := components.AtomC2558()
	cpu.Base.Integrated = true

	mem := components.GenericDimm(hw.Gb(8), hw.MHz(1600), hw.DDR3)
	mem.Base.Integrated = true

	disk := components.GenericDisk(hw.Gb(16), hw.M2_2260, hw.SATA3)
	disk.Base.Integrated = true

	return &hw.Device{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "SN2100",
			SKU:          "MSN2100",
		},
		Procs:  []hw.Proc{cpu},
		Memory: []hw.Dimm{mem},
		Disks:  []hw.Disk{disk},
		Nics: []hw.Nic{
			{
				Kind: "eth",
				Base: hw.Base{
					Manufacturer: "Intel",
					Model:        "i350",
					SKU:          "i354",
					Integrated:   true,
				},
				Ports: hw.Ports(2, &hw.Port{
					Capacity:   hw.Mbps(1000),
					FormFactor: hw.RJ45,
					Protocols:  []hw.Layer1{hw.Base1000T},
				}),
			},
			{
				Kind: "swp",
				Base: hw.Base{
					Manufacturer: "Mellanox",
					Model:        "Spectrum",
					SKU:          "MSN_100",
					Integrated:   true,
				},
				StartingIndex: 1,
				Ports: hw.Ports(16, &hw.Port{
					Capacity:   hw.Gbps(100),
					FormFactor: hw.QSFP28,
					Protocols:  []hw.Layer1{hw.GBase100SR4},
				}),
			},
		},
		PSUs: []hw.PSU{
			components.Mellanox765WPSU(),
			components.Mellanox765WPSU(),
		},
	}

}
