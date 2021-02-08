package components

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

func XeonE31260L() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "E3 1260L",
			Manufacturer: "Intel",
			SKU:          "E31260L",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.MHz(2400),
		L2:            hw.Mb(8),
		Cores:         4,
		Threads:       8,
		Tdp:           45,
	}

}

func XeonE52420v2() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "E5 2420v2",
			Manufacturer: "Intel",
			SKU:          "E52420v2",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.MHz(2200),
		L2:            hw.Mb(15),
		Cores:         6,
		Threads:       12,
		Tdp:           80,
	}
}

func XeonE52620v2() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "E5 2620v2",
			Manufacturer: "Intel",
			SKU:          "E52620v2",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.MHz(2100),
		L2:            hw.Mb(15),
		Cores:         6,
		Threads:       12,
		Tdp:           80,
	}
}

// XeonE52650v4 is described here https://ark.intel.com/content/www/us/en/ark/products/91767/intel-xeon-processor-e5-2650-v4-30m-cache-2-20-ghz.html
func XeonE52650v4() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "E5 2650v4",
			Manufacturer: "Intel",
			SKU:          "E52650v4",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.MHz(2200),
		L2:            hw.Mb(30),
		Cores:         12,
		Threads:       24,
		Tdp:           105,
	}
}

func XeonD2146NT() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Xeon D-2146NT",
			Manufacturer: "Intel",
			SKU:          "XeonD2146NT",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.MHz(2300),
		L2:            hw.Mb(11),
		Cores:         8,
		Threads:       16,
		Tdp:           80,
	}
}

func XeonD1527() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Xeon D-1527",
			Manufacturer: "Intel",
			SKU:          "GG8067402569400",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.MHz(2200),
		L2:            hw.Mb(6),
		Cores:         4,
		Threads:       8,
		Tdp:           25,
	}

}

func PentiumD1508() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Pentium D-1508",
			Manufacturer: "Intel",
			SKU:          "GG8067402569900",
		},
		ISA:           hw.X86_64,
		Family:        "Pentium",
		BaseFrequency: hw.MHz(2200),
		L2:            hw.Mb(3),
		Cores:         2,
		Threads:       4,
		Tdp:           25,
	}

}

func Epyc7281() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7281",
			SKU:          "Epyc7281",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.MHz(2100),
		L2:            hw.Mb(32),
		Cores:         16,
		Threads:       32,
		Tdp:           170,
	}

}

// Epyc7601 is a 32 core 2.2 Ghz first generation model AMD Epyc processor.
func Epyc7601() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7601",
			SKU:          "Epyc7601",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.MHz(2200),
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
			SKU:          "Epyc7551",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.MHz(2000),
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
			SKU:          "Epyc7621",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.MHz(2500),
		Cores:         8,
		Threads:       16,
		Tdp:           155,
	}

}

func Epyc7301() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7301",
			SKU:          "PS7301BEVGPAF",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.MHz(2700),
		Cores:         16,
		Threads:       32,
		Tdp:           170,
		L2:            hw.Mb(64),
	}

}

// Epyc7302 is a 16 core 3.0 Ghz second generation AMD Epyc processor.
func Epyc7302() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7302",
			SKU:          "100-000000043",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.MHz(3000),
		Cores:         16,
		Threads:       32,
		Tdp:           155,
		L2:            hw.Mb(128),
	}

}

func Epyc7351() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7351",
			SKU:          "PS7351BEVGPAF",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.MHz(2400),
		Cores:         16,
		Threads:       32,
		Tdp:           170,
		L2:            hw.Mb(128),
	}

}

func Epyc7402() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7402",
			SKU:          "100-000000046",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.MHz(2800),
		Cores:         24,
		Threads:       48,
		Tdp:           180,
		L2:            hw.Mb(128),
	}

}

func Epyc7452() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7452",
			SKU:          "100-000000057",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.MHz(2350),
		Cores:         32,
		Threads:       64,
		Tdp:           155,
		L2:            hw.Mb(128),
	}

}

// Epyc7502 is a 32 core 3.0 Ghz second generation AMD Epyc processor.
func Epyc7502() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Manufacturer: "AMD",
			Model:        "Epyc 7502",
			SKU:          "100-000000054",
		},
		ISA:           hw.X86_64,
		Family:        "Epyc",
		BaseFrequency: hw.MHz(2500),
		Cores:         32,
		Threads:       64,
		Tdp:           180,
		L2:            hw.Mb(128),
	}

}

// XeonGold6252N is a 24 core Xeon Gold processor specialized for network
// processing.
func XeonGold6252N() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Xeon Gold 6252N",
			Manufacturer: "Intel",
			SKU:          "Xeon6252N",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.MHz(2300),
		L2:            hw.Mb(35),
		Cores:         24,
		Threads:       48,
		Tdp:           150,
	}

}

// XeonGold6246 is a 12 core Xeon Gold processor
func XeonGold6246() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Xeon Gold 6246",
			Manufacturer: "Intel",
			SKU:          "Xeon6246",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.MHz(3300),
		L2:            hw.Mb(25),
		Cores:         12,
		Threads:       24,
		Tdp:           165,
	}

}

// XeonSilver4215 is an 8 core Xeon Silver series processor.
func XeonSilver4215() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Xeon Silver 4216",
			Manufacturer: "Intel",
			SKU:          "Xeon4216",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.MHz(2500),
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
			SKU:          "X4216",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.MHz(2200),
		L2:            hw.Mb(22),
		Cores:         16,
		Threads:       32,
		Tdp:           100,
	}

}

func XeonE52650V4() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Xeon E4-2640V4 12C 2.2Ghz",
			Manufacturer: "Intel",
			SKU:          "XE42640V4",
		},
		ISA:           hw.X86_64,
		Family:        "Xeon",
		BaseFrequency: hw.MHz(2200),
		L2:            hw.Mb(30),
		Cores:         12,
		Threads:       24,
		Tdp:           105,
	}

}

func AtomE3845() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Atom E3845",
			Manufacturer: "Intel",
			SKU:          "AtomE3845",
		},
		ISA:           hw.X86_64,
		Family:        "Atom",
		BaseFrequency: hw.MHz(1910),
		L2:            hw.Mb(2),
		Cores:         4,
		Threads:       4,
		Tdp:           10,
	}

}

func AtomC3558() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Xeon Atom C3558",
			Manufacturer: "Intel",
			SKU:          "AtomC3558",
		},
		ISA:           hw.X86_64,
		Family:        "Atom",
		BaseFrequency: hw.MHz(2200),
		L2:            hw.Mb(8),
		Cores:         4,
		Threads:       4,
		Tdp:           16,
	}

}

func AtomC2758() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Atom C2758",
			Manufacturer: "Intel",
			SKU:          "FH8065503553000",
		},
		ISA:           hw.X86_64,
		Family:        "Atom",
		BaseFrequency: hw.MHz(2400),
		L2:            hw.Mb(4),
		Cores:         8,
		Threads:       8,
		Tdp:           20,
	}

}

func AtomC2558() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Xeon Atom C2558",
			Manufacturer: "Intel",
			SKU:          "FH8065503553200",
		},
		ISA:           hw.X86_64,
		Family:        "Atom",
		BaseFrequency: hw.MHz(2400),
		L2:            hw.Mb(2),
		Cores:         4,
		Threads:       4,
		Tdp:           15,
	}

}

func AtomC2538() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Atom C2538",
			Manufacturer: "Intel",
			SKU:          "AtomC2538",
		},
		ISA:           hw.X86_64,
		Family:        "Atom",
		BaseFrequency: hw.MHz(2400),
		L2:            hw.Mb(2),
		Cores:         4,
		Threads:       4,
		Tdp:           15,
	}

}

func AtomC2338() hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Xeon Atom C2338",
			Manufacturer: "Intel",
			SKU:          "FH8065503553701",
		},
		ISA:           hw.X86_64,
		Family:        "Atom",
		BaseFrequency: hw.MHz(1700),
		L2:            hw.Mb(1),
		Cores:         2,
		Threads:       2,
		Tdp:           7,
	}

}

func BCMCoretexA9(cores int) hw.Proc {

	return hw.Proc{
		Base: hw.Base{
			Model:        "Arm Coretex A9",
			Manufacturer: "Broadcom",
			SKU:          "CoretexA9",
		},
		ISA:           hw.X86_64,
		Family:        "Coretex A9",
		BaseFrequency: hw.MHz(1000),
		L2:            0,
		Cores:         uint(cores),
		Threads:       uint(cores),
		Tdp:           10,
	}

}
