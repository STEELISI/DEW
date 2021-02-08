package cables

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2"
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

// FsDACBreakout40x10 is a 40 gbps to 4x10 gbps copper breakout direct attach
// cable.
func FsDACBreakout40x10() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS 40x10 DAC",
			SKU:          "FS40x10DAC",
		},
		Kind: hw.DACBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Fiberstore", Model: "QSFP-CR4-40G"},
				Kind:      hw.QSFPP,
				Capacity:  xir.Gbps(40),
				Protocols: []hw.Layer1{hw.GBase40CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GCR"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GCR"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GCR"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GSR-85"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

// FsDACBreakout100x25 is a 100 gbps to 4x25 gbps copper breakout direct attach
// cable.
func FsDACBreakout100x25() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS 100x25 DAC Breakout",
			SKU:          "FS100x25DACBreakout",
		},
		Kind: hw.DACBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Fiberstore", Model: "Q-4S28PC02"},
				Kind:      hw.QSFP28,
				Capacity:  xir.Gbps(100),
				Protocols: []hw.Layer1{hw.GBase100CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "Q-4S28PC02"},
					Kind:      hw.SFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase25CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "Q-4S28PC02"},
					Kind:      hw.SFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase25CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "Q-4S28PC02"},
					Kind:      hw.SFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase25CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "Q-4S28PC02"},
					Kind:      hw.SFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase25CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

// Cat6 is a thing
func Cat6() *hw.Cable {
	return &hw.Cable{
		Kind: hw.Cat6,
		Base: hw.Base{
			Manufacturer: "Generic",
			Model:        "Generic Cable",
			SKU:          "GENERIC_CAT6",
		},
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Kind:      hw.RJ45,
				Capacity:  xir.Gbps(1),
				Protocols: []hw.Layer1{hw.Base1000T},
			}},
			[]*hw.Connector{{
				Kind:      hw.RJ45,
				Capacity:  xir.Gbps(1),
				Protocols: []hw.Layer1{hw.Base1000T},
			}},
		},
		Props: map[string]interface{}{},
	}
}

// Mlx200GDAC is a Mellanox 200 gbps copper cable composed of two CR4
// transcievers and a 2 meter coaxial trunk
func Mlx200GDAC() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "Mellanox 200G DAC",
			SKU:          "MLX200GDAC",
		},
		Kind: hw.DAC,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP1650-V002E26"},
				Kind:      hw.QSFP56,
				Capacity:  xir.Gbps(200),
				Protocols: []hw.Layer1{hw.GBase200CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP1650-V002E26"},
					Kind:      hw.QSFP56,
					Capacity:  xir.Gbps(200),
					Protocols: []hw.Layer1{hw.GBase200CR4},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Mlx100GDAC3M() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "Mellanox 100G DAC 3m",
			SKU:          "MCP1600-E003E26",
		},
		Kind: hw.DAC,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP1600-E003E26"},
				Kind:      hw.QSFP28,
				Capacity:  xir.Gbps(100),
				Protocols: []hw.Layer1{hw.GBase100CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP1600-E003E26"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(100),
					Protocols: []hw.Layer1{hw.GBase100CR4},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Mlx25GDAC3M() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "LinkX 3m",
			SKU:          "MCP2M00-A003E26N",
		},
		Kind: hw.DAC,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP2M00-A003E26N"},
				Kind:      hw.SFP28,
				Capacity:  xir.Gbps(25),
				Protocols: []hw.Layer1{hw.GBase25CR},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP2M00-A003E26N"},
					Kind:      hw.SFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase25CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Mlx100GDAC2M() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "Mellanox 100G DAC 2m",
			SKU:          "MCP1600-C002E30N",
		},
		Kind: hw.DAC,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP1600-C002E30N"},
				Kind:      hw.QSFP28,
				Capacity:  xir.Gbps(100),
				Protocols: []hw.Layer1{hw.GBase100CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP1600-C002E30N"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(100),
					Protocols: []hw.Layer1{hw.GBase100CR4},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Mlx100GDAC1M() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "Mellanox 100G DAC 1m",
			SKU:          "MCP2M00-A001E3ON",
		},
		Kind: hw.DAC,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP2M00-A001E3ON"},
				Kind:      hw.QSFP28,
				Capacity:  xir.Gbps(100),
				Protocols: []hw.Layer1{hw.GBase100CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP2M00-A001E3ON"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(100),
					Protocols: []hw.Layer1{hw.GBase100CR4},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Mlx10GDAC7M() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "Mellanox 10G DAC 7m",
			SKU:          "MC3309124-007",
		},
		Kind: hw.DAC,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MC3309124-007"},
				Kind:      hw.SFPP,
				Capacity:  xir.Gbps(10),
				Protocols: []hw.Layer1{hw.GBase10CR},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MC3309124-007"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

// Fs100GDAC is a FiberStore 100 gbps copper cable composed of two CR4
// transcievers and a 2 meter coaxial trunk
func Fs100GDAC() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "FiberStore",
			Model:        "FS 100G SR4 DAC",
			SKU:          "FS100GSR4DAC",
		},
		Kind: hw.DAC,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "Q28-PC02"},
				Kind:      hw.QSFP28,
				Capacity:  xir.Gbps(100),
				Protocols: []hw.Layer1{hw.GBase100CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "Q28-PC02"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(100),
					Protocols: []hw.Layer1{hw.GBase100CR4},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Fs100GAOC() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "FiberStore",
			Model:        "FS 100G AOC 20m",
			SKU:          "q28-AO20",
		},
		Kind: hw.DAC,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Fiberstore", Model: "Q28-PC02"},
				Kind:      hw.QSFP28,
				Capacity:  xir.Gbps(100),
				Protocols: []hw.Layer1{hw.GBase100SR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Fibrestore", Model: "Q28-PC02"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(100),
					Protocols: []hw.Layer1{hw.GBase100SR4},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Fs10GAOC() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "FiberStore",
			Model:        "FS 10G AOC 20m",
			SKU:          "SFPP-AO20",
		},
		Kind: hw.DAC,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFPP-PC02"},
				Kind:      hw.SFPP,
				Capacity:  xir.Gbps(10),
				Protocols: []hw.Layer1{hw.GBase10SR},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Fibrestore", Model: "SFPP-PC02"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10SR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

// Fs100GDAC is a FiberStore 25 gbps copper cable composed of two CR
// transcievers and a 2 meter coaxial trunk
func Fs25GDAC() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "FiberStore",
			Model:        "FS 25G SR DAC",
			SKU:          "FS25GSRDAC",
		},
		Kind: hw.DAC,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "FiberStore", Model: "S28-PC02"},
				Kind:      hw.SFP28,
				Capacity:  xir.Gbps(25),
				Protocols: []hw.Layer1{hw.GBase25CR},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "FiberStore", Model: "S28-PC02"},
					Kind:      hw.SFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase25CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Fs10GDAC() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "FiberStore",
			Model:        "FS 10G SR DAC",
			SKU:          "FS10GSRDAC",
		},
		Kind: hw.DAC,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "FiberStore", Model: "Q28-PC02"},
				Kind:      hw.SFPP,
				Capacity:  xir.Gbps(10),
				Protocols: []hw.Layer1{hw.GBase10CR},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "FiberStore", Model: "Q28-PC02"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

// Mlx200x50BreakoutOptical Its a cable, it's a breakout, it transmits bits.
func Mlx200x50BreakoutDAC() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "QSFP56 to 4xSFP56",
			SKU:          "MLXQSFP564xSFP56",
		},
		Kind: hw.DACBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H70-V02AR26"},
				Kind:      hw.QSFP56,
				Capacity:  xir.Gbps(200),
				Protocols: []hw.Layer1{hw.GBase200CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H70-V02AR26"},
					Kind:      hw.SFP56,
					Capacity:  xir.Gbps(50),
					Protocols: []hw.Layer1{hw.GBase50CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H70-V02AR26"},
					Kind:      hw.SFP56,
					Capacity:  xir.Gbps(50),
					Protocols: []hw.Layer1{hw.GBase50CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H70-V02AR26"},
					Kind:      hw.SFP56,
					Capacity:  xir.Gbps(50),
					Protocols: []hw.Layer1{hw.GBase50CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H70-V02AR26"},
					Kind:      hw.SFP28,
					Capacity:  xir.Gbps(50),
					Protocols: []hw.Layer1{hw.GBase50CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Mlx100x50BreakoutDAC2_5M() *hw.Cable {

	// https://www.colfaxdirect.com/store/pc/viewPrd.asp?idproduct=3035&idcategory=2

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "LinkX 2.5m",
			SKU:          "MCP7H00-G02A",
		},
		Kind: hw.DACBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H00-G02A"},
				Kind:      hw.QSFP28,
				Capacity:  xir.Gbps(100),
				Protocols: []hw.Layer1{hw.GBase100CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H00-G02A"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(50),
					Protocols: []hw.Layer1{hw.GBase50CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H00-G02A"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(50),
					Protocols: []hw.Layer1{hw.GBase50CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Mlx100x50BreakoutDAC1_5M() *hw.Cable {

	// https://www.colfaxdirect.com/store/pc/viewPrd.asp?idproduct=3035&idcategory=2

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "LinkX 1.5m",
			SKU:          "MCP7H00-G01AR",
		},
		Kind: hw.DACBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H00-G01AR"},
				Kind:      hw.QSFP28,
				Capacity:  xir.Gbps(100),
				Protocols: []hw.Layer1{hw.GBase100CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H00-G01AR"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(50),
					Protocols: []hw.Layer1{hw.GBase50CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H00-G01AR"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(50),
					Protocols: []hw.Layer1{hw.GBase50CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Mlx100x25BreakoutDAC2M() *hw.Cable {

	// https://www.colfaxdirect.com/store/pc/viewPrd.asp?idproduct=3553&idcategory=2

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "LinkX 2m",
			SKU:          "MCP7F00-A002R30N",
		},
		Kind: hw.DACBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7F00-A002R30N"},
				Kind:      hw.QSFP28,
				Capacity:  xir.Gbps(100),
				Protocols: []hw.Layer1{hw.GBase100CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7F00-A002R30N"},
					Kind:      hw.SFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase25CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H00-G02A"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase50CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7F00-A002R30N"},
					Kind:      hw.SFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase25CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H00-G02A"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase50CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Mlx100x25BreakoutDAC2_5M() *hw.Cable {

	// https://www.colfaxdirect.com/store/pc/viewPrd.asp?idproduct=3553&idcategory=2

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "LinkX 2.5m",
			SKU:          "MCP7F00-A02AR30L",
		},
		Kind: hw.DACBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7F00-A02AR30L"},
				Kind:      hw.QSFP28,
				Capacity:  xir.Gbps(100),
				Protocols: []hw.Layer1{hw.GBase100CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7F00-A02AR30L"},
					Kind:      hw.SFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase25CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H00-G02A"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase50CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7F00-A02AR30L"},
					Kind:      hw.SFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase25CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MCP7H00-G02A"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(25),
					Protocols: []hw.Layer1{hw.GBase50CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Mlx40x10BreakoutDAC5M() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "LinkX 2.5m",
			SKU:          "MC2609125-005",
		},
		Kind: hw.DACBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MC2609125-005"},
				Kind:      hw.QSFP28,
				Capacity:  xir.Gbps(40),
				Protocols: []hw.Layer1{hw.GBase40CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MC2609125-005"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MC2609125-005"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MC2609125-005"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MC2609125-005"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

// Mlx50GDAC is a Mellanox 50 gbps copper cable composed of two CR4
// transcievers and a 2 meter coaxial trunk
func Mlx50GDAC() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "Mellanox 50G CR4 DAC", //MPO trunk cable
			SKU:          "MLX50GCR4DAC",         //MPO trunk cable
		},
		Kind: hw.DAC,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "?"},
				Kind:      hw.QSFP28,
				Capacity:  xir.Gbps(50),
				Protocols: []hw.Layer1{hw.GBase50CR},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "?"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(50),
					Protocols: []hw.Layer1{hw.GBase50CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func TenGtek40x10BreakoutDAC_3M() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "10Gtek",
			Model:        "40x10G DAC Brekout",
			SKU:          "10GT40X10DAC",
		},
		Kind: hw.DACBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "10Gtek", Model: "40GDACTXR"},
				Kind:      hw.QSFPP,
				Capacity:  xir.Gbps(40),
				Protocols: []hw.Layer1{hw.GBase40CR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "10Gtek", Model: "10GDACTXR"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
				{
					Base:      hw.Base{Manufacturer: "10Gtek", Model: "10GDACTXR"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
				{
					Base:      hw.Base{Manufacturer: "10Gtek", Model: "10GDACTXR"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
				{
					Base:      hw.Base{Manufacturer: "10Gtek", Model: "10GDACTXR"},
					Kind:      hw.SFPP,
					Capacity:  xir.Gbps(10),
					Protocols: []hw.Layer1{hw.GBase10CR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}
