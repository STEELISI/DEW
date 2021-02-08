package tb

import (
	"gitlab.com/mergetb/xir/lang/go"
	"gitlab.com/mergetb/xir/lang/go/hw"
)

type Testbed interface {
	Components() ([]*Resource, []*hw.Cable)
}

func ToXir(t Testbed) *xir.Net {

	resources, cables := t.Components()
	net := xir.NewNet()

	for _, x := range resources {
		net.AddNode(x.Node())
	}

	for _, x := range cables {
		net.AddLink(x.Link())
	}

	return net

}
