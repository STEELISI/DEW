package components

import (
	"fmt"

	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

func DC_S3500_120() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "DC P3500",
			SKU:          "DC-P3500-120",
		},
		Capacity:   hw.Gb(120),
		FormFactor: hw.SSD25,
		Interface:  hw.SATA3,
	}

	return d

}

func DC_P4610_1600() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "DC P4610",
			SKU:          "DC-P4610-1600",
		},
		Capacity:   hw.Gb(1600),
		FormFactor: hw.U2,
		Interface:  hw.NVMEx4,
	}

	return d

}

func DC_P4510_1000() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "DC P4510",
			SKU:          "SSDPE2KX010T801",
		},
		Capacity:   hw.Tb(1),
		FormFactor: hw.U2,
		Interface:  hw.NVMEx4,
	}

	return d

}

func DC_P4510_2000() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "DC P4510",
			SKU:          "SSDPE2KX020T801",
		},
		Capacity:   hw.Tb(2),
		FormFactor: hw.U2,
		Interface:  hw.NVMEx4,
	}

	return d

}

func DC_P4510_4000() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "DC P4510",
			SKU:          "SSDPE2KX040T801",
		},
		Capacity:   hw.Tb(4),
		FormFactor: hw.U2,
		Interface:  hw.NVMEx4,
	}

	return d

}

func DC_P4511_1024() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "DC P4511",
			SKU:          "SSDPELKX010T801",
		},
		Capacity:   hw.Gb(1024),
		FormFactor: hw.M2_22110,
		Interface:  hw.NVMEx4,
	}

	return d

}

func DC_S3520() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "DC S3520",
			SKU:          "DC-S3520",
		},
		Capacity:   hw.Gb(960),
		FormFactor: hw.M2_2280,
		Interface:  hw.SATA3,
	}

	return d

}

func DC_P4101_256() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "DC P4101",
			SKU:          "DC-P4101",
		},
		Capacity:   hw.Gb(256),
		FormFactor: hw.M2_2280,
		Interface:  hw.NVMEx4,
	}

	return d

}

func D3_P4610_1920() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "D3 P4610",
			SKU:          "D3-P4610",
		},
		Capacity:   hw.Gb(1920),
		FormFactor: hw.U2,
		Interface:  hw.NVMEx4,
	}

	return d

}

func D3_P4610_3200() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "D3 P4610",
			SKU:          "D3-P4610",
		},
		Capacity:   hw.Gb(3200),
		FormFactor: hw.U2,
		Interface:  hw.NVMEx4,
	}

	return d

}

func D3_S4610_960() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "D3 S4610",
			SKU:          "D3-S4610",
		},
		Capacity:   hw.Gb(960),
		FormFactor: hw.SSD25,
		Interface:  hw.SATA3,
	}

	return d

}

func D3_S4510_1920() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "D3 S4510",
			SKU:          "SSDSC2KB019T801",
		},
		Capacity:   hw.Gb(1920),
		FormFactor: hw.SSD25,
		Interface:  hw.SATA3,
	}

	return d

}

func Intel7600P_1TB() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Intel",
			Model:        "7600 Pro SSD",
			SKU:          "7600-Pro-SSD",
		},
		Capacity:   hw.Gb(1024),
		FormFactor: hw.M2_2280,
		Interface:  hw.NVMEx4,
	}

	return d
}

func EMMC_32() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Generic",
			Model:        "32 GB EMMC",
			SKU:          "32-GB-EMMC",
		},
		Capacity:   hw.Gb(32),
		FormFactor: hw.EMMC,
		Interface:  hw.MMC,
	}

	return d
}

func GenericDisk(capacity uint64, ff hw.DiskFormFactor, ifx hw.DiskInterface) hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Generic",
			Model:        "Disk",
			SKU:          fmt.Sprintf("GD%d%d%s", capacity, int(ff), ifx),
		},
		Capacity:   capacity,
		FormFactor: ff,
		Interface:  ifx,
	}

	return d
}

func CrucialMx500() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Curcial",
			Model:        "500MX",
			SKU:          "CT500MX500SSD4",
		},
		Capacity:   hw.Gb(500),
		FormFactor: hw.M2_2280,
		Interface:  hw.SATA3,
	}

	return d
}

func EXOS7E200_1024() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Seagate",
			Model:        "EXOS 7E2000",
			SKU:          "ST1000NX0313",
		},
		Capacity:   hw.Gb(1024),
		FormFactor: hw.HDD25,
		Interface:  hw.SATA3,
	}

	return d

}

func SeagateEnterpriseHDD_6TB() hw.Disk {

	d := hw.Disk{
		Base: hw.Base{
			Manufacturer: "Seagate",
			Model:        "Enterprise SAS HDD",
			SKU:          "ST6000NM0034",
		},
		Capacity:   hw.Tb(6),
		FormFactor: hw.HDD35,
		Interface:  hw.SAS,
	}

	return d

}
