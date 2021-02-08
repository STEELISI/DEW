package devices

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

func Zpe(ports int) *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "Zpe NodeGrid",
			Manufacturer: "ZPE",
			SKU:          "NSC-T48R-STND-DAC",
		},
		Nics: []hw.Nic{{
			Base: hw.Base{Integrated: true},
			Kind: "eth",
			Ports: []*hw.Port{
				{Protocols: []hw.Layer1{hw.Base1000T}, Capacity: hw.Mbps(1000)},
				{Protocols: []hw.Layer1{hw.Base1000T}, Capacity: hw.Mbps(1000)},
			},
		}},
	}

	for i := 0; i < ports; i++ {
		d.Ttys = append(d.Ttys, hw.Tty{
			Port: &hw.Port{
				Protocols: []hw.Layer1{hw.RS232},
			},
		})
	}

	return d

}

func OpenGearCM7132() *hw.Device {

	d := &hw.Device{
		Base: hw.Base{
			Model:        "CM7132 Console Server",
			Manufacturer: "OpenGear",
			SKU:          "CM7132-2-DAC-US",
		},
		Nics: []hw.Nic{{
			Base: hw.Base{Integrated: true},
			Kind: "eth",
			Ports: []*hw.Port{
				{Protocols: []hw.Layer1{hw.Base1000T}, Capacity: hw.Mbps(1000)},
				{Protocols: []hw.Layer1{hw.Base1000T}, Capacity: hw.Mbps(1000)},
			},
		}},
	}

	for i := 0; i < 32; i++ {
		d.Ttys = append(d.Ttys, hw.Tty{
			Port: &hw.Port{
				Protocols: []hw.Layer1{hw.RS232},
			},
		})
	}

	return d

}
