package hw

import (
	"fmt"
	"math/rand"

	"gitlab.com/mergetb/xir/lang/go"
)

// GenericSwitch creates a generic switch with the provided radix and port
// speed.
func GenericSwitch(radix int, portSpeed uint64) *Device {

	mgmt := Nic{
		Kind: "eth",
		Ports: []*Port{{
			Protocol: Base100T,
			Capacity: Gbps(1),
			Mac:      macgen(),
		}},
	}

	data := Nic{
		Kind:  "swp",
		Ports: make([]*Port, radix, radix),
	}
	for i := range data.Ports {
		data.Ports[i] = &Port{
			Protocol: UnspecProtocol,
			Capacity: portSpeed,
			Mac:      macgen(),
		}
	}

	return &Device{
		Base: Base{
			Manufacturer: "generic",
			Model:        fmt.Sprintf("GSwitch-%d-X%d", portSpeed, radix),
		},
		Procs:  []Proc{{Cores: 2}},
		Memory: []Dimm{{Capacity: Gb(2)}},
		Nics:   []Nic{mgmt, data},
	}

}

// GenericServer creates a generic server with the provided number of ports and
// port speed.
func GenericServer(ports int, portSpeed uint64) *Device {

	data := Nic{
		Kind:  "eth",
		Ports: make([]*Port, ports),
	}
	for i := range data.Ports {
		data.Ports[i] = &Port{
			Protocol: UnspecProtocol,
			Capacity: portSpeed,
			Mac:      macgen(),
		}
	}

	return &Device{
		Base: Base{
			Manufacturer: "generic",
			Model:        fmt.Sprintf("GServer-%d-X%d", portSpeed, ports),
		},
		Procs:  []Proc{{Cores: 8}},
		Memory: []Dimm{{Capacity: Gb(16)}},
		Nics:   []Nic{data},
	}

}

// GenericCable creates a generic cable.
func GenericCable(capacity uint64) *Cable {

	return &Cable{
		Base: Base{
			Manufacturer: "generic",
			Model:        fmt.Sprintf("GCable-%d", capacity),
		},
		Kind: UnspecCable,
		Connectors: [2]End{
			[]*Connector{{
				Kind:     UnspecConnector,
				Protocol: UnspecProtocol,
				Capacity: capacity,
			}},
			[]*Connector{{
				Kind:     UnspecConnector,
				Protocol: UnspecProtocol,
				Capacity: capacity,
			}},
		},
		Props: make(xir.Props),
	}

}

func macgen() string {
	x := rand.Int31()
	s := fmt.Sprintf("%08x", x)
	return fmt.Sprintf("00:00:%s:%s:%s:%s", s[0:2], s[2:4], s[4:6], s[6:8])
}
