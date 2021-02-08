package main

import (
	"fmt"
	xir "gitlab.com/mergetb/xir/lang/go"
	"gitlab.com/mergetb/xir/tools/viz"
)

func main() {

	a := xir.NewNet()
	s0 := a.Node().Set(xir.Props{"name": "s0"})
	s1 := a.Node().Set(xir.Props{"name": "s1"})
	for i := 0; i < 5; i++ {
		n := a.Node().Set(xir.Props{"name": fmt.Sprintf("n%d", i)})
		a.Link(s0.Endpoint(), n.Endpoint())
		a.Link(s1.Endpoint(), n.Endpoint())
	}

	viz.NetSvg("muffin", a)

}
