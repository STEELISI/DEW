package cables

import (
	"gitlab.com/mergetb/xir/lang/go/hw"
)

// FsDACBreakout40x10 is a 40 gbps to 4x10 gbps copper breakout direct attach
// cable.
func FsDACBreakout40x10() *hw.Cable {

	return &hw.Cable{
		Base: hw.Base{
			Manufacturer: "Fiberstore",
			Model:        "FS 40x10 DAC Breakout",
		},
		Kind: hw.FiberMPOBreakout,
		Connectors: [2]hw.End{
			[]*hw.Connector{{
				Base:     hw.Base{Manufacturer: "Fiberstore", Model: "QSFP-CR4-40G"},
				Kind:     hw.QSFPP,
				Capacity: 40e9,
				Protocol: hw.GBase40CR4,
			}},
			[]*hw.Connector{
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GCR"},
					Kind:     hw.SFPP,
					Capacity: 10e9,
					Protocol: hw.GBase10CR,
				},
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GCR"},
					Kind:     hw.SFPP,
					Capacity: 10e9,
					Protocol: hw.GBase10CR,
				},
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GCR"},
					Kind:     hw.SFPP,
					Capacity: 10e9,
					Protocol: hw.GBase10CR,
				},
				{
					Base:     hw.Base{Manufacturer: "Fiberstore", Model: "SFP-10GSR-85"},
					Kind:     hw.SFPP,
					Capacity: 10e9,
					Protocol: hw.GBase10CR,
				},
			},
		},
	}

}

// Cat6 is a thing
func Cat6() *hw.Cable {
	return &hw.Cable{
		Kind: hw.Cat6,
		Connectors: [2]hw.End{
			[]*hw.Connector{{Kind: hw.RJ45, Capacity: 1e9, Protocol: hw.Base1000T}},
			[]*hw.Connector{{Kind: hw.RJ45, Capacity: 1e9, Protocol: hw.Base1000T}},
		},
	}
}
