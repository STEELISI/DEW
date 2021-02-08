package components

import (
	"gitlab.com/mergetb/xir/lang/go/hw"
)

// XeonE52650v4 is described here https://ark.intel.com/content/www/us/en/ark/products/91767/intel-xeon-processor-e5-2650-v4-30m-cache-2-20-ghz.html
func XeonE52650v4() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "E5 2650v4",
			Manufacturer: "Intel",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.Mhz(2200),
		L2:            hw.Mb(30),
		Cores:         12,
		Threads:       24,
		Tdp:           105,
	}
}

// Epyc7601 is a 32 core 2.2 Ghz first generation model AMD Epyc processor.
func Epyc7601() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7601",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.Mhz(2200),
		Cores:         32,
		Threads:       64,
		Tdp:           180,
	}

}

// Epyc7551 is a 32 core 2.0 Ghz first generation model AMD Epyc processor.
func Epyc7551() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7551",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.Mhz(2000),
		Cores:         32,
		Threads:       64,
		Tdp:           180,
	}

}

// Epyc7621 is an 8 core 2.5 Ghz first generation model AMD Epyc processor.
func Epyc7621() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7621",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.Mhz(2500),
		Cores:         8,
		Threads:       16,
		Tdp:           155,
	}

}

// XeonGold6252N is a 24 core Xeon Gold processor specialized for network
// processing.
func XeonGold6252N() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Xeon Gold 6252N",
			Manufacturer: "Intel",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.Mhz(2300),
		L2:            hw.Mb(35),
		Cores:         24,
		Threads:       48,
		Tdp:           150,
	}

}

// XeonSilver4215 is an 8 core Xeon Silver series processor.
func XeonSilver4215() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Xeon Silver 4216",
			Manufacturer: "Intel",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.Mhz(2500),
		L2:            hw.Mb(11),
		Cores:         8,
		Threads:       16,
		Tdp:           85,
	}

}

// XeonSilver4216 is a 16 core Xeon Silver series processor.
func XeonSilver4216() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Xeon Silver 4216",
			Manufacturer: "Intel",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.Mhz(2200),
		L2:            hw.Mb(22),
		Cores:         16,
		Threads:       32,
		Tdp:           100,
	}

}
