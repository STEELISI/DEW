package sys

import (
	"fmt"

	"github.com/mitchellh/mapstructure"

	"gitlab.com/mergetb/xir/lang/go/v0.2"
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

type System struct {
	Name   string
	OS     *OperatingSystem
	Device *hw.Device `json:"-"`
	Props  xir.Props  `json:"props,omitempty"`
}

type OperatingSystem struct {
	Links  []*Link
	Config *OsConfig `json:"config,omitempty"`
}

// optional configuration properties
type OsConfig struct {
	Evpn          *EvpnConfig   `json:",omitempty"`
	PrimaryBridge *BridgeConfig `json:",omitempty"`
	Append        string        `json:"append,omitempty"`
	Rootdev       string        `json:"rootdev,omitempty"`
}

func NewSystem(name string, device *hw.Device) *System {

	os := &OperatingSystem{}

	os.Links = append(os.Links, &Link{
		Name:  "lo",
		Kind:  Loopback,
		Addrs: []string{"127.0.0.1/8"},
	})

	counters := make(map[string]int)

	for n, nic := range device.Nics {
		for p := range device.Nics[n].Ports {

			_, ok := counters[nic.Kind]
			if !ok {
				counters[nic.Kind] = nic.StartingIndex
			}

			os.Links = append(os.Links, &Link{
				Name: fmt.Sprintf("%s%d", device.Nics[n].Kind, counters[nic.Kind]),
				Kind: Physical,
				PortRef: &PortRef{
					CardIndex: n,
					PortIndex: p,
					Nic:       &device.Nics[n],
					Port:      device.Nics[n].Ports[p],
				},
			})

			counters[nic.Kind] = counters[nic.Kind] + 1

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

	/*
		for k, v := range sys.Props {
			n.Props[k] = v
			n.Props["name"] = sys.Name
		}
	*/

	for _, x := range sys.OS.Links {

		ep := n.GetEndpoint(x.Name)
		if ep == nil {
			continue
		}
		ep.Props["link"] = x

	}

	//n.Props["sysconf"] = sys.OS.Config

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

func Sys(n *xir.Node) *System {

	obj, ok := n.Props["system"]
	if !ok {
		return nil
	}

	config := &mapstructure.DecoderConfig{
		WeaklyTypedInput: true,
		DecodeHook:       mapstructure.StringToIPHookFunc(),
		Result:           &System{},
	}

	decoder, err := mapstructure.NewDecoder(config)
	if err != nil {
		fmt.Printf("%v", err)
		return nil
	}

	err = decoder.Decode(obj)
	if err != nil {
		fmt.Printf("%v", err)
		return nil
	}

	s := config.Result.(*System)

	s.Device = hw.Dev(n)

	return s

}
