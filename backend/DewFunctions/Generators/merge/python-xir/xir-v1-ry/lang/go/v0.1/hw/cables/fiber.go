package cables

import (
	"gitlab.com/mergetb/xir/lang/go/hw"
)

// Fsoc100G is a Fiberstore 100 gbps optical cable composed of two SR4
// transcievers and an MPO fiber trunk.
func Fsoc100G() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS-100G-Trunk-3m", //MPO trunk cable
		},
		Kind: hw.FiberMPOBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:     hw.Base{Manufacturer: "Fiberstore", Model: "QSFP28-SR4-100G"},
				Kind:     hw.SFP28,
				Capacity: 100e9,
				Protocol: hw.GBase100SR4,
			}},
			[]*hw.Connector{
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "QSFP28-SR4-100G"},
					Kind:     hw.SFP28,
					Capacity: 100e9,
					Protocol: hw.GBase100SR4,
				},
			},
		},
	}

}

// Fsoc10G is a Fiberstore 10 gbps optical cable composed of two SR
// transcievers and an LC fiber.
func Fsoc10G() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS-10G-Trunk-10m", //MPO trunk cable
		},
		Kind: hw.FiberMPOBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP+-SR-10G"},
				Kind:     hw.SFPP,
				Capacity: 10e9,
				Protocol: hw.GBase10SR,
			}},
			[]*hw.Connector{
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP+-SR-10G"},
					Kind:     hw.SFPP,
					Capacity: 10e9,
					Protocol: hw.GBase10SR,
				},
			},
		},
	}

}

// Fsoc25G is a Fiberstore 25 gbps optical cable composed of two SR
// transceivers and an LC fiber.
func Fsoc25G() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS-25G-Trunk-5m", //MPO trunk cable
		},
		Kind: hw.FiberMPOBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-25GSR-85"},
				Kind:     hw.SFP28,
				Capacity: 25e9,
				Protocol: hw.GBase25SR,
			}},
			[]*hw.Connector{
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-25GSR-85"},
					Kind:     hw.SFP28,
					Capacity: 25e9,
					Protocol: hw.GBase25SR,
				},
			},
		},
	}
}

// FsMpoBreakout40x10 is a Fiberstore optical breakout cable composed of one 40
// gbps transceiver (MPO) and 4x10 gbps transceivers (LC) interconnected by an
// optical breakout cable.
func FsMpoBreakout40x10() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS-40x10-MPO-Breakout",
		},
		Kind: hw.FiberMPOBreakout,
		Connectors: [2]hw.End{
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

// FsMpoBreakout100x25 is a Fiberstore optical breakout cable composed of one
// 100 gbps transceiver (MPO) and 4x25 gbps transceivers (LC) interconnected by
// an optical breakout cable.
func FsMpoBreakout100x25() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS 100Gx25G Optical Breakout",
		},
		Kind: hw.FiberMPOBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:     hw.Base{Manufacturer: "Fiberstore", Model: "QSFP28-SR4-100G"},
				Kind:     hw.QSFP28,
				Capacity: 100e9,
				Protocol: hw.GBase100SR4,
			}},
			[]*hw.Connector{
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-25GSR-85"},
					Kind:     hw.SFP28,
					Capacity: 25e9,
					Protocol: hw.GBase25SR,
				},
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-25GSR-85"},
					Kind:     hw.SFP28,
					Capacity: 25e9,
					Protocol: hw.GBase25SR,
				},
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-25GSR-85"},
					Kind:     hw.SFP28,
					Capacity: 25e9,
					Protocol: hw.GBase25SR,
				},
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP28-25GSR-85"},
					Kind:     hw.SFP28,
					Capacity: 25e9,
					Protocol: hw.GBase25SR,
				},
			},
		},
	}

}
