package main

import (
	xir "gitlab.com/mergetb/xir/lang/go"
	"gitlab.com/mergetb/xir/tools/toucan"
	"log"
	"os"
	"strings"
)

func main() {
	log.SetFlags(0)

	if len(os.Args) < 2 {
		usage()
	}

	net, err := xir.FromFile(os.Args[1])
	if err != nil {
		log.Fatalf("error: %v", err)
	}

	filename := strings.Split(os.Args[1], ".")[0] + ".png"

	toucan.Render(net, filename)

}

func usage() {
	log.Fatal("usage: toucan xir.json")
}
