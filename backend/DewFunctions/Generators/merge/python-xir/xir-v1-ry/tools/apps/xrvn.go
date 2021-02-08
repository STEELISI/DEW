package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"os"

	"github.com/mergetb/yaml/v3"

	xir "gitlab.com/mergetb/xir/lang/go/v0.1"
	"gitlab.com/mergetb/xir/tools/xrvn"
)

var config xrvn.Config

func main() {

	// handle args
	log.SetFlags(0)
	if len(os.Args) < 2 {
		usage()
	}
	loadConfig()

	// read xir topo
	net, err := xir.FromFile(os.Args[1])
	if err != nil {
		log.Fatalf("error: %v", err)
	}

	// generate rvn topo
	topo := xir2rvn(net)

	// write rvn topo
	buf, err := json.MarshalIndent(topo, "", "  ")
	if err != nil {
		log.Fatal("error: %v", err)
	}
	text := fmt.Sprintf("topo = %s", string(buf))
	ioutil.WriteFile(
		"model.js",
		[]byte(text),
		0644,
	)

}

func xir2rvn(net *xir.Net) *xrvn.Topo {
	topo := xrvn.NewTopo()
	topo.Name = net.Label()
	rnet(net, topo)
	return topo
}

func rnet(net *xir.Net, topo *xrvn.Topo) {

	for _, n := range net.Nodes {
		rnode(n, topo)
	}

	for _, l := range net.Links {
		rlink(l, topo)
	}

	for _, n := range net.Nets {
		rnet(n, topo)
	}

}

func rnode(node *xir.Node, topo *xrvn.Topo) {
	// create base node
	x := xrvn.Node{
		Name: node.Label(),
		OS:   "linux",
	}

	// fill in parameters as available
	img, ok := node.Props.GetString("image")
	if ok {
		x.Image = img
	}

	emulator, ok := node.Props.GetString("emulator")
	if ok {
		x.Emulator = emulator
	}

	ebpf, ok := node.Props.GetString("ebpf")
	if ok && ebpf == "yes" {
		x.Ebpf = true
	}

	cpu, ok := node.Props.GetArray("cpu")
	if ok {
		core_count := 0
		for _, x := range cpu {
			c, ok := x.GetNumber("cores")
			if ok {
				core_count += int(c)
			}
		}
		if core_count > 0 {
			x.CPU = &xrvn.CPU{
				Cores: int(math.Min(float64(core_count), float64(config.MaxCore))),
			}
		}
	}

	memory, ok := node.Props.GetArray("memory")
	if ok {
		capacity := 0.0
		for _, dimm := range memory {
			cap, ok := dimm.GetNumber("capacity")
			if ok {
				capacity += cap
			}
		}
		x.Memory = &xrvn.Memory{
			Capacity: xrvn.Unit{
				Value: int(math.Min(capacity, float64(config.MaxMemory))),
				Unit:  "B",
			},
		}

	}

	mounts, ok := node.Props.GetArray("mounts")
	if ok {
		for _, mount := range mounts {
			var source, point string
			source, ok = mount.GetString("source")
			if ok {
				point, ok = mount.GetString("point")
				if ok {
					x.Mounts = append(x.Mounts, xrvn.Mount{
						Source: source,
						Point:  point,
					})
				}
			}
		}
	}

	topo.Nodes = append(topo.Nodes, x)
}

func rlink(link *xir.Link, topo *xrvn.Topo) {
	a := link.Endpoints[0].Endpoint.Parent.Label()
	b := link.Endpoints[1].Endpoint.Parent.Label()
	pa := topo.NextPort(a)
	pb := topo.NextPort(b)
	topo.Links = append(topo.Links, xrvn.Link{
		Name: fmt.Sprintf("%s_%d-%s_%d", a, pa, b, pb),
		Endpoints: [2]xrvn.Endpoint{
			xrvn.Endpoint{Name: a, Port: pa},
			xrvn.Endpoint{Name: b, Port: pb},
		},
	})

}

func loadConfig() {

	// set defaults
	config.MaxMemory = 128000000000
	config.MaxCore = 64

	buf, err := ioutil.ReadFile(".xrvn.yml")
	if err != nil {
		return
	}
	err = yaml.Unmarshal(buf, &config)
	if err != nil {
		log.Printf("failed to parse config")
		return
	}
}

func usage() {
	log.Fatal("usage: xrvn xir.json")
}
