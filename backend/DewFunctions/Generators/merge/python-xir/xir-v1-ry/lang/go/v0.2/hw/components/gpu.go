package components

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

func RTX6000() hw.GPU {

	return hw.GPU{
		Base: hw.Base{
			Manufacturer: "Nvidia",
			Model:        "Quadro RTX 6000",
		},
	}

}
