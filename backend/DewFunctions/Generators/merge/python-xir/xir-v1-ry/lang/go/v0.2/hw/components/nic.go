package components

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

// I350DA4 is a thing
func I350DA4() hw.Nic {

	n := hw.Nic{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "i350 DA4",
			SKU:          "I350-DA4",
		},
		Kind: "eth",
		Ports: hw.Ports(4, &hw.Port{
			Capacity:   hw.Gbps(1),
			FormFactor: hw.RJ45,
			Protocols:  []hw.Layer1{hw.Base1000T, hw.Base100T},
		}),
	}

	return n

}

// I350DA2 is a thing
func I350DA2() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "i350 DA",
			SKU:          "I350-DA2",
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			Capacity:   hw.Gbps(1),
			FormFactor: hw.RJ45,
			Protocols:  []hw.Layer1{hw.Base1000T},
		}),
	}

}

func I210AT() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "i210",
			SKU:          "I210AT",
		},
		Kind: "eth",
		Ports: hw.Ports(1, &hw.Port{
			Capacity:   hw.Gbps(1),
			FormFactor: hw.RJ45,
			Protocols:  []hw.Layer1{hw.Base1000T},
		}),
	}

}

// I350AM2 like I350-DA2 but with server management capabilities
func I350AM2() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "i350 AM2",
			SKU:          "I350-AM2",
			Integrated:   true,
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			Capacity:   hw.Gbps(1),
			FormFactor: hw.RJ45,
			Protocols:  []hw.Layer1{hw.Base1000T},
		}),
	}

}

// XL710DA4 is a thing
func XL710DA4() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "XL710 DA4",
			SKU:          "XL710QDA2",
		},
		Kind: "eth",
		Ports: hw.Ports(4, &hw.Port{
			Capacity:   hw.Gbps(10),
			FormFactor: hw.SFPP,
			Protocols:  []hw.Layer1{hw.GBase10SR},
		}),
	}

}

// X722 is a thing
func X722() hw.Nic {

	ps := hw.Ports(2, &hw.Port{
		Capacity:   hw.Gbps(10),
		FormFactor: hw.RJ45,
		Protocols:  []hw.Layer1{hw.GBase10T},
	})

	ps = append(ps, hw.Ports(2, &hw.Port{
		Capacity:   hw.Gbps(10),
		FormFactor: hw.SFPP,
		Protocols:  []hw.Layer1{hw.GBase10SR},
	})...)

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "X722",
			SKU:          "X722",
		},
		Kind:  "eth",
		Ports: ps,
	}

}

// Ipmi is an IPMI NIC
func Ipmi() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "ASpeed",
			Model:        "IPMI NIC",
			SKU:          "AS-IPMI-100M",
			Integrated:   true,
		},
		Kind: "ipmi",
		Ports: hw.Ports(1, &hw.Port{
			Capacity:   hw.Mbps(100),
			FormFactor: hw.RJ45,
			Protocols:  []hw.Layer1{hw.Base1000T},
		}),
	}

}

// ConnectX4_2x100 is a Mellanox 4th generation dual port 100 gbps NIC.
func ConnectX4_2x100() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-4",
			SKU:          "MCX516A-CCAT",
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			Capacity:   hw.Gbps(100),
			FormFactor: hw.QSFP28,
			Protocols:  []hw.Layer1{hw.GBase100SR4},
		}),
	}

}

func ConnectX4_1x50() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-4",
			SKU:          "MCX415A-GCAT",
		},
		Kind: "eth",
		Ports: hw.Ports(1, &hw.Port{
			Capacity:   hw.Gbps(50),
			FormFactor: hw.QSFP28,
			Protocols:  []hw.Layer1{hw.GBase50SR4},
		}),
	}

}

func ConnectX4_1x10() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-4",
			SKU:          "MCX4111A-XCAT",
		},
		Kind: "eth",
		Ports: hw.Ports(1, &hw.Port{
			Capacity:   hw.Gbps(10),
			FormFactor: hw.SFPP,
			Protocols:  []hw.Layer1{hw.GBase10SR},
		}),
	}

}

func ConnectX5_1x50() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-5",
			SKU:          "MCX515A-GCAT",
		},
		Kind: "eth",
		Ports: hw.Ports(1, &hw.Port{
			Capacity:   hw.Gbps(50),
			FormFactor: hw.QSFP28,
			Protocols:  []hw.Layer1{hw.GBase50SR4},
		}),
	}

}

// ConnectX5_2x100 is a Mellanox 5th generation dual port 100 gbps NIC.
func ConnectX5_2x100() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-5",
			SKU:          "MCX516A-CDAT",
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			Capacity:   hw.Gbps(100),
			FormFactor: hw.QSFP28,
			Protocols:  []hw.Layer1{hw.GBase100SR4},
		}),
	}

}

func ConnectX4_1x25() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-4 1x25G",
			SKU:          "MCX4111A-ACAT",
		},
		Kind: "eth",
		Ports: hw.Ports(1, &hw.Port{
			Protocols: []hw.Layer1{
				hw.GBase25SR,
				hw.GBase10SR,
			},
			FormFactor: hw.SFP28,
			Capacity:   hw.Gbps(25),
		}),
	}

}

// ConnectX4_2x25 is a Mellanox 4th generation dual port 25 gbps NIC.
func ConnectX4_2x25() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-4 2x25G",
			SKU:          "MCX4121A-ACAT",
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			Protocols: []hw.Layer1{
				hw.GBase25SR,
				hw.GBase10SR,
			},
			FormFactor: hw.SFP28,
			Capacity:   hw.Gbps(25),
		}),
	}

}

func ConnectX5_2x25() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-5",
			SKU:          "MCX512F-ACAT",
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			Protocols: []hw.Layer1{
				hw.GBase25SR,
				hw.GBase10SR,
			},
			FormFactor: hw.SFP28,
			Capacity:   hw.Gbps(25),
		}),
	}

}

func XXV710DA2_OCP() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "XXV710-DA2 OCP 2.0",
			SKU:          "XXV710DA2OCP2",
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			Protocols: []hw.Layer1{
				hw.GBase25SR,
				hw.GBase10SR,
			},
			FormFactor: hw.SFP28,
			Capacity:   hw.Gbps(25),
		}),
	}

}

func ConnectX4_2x25_OCP() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-4 OCP 2.0",
			SKU:          "MCX4421A-ACAN",
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			Protocols: []hw.Layer1{
				hw.GBase25SR,
				hw.GBase10SR,
			},
			FormFactor: hw.SFP28,
			Capacity:   hw.Gbps(25),
		}),
	}

}

func ConnectX5_2x25_OCP() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-5 OCP 2.0",
			SKU:          "MCX542A-ACAN",
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			Protocols: []hw.Layer1{
				hw.GBase25SR,
				hw.GBase10SR,
			},
			FormFactor: hw.SFP28,
			Capacity:   hw.Gbps(25),
		}),
	}

}

// ConnectX4_2x50 is a Mellanox 6th generation dual port 50 gbps NIC.
func ConnectX6_2x50() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-6",
			SKU:          "MCX623102AN-GDAT",
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			FormFactor: hw.SFP56,
			Capacity:   hw.Gbps(50),
			Protocols:  []hw.Layer1{hw.GBase50SR, hw.GBase25SR, hw.GBase10SR},
		}),
	}

}

// ConnectX6_2x200 is a Mellanox 6th generation dual port 200 gbps NIC.
func ConnectX6_2x200() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-6",
			SKU:          "MCX653106A-HDAT",
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			Capacity:   hw.Gbps(200),
			FormFactor: hw.QSFP56,
			Protocols:  []hw.Layer1{hw.GBase200SR4},
		}),
	}

}

// ConnectX6_2x100 is a Mellanox 6th generation dual port 100 gbps NIC.
func ConnectX6_2x100() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-6",
			SKU:          "MCX653106A-ECAT",
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			Capacity:   hw.Gbps(100),
			FormFactor: hw.QSFP56,
			Protocols:  []hw.Layer1{hw.GBase100SR4},
		}),
	}

}

// ConnectX6_1x100 is a Mellanox 6th generation dual port 100 gbps NIC.
func ConnectX6_1x100() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Mellanox",
			Model:        "ConnectX-6",
			SKU:          "MCX653105A-ECAT",
		},
		Kind: "eth",
		Ports: hw.Ports(1, &hw.Port{
			Capacity:   hw.Gbps(100),
			FormFactor: hw.QSFP56,
			Protocols:  []hw.Layer1{hw.GBase100SR4},
		}),
	}

}

// X550_AT2 is an Intel dual port 10G BaseT NIC
func X550_AT2() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "X550 AT2",
			SKU:          "X550-AT2",
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			Capacity:   hw.Gbps(10),
			FormFactor: hw.RJ45,
			Protocols:  []hw.Layer1{hw.GBase10T},
		}),
	}

}

// X553_DA2 is an Intel dual port 10G SFP NIC
func X553_DA2() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "X553 DA2",
			SKU:          "X553-DA2",
		},
		Kind: "eth",
		Ports: hw.Ports(2, &hw.Port{
			Capacity:   hw.Gbps(10),
			FormFactor: hw.SFPP,
			Protocols:  []hw.Layer1{hw.GBase10SR},
		}),
	}

}

// X553_AT8 is an Intel 8 port 1G BaseT NIC
func X553_AT8() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "X553 AT8",
			SKU:          "X553-AT8",
		},
		Kind: "eth",
		Ports: hw.Ports(8, &hw.Port{
			Capacity:   hw.Gbps(1),
			FormFactor: hw.RJ45,
			Protocols:  []hw.Layer1{hw.Base1000T},
		}),
	}

}

func NetronomeLX100() hw.Nic {

	return hw.Nic{
		Base: hw.Base{
			Manufacturer: "Netronome",
			Model:        "LX-100G",
			SKU:          "LX100G",
		},
		Ports: hw.Ports(1, &hw.Port{
			Capacity:   hw.Gbps(100),
			FormFactor: hw.CXP,
			Protocols:  []hw.Layer1{hw.CXP100},
		}),
	}

}
