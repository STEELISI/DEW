package main

import (
	"log"

	"github.com/spf13/cobra"
	"gitlab.com/mergetb/xir/lang/go/v0.1"
)

func main() {

	log.SetFlags(0)

	root := &cobra.Command{
		Use:   "xir",
		Short: "a command line utility for working with xir",
	}

	rootCmds(root)

	node := &cobra.Command{
		Use:   "node",
		Short: "interact with nodes",
	}
	root.AddCommand(node)

	nodeCmds(node)

	root.Execute()

}

func rootCmds(root *cobra.Command) {

	show := &cobra.Command{
		Use:   "show <xir>",
		Short: "show a simple representation of a network",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {

			x := load(args[0])
			log.Println(x.String())

		},
	}
	root.AddCommand(show)

}

func nodeCmds(root *cobra.Command) {

	show := &cobra.Command{
		Use:   "show <id> <xir>",
		Short: "show a node's info",
		Args:  cobra.ExactArgs(2),
		Run: func(cmd *cobra.Command, args []string) {

			x := load(args[1])
			_, _, n := x.GetNode(args[0])
			if n != nil {
				log.Print(n.Yaml())
			}

		},
	}
	root.AddCommand(show)

}

func load(filename string) *xir.Net {
	x, err := xir.FromFile(filename)
	if err != nil {
		log.Fatal(err)
	}
	return x
}
