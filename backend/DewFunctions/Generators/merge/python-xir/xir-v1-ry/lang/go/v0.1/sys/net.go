package sys

import (
	"net"

	"github.com/mitchellh/mapstructure"
	"gitlab.com/mergetb/xir/lang/go"
	"gitlab.com/mergetb/xir/lang/go/hw"
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
)

type Link struct {
	Name        string
	Kind        LinkKind
	Parent      *Link
	PortRef     *PortRef
	Addrs       []net.IP
	BondMembers []string
	Bridge      *Link
}

func (i *Link) AddAddr(a net.IP) {
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

// optional network device properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

type EvpnConfig struct {
	TunnelIP string
	ASN      int
}

type BridgeConfig struct {
	Name      string
	VlanAware bool
}
