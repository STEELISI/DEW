package build

import (
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"
	"text/tabwriter"

	"github.com/dustin/go-humanize"
	"github.com/spf13/cobra"
	"gitlab.com/mergetb/portal/services/pkg/realize/sfe"
	"gitlab.com/mergetb/xir/v0.3/go"
)

var tw = tabwriter.NewWriter(os.Stdout, 0, 0, 4, ' ', 0)

func Run(fa *xir.Facility) {

	log.SetFlags(0)

	root := &cobra.Command{
		Use:   fa.Id,
		Short: "Testbed CAD utility",
	}

	cobra.EnablePrefixMatching = true

	save := &cobra.Command{
		Use:   "save",
		Short: "Save the testbed model to XIR",
		Args:  cobra.NoArgs,
		Run:   func(cmd *cobra.Command, args []string) { save(fa) },
	}
	root.AddCommand(save)

	list := &cobra.Command{
		Use:   "list",
		Short: "List items in the model",
		Args:  cobra.NoArgs,
	}
	root.AddCommand(list)

	listNodes := &cobra.Command{
		Use:   "nodes",
		Short: "List nodes",
		Args:  cobra.NoArgs,
		Run:   func(cmd *cobra.Command, args []string) { listNodes(fa) },
	}
	list.AddCommand(listNodes)

	listSwitches := &cobra.Command{
		Use:   "switches",
		Short: "List switches",
		Args:  cobra.NoArgs,
		Run:   func(cmd *cobra.Command, args []string) { listSwitches(fa) }}
	list.AddCommand(listSwitches)

	listNeighbors := &cobra.Command{
		Use:   "neighbors",
		Short: "List a resource's neighbors",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			listNeighbors(fa, args[0])
		},
	}
	list.AddCommand(listNeighbors)

	spec := &cobra.Command{
		Use:   "spec",
		Short: "Generate specs",
	}
	root.AddCommand(spec)

	cablingSpec := &cobra.Command{
		Use:   "cabling",
		Short: "Generate a cabling spec",
		Args:  cobra.NoArgs,
		Run:   func(*cobra.Command, []string) { cablingSpec(fa) },
	}
	spec.AddCommand(cablingSpec)

	graphologySpec := &cobra.Command{
		Use:   "graphology",
		Short: "Generate a graphology spec",
		Args:  cobra.NoArgs,
		Run:   func(*cobra.Command, []string) { saveGraphologySpec(fa) },
	}
	spec.AddCommand(graphologySpec)

	serve := &cobra.Command{
		Use:   "server",
		Short: "Run model server",
		Args:  cobra.NoArgs,
		Run:   func(*cobra.Command, []string) { modelServer(fa) },
	}
	root.AddCommand(serve)

	lom := &cobra.Command{
		Use:   "lom",
		Short: "List of materials",
		Args:  cobra.NoArgs,
		Run:   func(*cobra.Command, []string) { listOfMaterials(fa) },
	}
	root.AddCommand(lom)

	var (
		itpa uint64
		xtpa uint64
	)
	routes := &cobra.Command{
		Use:   "routes",
		Short: "Show testbed routing table",
		Args:  cobra.NoArgs,
		Run:   func(*cobra.Command, []string) { showRoutes(itpa, xtpa, fa.Lift()) },
	}
	routes.Flags().Uint64VarP(
		&itpa,
		"infranet-tpa",
		"i",
		0x004D000000000000,
		"Infranet base TPA Address",
	)
	routes.Flags().Uint64VarP(
		&xtpa,
		"xpnet-tpa",
		"x",
		0x004E000000000000,
		"Experiment network base TPA Address",
	)
	root.AddCommand(routes)

	root.Execute()

}

func showRoutes(itpa, xtpa uint64, tbx *xir.Topology) {

	lm, nm := sfe.AssignAddrsXpNet(sfe.TPA(xtpa), tbx)
	fmt.Println("XPNET")
	fmt.Println("=====")
	fmt.Println("SWITCH")
	for k, v := range lm {
		fmt.Printf("%4s: %s\n", k.Id(), v)
	}

	fmt.Println("NODE")
	for k, v := range nm {
		fmt.Printf("%4s.%d: %s\n", k.Device.Id(), k.Ref().Index, v)
	}

	ilm, inm := sfe.AssignAddrsInfraNet(sfe.TPA(itpa), tbx)
	fmt.Println("INFRANET")
	fmt.Println("========")
	fmt.Println("SWITCH")
	for k, v := range ilm {
		fmt.Printf("%4s: %s\n", k.Id(), v)
	}

	fmt.Println("NODE")
	for k, v := range inm {
		fmt.Printf("%4s.%d: %s\n", k.Device.Id(), k.Ref().Index, v)
	}

	xrt := sfe.BuildXpRoutingTable(tbx)

	fmt.Println("XP ROUTES")
	fmt.Println("=========")
	for node, routes := range xrt {

		if false && !strings.HasPrefix(node, "xf") {
			continue
		}
		fmt.Println(node)
		for _, route := range routes {
			fmt.Printf("%s\n", route)
		}
	}

	irt := sfe.BuildInfraRoutingTable(tbx)

	fmt.Println("")
	fmt.Println("INFRA ROUTES")
	fmt.Println("============")
	for node, routes := range irt {

		if false && !strings.HasPrefix(node, "if") {
			continue
		}
		fmt.Println(node)
		for _, route := range routes {
			fmt.Printf("%s\n", route)
		}
	}

}

func save(fa *xir.Facility) {

	buf, err := fa.ToBuf()
	if err != nil {
		log.Fatal(err)
	}

	out := base64.StdEncoding.EncodeToString(buf)

	err = ioutil.WriteFile(fmt.Sprintf("%s.xir", fa.Id), []byte(out), 0644)
	if err != nil {
		log.Fatal(err)
	}

}

func listNodes(fa *xir.Facility) {

	fmt.Fprintf(tw, "ID\tCORES\tMEMORY\tSTORAGE\tXPNET\tINFRANET\tALLOC\n")

	count := 0
	for _, r := range fa.Resources {

		if !r.HasRole(xir.Role_TbNode) {
			continue
		}

		var alloc []string
		for _, x := range r.Alloc {
			alloc = append(alloc, x.String())
		}

		fmt.Fprintf(tw, "%s\t%d\t%s\t%s\t%s\t%s\t%s\n",
			r.Id,
			r.Cores(),
			humanize.IBytes(r.Mem()),
			humanize.IBytes(r.Storage()),
			humanize.SI(float64(r.XpBandwidth()), "bps"),
			humanize.SI(float64(r.InfraBandwidth()), "bps"),
			strings.Join(alloc, " "),
		)
		count++

	}
	tw.Flush()
	log.Printf("---------")
	log.Printf("COUNT: %d", count)

}

func listSwitches(fa *xir.Facility) {

	fmt.Fprintf(tw, "ID\tSWPS\tBANDWIDTH\tROLE\n")

	count := 0
	for _, r := range fa.Resources {

		if !r.HasRole(
			xir.Role_Gateway,
			xir.Role_InfraSwitch,
			xir.Role_XpSwitch,
			xir.Role_MgmtSwitch,
		) {
			continue
		}

		var role []string
		for _, x := range r.Roles {
			role = append(role, x.String())
		}

		fmt.Fprintf(tw, "%s\t%d\t%s\t%s\n",
			r.Id,
			len(r.Swps()),
			humanize.SI(float64(r.SwpBandwidth()), "bps"),
			strings.Join(role, " "),
		)

		count++

	}
	tw.Flush()
	log.Printf("---------")
	log.Printf("COUNT: %d", count)

}

func listNeighbors(fa *xir.Facility, id string) {

	topo := fa.Lift()

	d := topo.Device(id)
	if d == nil {
		log.Fatalf("resource %s not found", id)
	}

	_listNeighbors(d, "", false)
}

func _listNeighbors(d *xir.Device, indent string, showCable bool) {

	for _, ifx := range d.Interfaces {
		if ifx.Edge == nil || ifx.Edge.Connection == nil {
			continue
		}
		c0 := ifx.Edge.Connector()
		for _, e := range ifx.Edge.Connection.Edges {

			if e == ifx.Edge {
				continue
			}
			c1 := e.Connector()
			if c0.Index > 0 && c1.Index > 0 {
				// both edges part of a breakout
				continue
			}
			if e.Interface == nil || e.Interface.Device == nil {
				continue
			}
			if e.Interface.Device == d {
				continue
			}

			cable := ""
			if showCable {
				pi := ifx.Edge.Connection.Cable().ProductInfo
				if pi != nil && pi.Model != "" {
					cable = " (" + pi.Model + " " + pi.SKU + ")"
				}
			}

			log.Printf("%s%s: %s.%s%s",
				indent,
				ifx.PortName(),
				e.Interface.Device.Id(),
				e.Interface.PortName(),
				cable,
			)

		}
	}

}
