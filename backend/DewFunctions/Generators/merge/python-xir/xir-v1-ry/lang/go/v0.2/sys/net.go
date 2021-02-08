package sys

import (
	"fmt"
	"net"

	"github.com/mitchellh/mapstructure"
	"gitlab.com/mergetb/xir/lang/go/v0.2"
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

type PortRef struct {
	CardIndex int
	PortIndex int

	Nic  *hw.Nic  `json:"-" yaml:"-"`
	Port *hw.Port `json:"-" yaml:"-"`
}

type LinkKind string

const (
	Loopback LinkKind = "loopback"
	Physical LinkKind = "physical"
	Vlan     LinkKind = "vlan"
	Vxlan    LinkKind = "vxlan"
	Bond     LinkKind = "bond"
	Bridge   LinkKind = "bridge"
)

type Link struct {
	Name        string
	Kind        LinkKind
	Parent      *Link    `json:"parent,omitempty"`
	PortRef     *PortRef `json:"port_ref,omitempty" mapstructure:"port_ref"`
	Addrs       []string `json:"addrs,omitempty"`
	BondMembers []string `json:"bond_members,omitempty"`
	Bridge      *Link    `json:"bridge,omitempty"`
	Gateway     net.IP   `json:"gateway,omitempty"`
}

func (i *Link) AddAddr(a string) {
	i.Addrs = append(i.Addrs, a)
}

type LinkSelector func(*Link) bool

func Gbps(value int) LinkSelector {
	return func(i *Link) bool {

		if i.PortRef == nil {
			return false
		}
		if i.PortRef.Port == nil {
			return false
		}

		return i.PortRef.Port.Capacity == uint64(value*1e9)

	}
}

func Lo() LinkSelector {
	return func(i *Link) bool { return i.Kind == Loopback }
}

func Links(node *xir.Node) []*Link {

	var links []*Link

	prop, ok := node.Props["links"]
	if !ok {
		return links
	}

	// in general, failing to decode is not an error, this is XIR so anything can
	// be there. this is a best effort function, if the caller expects a list of
	// links to be here, then a nil return may be treated as an error at a higher
	// level
	mapstructure.Decode(prop, &links)
	return links

}

// bond ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func (os *OperatingSystem) Bond(name string, links ...*Link) *Link {

	bond := &Link{
		Name: name,
		Kind: Bond,
	}
	for _, x := range links {
		bond.BondMembers = append(bond.BondMembers, x.Name)
	}

	os.Links = append(os.Links, bond)
	for _, x := range links {
		x.Parent = bond
	}
	return bond

}

func GetBond(e *xir.Endpoint) *Link {

	linkinfo := LinkInfo(e)
	if linkinfo == nil {
		return nil
	}

	if linkinfo.Parent == nil {
		return nil
	}

	if linkinfo.Parent.Kind == Bond {
		return linkinfo.Parent
	}

	return nil

}

func LinkLabel(lnk *xir.Link) string {

	if lnk == nil {
		return ""
	}

	aggregate := make(map[string][]*xir.Endpoint)
	for _, e := range lnk.Endpoints {
		b := GetBond(e.Endpoint)
		if b != nil {
			label := fmt.Sprintf("%s.%s", e.Endpoint.Parent.Label(), b.Name)
			aggregate[label] = append(aggregate[label], e.Endpoint)
		} else {
			label := fmt.Sprintf(
				"%s.%s", e.Endpoint.Parent.Label(), e.Endpoint.Label())
			aggregate[label] = []*xir.Endpoint{e.Endpoint}
		}
	}

	s := ""
	for x := range aggregate {
		s += x + " ~ "
	}
	return s[:len(s)-3]

}

// optional network device properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

type EvpnConfig struct {
	TunnelIP string
	ASN      int
}

type BridgeConfig struct {
	Name      string
	VlanAware bool
}
