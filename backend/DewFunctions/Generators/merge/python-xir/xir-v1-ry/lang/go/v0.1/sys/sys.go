package sys

import (
	"fmt"
	"net"

	"github.com/mitchellh/mapstructure"

	"gitlab.com/mergetb/xir/lang/go"
	"gitlab.com/mergetb/xir/lang/go/hw"
)

type System struct {
	Name   string
	OS     *OperatingSystem
	Device *hw.Device
	Props  xir.Props
}

type OperatingSystem struct {
	Links  []*Link
	Config OsConfig
}

// optional configuration properties
type OsConfig struct {
	Evpn          *EvpnConfig   `json:",omitempty"`
	PrimaryBridge *BridgeConfig `json:",omitempty"`
}

func NewSystem(name string, device *hw.Device) *System {

	os := &OperatingSystem{}

	os.Links = append(os.Links, &Link{
		Name: "lo",
		Kind: Loopback,
		Addrs: []net.IP{
			net.IPv4(127, 0, 0, 1),
		},
	})

	counter := 0
	for n := range device.Nics {
		for p := range device.Nics[n].Ports {

			os.Links = append(os.Links, &Link{
				Name: fmt.Sprintf("%s%d", device.Nics[n].Kind, counter),
				Kind: Physical,
				PortRef: &PortRef{
					CardIndex: n,
					PortIndex: p,
					Nic:       &device.Nics[n],
					Port:      device.Nics[n].Ports[p],
				},
			})

			counter += 1

		}
	}

	return &System{
		Name:   name,
		OS:     os,
		Device: device,
		Props:  make(xir.Props),
	}
}

func (os *OperatingSystem) Link(fs ...LinkSelector) []*Link {

	var result []*Link
	for _, i := range os.Links {
		if ifSat(i, fs...) {
			result = append(result, i)
		}
	}
	return result

}

func ifSat(i *Link, fs ...LinkSelector) bool {

	for _, f := range fs {
		if !f(i) {
			return false
		}
	}
	return true

}

func (sys *System) Node() *xir.Node {

	n := sys.Device.Node(sys.Name)

	for k, v := range sys.Props {
		n.Props[k] = v
		n.Props["name"] = sys.Name
	}

	for _, x := range sys.OS.Links {

		ep := n.GetEndpoint(x.Name)
		if ep == nil {
			continue
		}
		ep.Props["link"] = x

	}

	n.Props["sysconf"] = sys.OS.Config

	return n

}

func LinkInfo(e *xir.Endpoint) *Link {

	obj, ok := e.Props["link"]
	if !ok {
		return nil
	}

	info := &Link{}
	err := mapstructure.Decode(obj, &info)
	if err != nil {
		return nil
	}

	return info

}

func SysConfig(n *xir.Node) *OsConfig {

	obj, ok := n.Props["sysconf"]
	if !ok {
		return nil
	}

	info := &OsConfig{}
	err := mapstructure.Decode(obj, &info)
	if err != nil {
		fmt.Printf("%v", err)
		return nil
	}

	return info

}
