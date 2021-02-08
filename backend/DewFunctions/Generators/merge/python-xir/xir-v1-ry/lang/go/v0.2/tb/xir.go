package tb

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2"
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
)

type Testbed interface {
	Components() ([]*Resource, []*hw.Cable)
	Provisional() map[string]map[string]interface{}
}

func ToXir(t Testbed, name string) *xir.Net {

	resources, cables := t.Components()
	net := xir.NewNet(name)
	net.Props["provisional"] = t.Provisional()

	for _, x := range resources {
		net.AddNode(x.Node())
	}

	for _, x := range cables {
		net.AddLink(x.Link())
	}

	xir.PrepNetwork(net)
	xir.LinkNetwork(net)
	xir.LiftNetConstraints(net)

	return net

}
