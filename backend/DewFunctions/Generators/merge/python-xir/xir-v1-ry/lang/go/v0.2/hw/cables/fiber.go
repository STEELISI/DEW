package cables

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2"
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

// Fsoc100G is a Fiberstore 100 gbps optical cable composed of two SR4
// transcievers and an MPO fiber trunk.
func Fsoc100G() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS-100G-Trunk",
			SKU:          "FS100GTrunk",
		},
		Kind: hw.FiberMPOTrunk,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Fiberstore", Model: "QSFP28-SR4-100G"},
				Kind:      hw.SFP28,
				Capacity:  100e9,
				Protocols: []hw.Layer1{hw.GBase100SR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "QSFP28-SR4-100G"},
					Kind:      hw.SFP28,
					Capacity:  100e9,
					Protocols: []hw.Layer1{hw.GBase100SR4},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

// Fsoc10G is a Fiberstore 10 gbps optical cable composed of two SR
// transcievers and an LC fiber.
func Fsoc10G() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS-10G-Trunk",
			SKU:          "FS10GTrunk",
		},
		Kind: hw.FiberMPOTrunk,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP+-SR-10G"},
				Kind:      hw.SFPP,
				Capacity:  10e9,
				Protocols: []hw.Layer1{hw.GBase10SR},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP+-SR-10G"},
					Kind:      hw.SFPP,
					Capacity:  10e9,
					Protocols: []hw.Layer1{hw.GBase10SR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

// Fsoc25G is a Fiberstore 25 gbps optical cable composed of two SR
// transceivers and an LC fiber.
func Fsoc25G() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS-25G-Trunk",
			SKU:          "FS-25G-Trunk",
		},
		Kind: hw.FiberMPOTrunk,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-25GSR-85"},
				Kind:      hw.SFP28,
				Capacity:  25e9,
				Protocols: []hw.Layer1{hw.GBase25SR},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-25GSR-85"},
					Kind:      hw.SFP28,
					Capacity:  25e9,
					Protocols: []hw.Layer1{hw.GBase25SR},
				},
			},
		},
		Props: map[string]interface{}{},
	}
}

// Fsoc40G is a Fiberstore 40 gbps optical cable composed of two SR
// transceivers and an LC fiber.
func Fsoc40G() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS 40G Trunk 10m",
			SKU:          "FS40GTrunk10m",
		},
		Kind: hw.FiberMPOTrunk,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-40GSR-85"},
				Kind:      hw.QSFPP,
				Capacity:  xir.Gbps(40),
				Protocols: []hw.Layer1{hw.GBase40SR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-40GSR-85"},
					Kind:      hw.QSFPP,
					Capacity:  xir.Gbps(40),
					Protocols: []hw.Layer1{hw.GBase40SR4},
				},
			},
		},
		Props: map[string]interface{}{},
	}
}

// FsMpoBreakout40x10 is a Fiberstore optical breakout cable composed of one 40
// gbps transceiver (MPO) and 4x10 gbps transceivers (LC) interconnected by an
// optical breakout cable.
func FsMpoBreakout40x10() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS 40x10",
			SKU:          "8FMTPLCOM4",
		},
		Kind: hw.FiberMPOBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Fiberstore", Model: "QSFP-SR4-40G"},
				Kind:      hw.QSFPP,
				Capacity:  40e9,
				Protocols: []hw.Layer1{hw.GBase40SR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GSR-85"},
					Kind:      hw.SFPP,
					Capacity:  10e9,
					Protocols: []hw.Layer1{hw.GBase10SR},
				},
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GSR-85"},
					Kind:      hw.SFPP,
					Capacity:  10e9,
					Protocols: []hw.Layer1{hw.GBase10SR},
				},
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GSR-85"},
					Kind:      hw.SFPP,
					Capacity:  10e9,
					Protocols: []hw.Layer1{hw.GBase10SR},
				},
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GSR-85"},
					Kind:      hw.SFPP,
					Capacity:  10e9,
					Protocols: []hw.Layer1{hw.GBase10SR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

// FsMpoBreakout100x25 is a Fiberstore optical breakout cable composed of one
// 100 gbps transceiver (MPO) and 4x25 gbps transceivers (LC) interconnected by
// an optical breakout cable.
func FsMpoBreakout100x25() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS 100Gx25G Optical Breakout",
			SKU:          "FS100Gx25GOpticalBreakout",
		},
		Kind: hw.FiberMPOBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Fiberstore", Model: "QSFP28-SR4-100G"},
				Kind:      hw.QSFP28,
				Capacity:  100e9,
				Protocols: []hw.Layer1{hw.GBase100SR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-25GSR-85"},
					Kind:      hw.SFP28,
					Capacity:  25e9,
					Protocols: []hw.Layer1{hw.GBase25SR},
				},
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-25GSR-85"},
					Kind:      hw.SFP28,
					Capacity:  25e9,
					Protocols: []hw.Layer1{hw.GBase25SR},
				},
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-25GSR-85"},
					Kind:      hw.SFP28,
					Capacity:  25e9,
					Protocols: []hw.Layer1{hw.GBase25SR},
				},
				{
					Base:      hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-25GSR-85"},
					Kind:      hw.SFP28,
					Capacity:  25e9,
					Protocols: []hw.Layer1{hw.GBase25SR},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

// Mlx200GFiber is a Mellanox 200 gbps optical cable composed of two SR4
// transcievers and an MPO fiber trunk.
func Mlx200GOptical() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "Mellanox 200G SR4 Optical Trunk",
			SKU:          "Mellanox200GSR4OpticalTrunk",
		},
		Kind: hw.FiberMPOBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MMA1T00-VS"},
				Kind:      hw.QSFP56,
				Capacity:  200e9,
				Protocols: []hw.Layer1{hw.GBase200SR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MMA1T00-VS"},
					Kind:      hw.QSFP56,
					Capacity:  xir.Gbps(200),
					Protocols: []hw.Layer1{hw.GBase200SR4},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}

func Mlx100GAOC10M() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "LinkX VCSEL 10m",
			SKU:          "MFA1A00-C010",
		},
		Kind: hw.AOC,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:      hw.Base{Manufacturer: "Mellanox", Model: "MFA1A00-C010"},
				Kind:      hw.QSFP28,
				Capacity:  100e9,
				Protocols: []hw.Layer1{hw.GBase100SR4},
			}},
			[]*hw.Connector{
				{
					Base:      hw.Base{Manufacturer: "Mellanox", Model: "MFA1A00-C010"},
					Kind:      hw.QSFP28,
					Capacity:  xir.Gbps(100),
					Protocols: []hw.Layer1{hw.GBase100SR4},
				},
			},
		},
		Props: map[string]interface{}{},
	}

}
