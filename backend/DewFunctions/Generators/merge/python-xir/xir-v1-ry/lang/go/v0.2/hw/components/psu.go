package components

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

func Gigabyte2200WPSU() hw.PSU {

	return hw.PSU{
		Base: hw.Base{
			Model:        "Gigabyte 2200W PSU",
			Manufacturer: "Gigabyte",
			SKU:          "GBYPSU2200W",
		},
		PowerRatingWatts: 2200,
		EfficiencyRating: 80,
		IO: []hw.PowerConversionRating{
			{
				ACinput: hw.ACPowerRating{
					PowerRating: hw.PowerRating{
						VoltageMin: 100,
						VoltageMax: 127,
						CurrentMax: 14,
					},
					FreqMin: 47,
					FreqMax: 64,
				},
				DCoutput: hw.PowerRating{
					VoltageMin: 12.12,
					VoltageMax: 12.12,
					CurrentMax: 96.6,
				},
			},
			{
				ACinput: hw.ACPowerRating{
					PowerRating: hw.PowerRating{
						VoltageMin: 200,
						VoltageMax: 240,
						CurrentMax: 12.6,
					},
					FreqMin: 47,
					FreqMax: 64,
				},
				DCoutput: hw.PowerRating{
					VoltageMin: 12.12,
					VoltageMax: 12.12,
					CurrentMax: 178.1,
				},
			},
		},
	}

}

func Gigabyte1600WPSU() hw.PSU {

	return hw.PSU{
		Base: hw.Base{
			Model:        "Gigabyte 1600W PSU",
			Manufacturer: "Gigabyte",
			SKU:          "GBYPSU1600W",
		},
		PowerRatingWatts: 1600,
		EfficiencyRating: 80,
		IO: []hw.PowerConversionRating{
			{
				ACinput: hw.ACPowerRating{
					PowerRating: hw.PowerRating{
						VoltageMin: 100,
						VoltageMax: 127,
						CurrentMax: 12,
					},
					FreqMin: 47,
					FreqMax: 64,
				},
				DCoutput: hw.PowerRating{
					VoltageMin: 12,
					VoltageMax: 12,
					CurrentMax: 82,
				},
			},
			{
				ACinput: hw.ACPowerRating{
					PowerRating: hw.PowerRating{
						VoltageMin: 200,
						VoltageMax: 240,
						CurrentMax: 9.48,
					},
					FreqMin: 47,
					FreqMax: 64,
				},
				DCoutput: hw.PowerRating{
					VoltageMin: 12,
					VoltageMax: 12,
					CurrentMax: 132,
				},
			},
		},
	}

}

func Gigabyte1200WPSU() hw.PSU {

	return hw.PSU{
		Base: hw.Base{
			Model:        "Gigabyte 1200W PSU",
			Manufacturer: "Gigabyte",
			SKU:          "GBYPSU1600W",
		},
		PowerRatingWatts: 1200,
		EfficiencyRating: 80,
		IO: []hw.PowerConversionRating{
			{
				ACinput: hw.ACPowerRating{
					PowerRating: hw.PowerRating{
						VoltageMin: 100,
						VoltageMax: 127,
						CurrentMax: 12,
					},
					FreqMin: 47,
					FreqMax: 64,
				},
				DCoutput: hw.PowerRating{
					VoltageMin: 12,
					VoltageMax: 12,
					CurrentMax: 80.5,
				},
			},
			{
				ACinput: hw.ACPowerRating{
					PowerRating: hw.PowerRating{
						VoltageMin: 200,
						VoltageMax: 240,
						CurrentMax: 7,
					},
					FreqMin: 47,
					FreqMax: 64,
				},
				DCoutput: hw.PowerRating{
					VoltageMin: 12,
					VoltageMax: 12,
					CurrentMax: 97,
				},
			},
		},
	}

}

func Gigabyte1100WPSU() hw.PSU {

	return hw.PSU{
		Base: hw.Base{
			Model:        "Gigabyte 1100W PSU",
			Manufacturer: "Gigabyte",
			SKU:          "GBYPSU1100W",
		},
		PowerRatingWatts: 1100,
		EfficiencyRating: 80,
		IO: []hw.PowerConversionRating{
			{
				ACinput: hw.ACPowerRating{
					PowerRating: hw.PowerRating{
						VoltageMin: 100,
						VoltageMax: 127,
						CurrentMax: 12,
					},
					FreqMin: 47,
					FreqMax: 64,
				},
				DCoutput: hw.PowerRating{
					VoltageMin: 12,
					VoltageMax: 12,
					CurrentMax: 70,
				},
			},
			{
				ACinput: hw.ACPowerRating{
					PowerRating: hw.PowerRating{
						VoltageMin: 200,
						VoltageMax: 240,
						CurrentMax: 6,
					},
					FreqMin: 47,
					FreqMax: 64,
				},
				DCoutput: hw.PowerRating{
					VoltageMin: 12,
					VoltageMax: 12,
					CurrentMax: 90.5,
				},
			},
		},
	}

}

func Mellanox765WPSU() hw.PSU {

	return hw.PSU{
		Base: hw.Base{
			Model:        "Mellanox 765W PSU",
			Manufacturer: "Mellanox",
			SKU:          "MSNPSU765W",
		},
		PowerRatingWatts: 765,
		IO: []hw.PowerConversionRating{
			{
				ACinput: hw.ACPowerRating{
					PowerRating: hw.PowerRating{
						VoltageMin: 100,
						VoltageMax: 264,
						CurrentMax: 4.5,
					},
					FreqMin: 50,
					FreqMax: 60,
				},
			},
		},
	}

}

func Quanta215WPSU() hw.PSU {

	return hw.PSU{
		Base: hw.Base{
			Model:        "Quanta 215W PSU",
			Manufacturer: "Quanta",
			SKU:          "QCTPSU215W",
		},
		PowerRatingWatts: 215,
		IO: []hw.PowerConversionRating{
			{
				ACinput: hw.ACPowerRating{
					PowerRating: hw.PowerRating{
						VoltageMin: 100,
						VoltageMax: 240,
						CurrentMax: 2.15,
					},
					FreqMin: 50,
					FreqMax: 60,
				},
			},
		},
	}

}

func Quanta66WPSU() hw.PSU {

	return hw.PSU{
		Base: hw.Base{
			Model:        "Quanta 66W PSU",
			Manufacturer: "Quanta",
			SKU:          "QCTPSU66W",
		},
		PowerRatingWatts: 66,
		IO: []hw.PowerConversionRating{
			{
				ACinput: hw.ACPowerRating{
					PowerRating: hw.PowerRating{
						VoltageMin: 100,
						VoltageMax: 240,
						CurrentMax: 0.66,
					},
					FreqMin: 50,
					FreqMax: 60,
				},
			},
		},
	}

}

func Supermicro450WPSU() hw.PSU {

	return hw.PSU{
		Base: hw.Base{
			Model:        "Supermicro 450W PSU",
			Manufacturer: "Supermicro",
			SKU:          "SMPSU240W",
		},
		PowerRatingWatts: 450,
		IO: []hw.PowerConversionRating{
			{
				ACinput: hw.ACPowerRating{
					PowerRating: hw.PowerRating{
						VoltageMin: 100,
						VoltageMax: 240,
						CurrentMax: 4.5,
					},
					FreqMin: 50,
					FreqMax: 60,
				},
			},
		},
	}

}
