package main

import (
	"log"
	"os"
	"os/exec"

	xir1 "gitlab.com/mergetb/xir/lang/go/v0.1"
	xir2 "gitlab.com/mergetb/xir/lang/go/v0.2"
)

func main() {
	log.SetFlags(0)

	if len(os.Args) != 2 {
		log.Fatal("usage: migrate <legacy-xir.json>")
	}
	src := os.Args[1]

	x1, err := xir1.FromFile(src)
	if err != nil {
		log.Fatal("could not read legacy xir: %v", err)
	}

	exec.Command("cp", src, src+".orig").Run()

	x2 := migrate(x1)

	xir2.ToFile(x2, src)

}

func migrate(x1 *xir1.Net) *xir2.Net {

	x2 := xir2.NewNet(x1.Id)
	x2.Props = v2p(x1.Props)

	for _, n := range x1.AllNodes() {

		x2.AddNode(&xir2.Node{
			Id:    n.Id,
			Props: v2p(n.Props),
		})

	}

	for _, l := range x1.Links {
		for i, e := range l.Endpoints {
			_, _, a := x2.GetNode(e.Parent.Label())
			if a == nil {
				log.Fatalf("node %s not found", a.Parent.Label())
			}
			for _, f := range l.Endpoints[i:] {

				if e == f {
					continue
				}

				_, _, b := x2.GetNode(f.Parent.Label())

				ae := a.Endpoint()
				ae.Props = v2p(e.Props)

				ab := b.Endpoint()
				ab.Props = v2p(f.Props)

				lab := x2.Link(ae, ab)
				lab.Props = v2p(l.Props)

			}
		}
	}

	return x2

}

func v2p(x xir1.Props) xir2.Props {
	return xir2.Props(map[string]interface{}(x))
}
