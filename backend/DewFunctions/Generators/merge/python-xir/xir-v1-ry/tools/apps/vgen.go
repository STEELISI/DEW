/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'''''''''''''
 * vgen - visualization generator
 * ==============================
 *		This program renders an svg image of a xir json file
 *
 *  Copyright ceftb 2018 - All Rights Reserved
 *  Apache 2.0 License
 *=================-----------------------------------------................```*/

package main

import (
	"flag"
	xir "gitlab.com/mergetb/xir/lang/go"
	"gitlab.com/mergetb/xir/tools/viz"
	"log"
	"os"
	"path"
	"runtime/pprof"
	"strings"
)

func main() {

	var filename string
	flag.StringVar(&filename, "file", "", "xir file")

	var perf bool
	flag.BoolVar(&perf, "perf", false, "profile for performance")

	flag.Parse()

	if perf {
		f, err := os.Create("perf")
		if err != nil {
			log.Fatal(err)
		}
		pprof.StartCPUProfile(f)
		defer pprof.StopCPUProfile()
	}

	log.SetFlags(0)

	if filename == "" {
		usage()
	}

	_net, err := xir.FromFile(filename)
	if err != nil {
		log.Fatalf("%v", err)
	}

	//net := &xir.Net{Id: _net.Id, Props: _net.Props}
	//Flatten(_net, net)

	err = viz.NetSvg(path.Base(strings.Replace(filename, ".json", "", 1)), _net)
	if err != nil {
		log.Fatalf("%v", err)
	}

}

func usage() {
	log.Fatal("usage: vgen -file <xir.json>")
}

func Flatten(src, dest *xir.Net) {

	for _, x := range src.Nodes {
		dest.Nodes = append(dest.Nodes, x)
	}
	for _, x := range src.Links {
		dest.Links = append(dest.Links, x)
	}

	for _, x := range src.Nets {
		Flatten(x, dest)
	}

}
