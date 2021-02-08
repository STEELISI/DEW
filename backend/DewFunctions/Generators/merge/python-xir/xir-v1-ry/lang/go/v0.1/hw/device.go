package hw

import (
	"fmt"

	"gitlab.com/mergetb/xir/lang/go"
)

type Device struct {
	Base
	Procs  []Proc
	Memory []Dimm
	Nics   []Nic
	Usbs   []Usb
	Ttys   []Tty
	Disks  []Disk
}

func (d *Device) Node(id string) *xir.Node {

	node := &xir.Node{
		Id: id,
		Props: xir.Props{
			"model":        d.Model,
			"manufacturer": d.Manufacturer,
			"cpu":          d.Procs,
			"memory":       d.Memory,
			"nics":         d.Nics,
		},
	}

	i := 0
	for _, nic := range d.Nics {
		for _, port := range nic.Ports {

			e := node.Endpoint().Set(xir.Props{
				"name":      fmt.Sprintf("%s%d", nic.GetKind(), i),
				"protocol":  port.Protocol,
				"bandwidth": port.Capacity,
				"kind":      nic.GetKind(),
				"mac":       port.Mac,
			})
			port.Endpoint = e

			i += 1

		}
	}

	for i, usb := range d.Usbs {

		node.Endpoint().Set(xir.Props{
			"name":    fmt.Sprintf("usb%d", i),
			"version": usb.Version,
		})

		i += 1

	}

	for i, tty := range d.Ttys {

		e := node.Endpoint().Set(xir.Props{
			"name":     fmt.Sprintf("ttyS%d", i+1),
			"protocol": tty.Port.Protocol,
		})
		tty.Port.Endpoint = e

	}

	return node

}
