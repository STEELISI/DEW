package hw

import (
	"fmt"

	"github.com/mitchellh/mapstructure"
	"gitlab.com/mergetb/xir/lang/go/v0.2"
)

type Device struct {
	Base
	Procs  []Proc `json:"procs,omitempty"`
	Memory []Dimm `json:"memory,omitempty"`
	Nics   []Nic  `json:"nics,omitempty"`
	Usbs   []Usb  `json:"usbs,omitempty"`
	Ttys   []Tty  `json:"ttys,omitempty"`
	Disks  []Disk `json:"disks,omitempty"`
	GPUs   []GPU  `json:"gpus,omitempty"`
	PSUs   []PSU  `json:"psus,omitempty"`
}

func (d *Device) BaseInfo() Base { return d.Base }
func (d *Device) Show() string   { return d.Base.Model }

func (d *Device) Node(id string) *xir.Node {

	node := &xir.Node{
		Id: id,
		Props: xir.Props{
			"model":        d.Model,
			"manufacturer": d.Manufacturer,
			"cpu":          d.Procs,
			"memory":       d.Memory,
			"cost":         d.Cost,
			//"nics":         d.Nics,
			"device": d,
		},
	}
	//XXX murder props - move to explicit model section
	//node.Props = make(xir.Props)

	kindCount := make(map[string]int)

	for _, nic := range d.Nics {

		kind := nic.GetKind()
		_, ok := kindCount[kind]
		if !ok {
			kindCount[kind] = nic.StartingIndex
		}

		for _, port := range nic.Ports {

			i, _ := kindCount[kind]
			kindCount[kind] = i + 1

			e := node.Endpoint().Set(xir.Props{
				"name":      fmt.Sprintf("%s%d", kind, i),
				"protocols": port.Protocols,
				"bandwidth": port.Capacity,
				"kind":      nic.GetKind(),
				"mac":       port.Mac,
			})

			if port.Breakout != "" {
				e.Props["breakout"] = port.Breakout
			}

			port.Endpoint = e
			//XXX murder props - move to explicit model section
			//port.Endpoint.Props = make(xir.Props)

		}
	}

	/* TODO: this is the right thing to do, but more support is needed in the
	*        bonsai realization engine for this to work
		for i, usb := range d.Usbs {

			e := node.Endpoint().Set(xir.Props{
				"name":    fmt.Sprintf("usb%d", i),
				"version": usb.Version,
			})

			//XXX murder props - move to explicit model section
			e.Props = make(xir.Props)

			i += 1

		}

		for i, tty := range d.Ttys {

			e := node.Endpoint().Set(xir.Props{
				"name":      fmt.Sprintf("ttyS%d", i+1),
				"protocols": tty.Port.Protocols,
			})
			tty.Port.Endpoint = e

			//XXX murder props - move to explicit model section
			e.Props = make(xir.Props)

		}
	*/

	return node

}

func Dev(n *xir.Node) *Device {

	obj, ok := n.Props["device"]
	if !ok {
		return nil
	}

	d := new(Device)
	mapstructure.Decode(obj, &d)

	return d
}

func (d *Device) ComponentPower() float32 {

	return 0.0

}
