package build

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"sort"
	"strconv"
	"strings"
	"text/tabwriter"
	"unicode"

	"github.com/dustin/go-humanize"
	"github.com/fatih/color"
	"github.com/spf13/cobra"
	"gitlab.com/mergetb/xir/lang/go/v0.2"
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
	"gitlab.com/mergetb/xir/lang/go/v0.2/tb"
)

var tw = tabwriter.NewWriter(os.Stdout, 0, 0, 4, ' ', 0)

var (
	blue   = color.New(color.FgBlue).SprintFunc()
	black  = color.New(color.FgHiBlack).SprintFunc()
	white  = color.New(color.FgWhite).SprintFunc()
	red    = color.New(color.FgRed).SprintFunc()
	green  = color.New(color.FgGreen).SprintFunc()
	yellow = color.New(color.FgYellow).SprintFunc()
)

func Run(net *xir.Net) {

	log.SetFlags(0)

	root := &cobra.Command{
		Use:   net.Label(),
		Short: "Testbed build utility",
	}

	cobra.EnablePrefixMatching = true

	var stdout bool
	save := &cobra.Command{
		Use:   "save",
		Short: "save the testbed model to XIR",
		Args:  cobra.NoArgs,
		Run: func(cmd *cobra.Command, args []string) {

			if stdout {
				s, err := net.ToString()
				if err != nil {
					log.Fatal(err)
				}
				fmt.Println(s)
			}
			err := net.ToFile(fmt.Sprintf("%s.json", net.Label()))
			if err != nil {
				log.Fatal(err)
			}

		},
	}
	save.Flags().BoolVarP(&stdout, "stdout", "s", false, "Write to stdout")
	root.AddCommand(save)

	var purchaseOrder string
	cost := &cobra.Command{
		Use:   "cost",
		Short: "Calculate testbed cost",
		Args:  cobra.NoArgs,
		Run: func(cmd *cobra.Command, args []string) {

			if purchaseOrder != "" {
				applyPO(net, purchaseOrder)
			}

			tb.CalculateCost(net).Print()

		},
	}
	cost.Flags().StringVarP(
		&purchaseOrder, "po", "p", "", "Apply previous purchase order")
	root.AddCommand(cost)

	po := &cobra.Command{
		Use:   "po",
		Short: "Emit purchase order data",
		Args:  cobra.NoArgs,
		Run: func(cmd *cobra.Command, args []string) {

			emitPO(net)

		},
	}
	root.AddCommand(po)

	lom := &cobra.Command{
		Use:   "lom",
		Short: "Calculate testbed bill of materials",
		Args:  cobra.NoArgs,
		Run: func(cmd *cobra.Command, args []string) {

			tb.CalculateLOM(net).Print()

		},
	}
	root.AddCommand(lom)

	describe := &cobra.Command{
		Use:   "describe",
		Short: "Describe a node",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {

			_, _, node := net.GetNode(args[0])
			if node == nil {
				log.Fatal("node not found")
			}

			resource := tb.DecodeResource(node.Props)
			if resource == nil {
				log.Fatal("resource not found")
			}

			showDeviceSpec(resource.System.Device)

		},
	}
	root.AddCommand(describe)

	neighbors := &cobra.Command{
		Use:   "neighbors",
		Short: "list a nodes neighbors",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {

			_, _, node := net.GetNode(args[0])
			if node == nil {
				log.Fatal("node not found")
			}

			fmt.Fprintf(tw, "INTERFACE\tNEIGHBOR\n")
			for _, e := range node.Endpoints {
				for _, n := range e.Neighbors {
					fmt.Fprintf(tw, "%s\t%s.%s\n", e.Label(), n.Endpoint.Parent.Label(), n.Endpoint.Label())
				}
			}
			tw.Flush()

		},
	}
	root.AddCommand(neighbors)

	nodes := &cobra.Command{
		Use:   "nodes",
		Short: "List nodes",
		Args:  cobra.NoArgs,
		Run:   func(*cobra.Command, []string) { nodes(net) },
	}
	root.AddCommand(nodes)

	bgp := &cobra.Command{
		Use:   "bgp",
		Short: "Show BGP configuration",
		Args:  cobra.NoArgs,
		Run:   func(*cobra.Command, []string) { bgp(net) },
	}
	root.AddCommand(bgp)

	power := &cobra.Command{
		Use:   "power",
		Short: "Calculate power consumption report",
		Args:  cobra.NoArgs,
		Run:   func(*cobra.Command, []string) { power(net) },
	}
	root.AddCommand(power)

	root.Execute()

}

func showDeviceSpec(d *hw.Device) {

	s := hw.NewSpec(d)
	log.Printf(green("%s %s\n"), s.Base.Manufacturer, s.Base.Model)

	// procs

	log.Println(blue("PROCS:"))
	hw.ProcHeader(tw)
	for _, x := range s.Procs {
		x.Spec.Table(x.Count, tw)
	}
	tw.Flush()
	log.Printf("\nCores: %d", s.CoreCount())
	log.Println("")

	// memory

	log.Println(blue("MEMORY:"))
	hw.DimmHeader(tw)
	for _, x := range s.Memory {
		x.Spec.Table(x.Count, tw)
	}
	tw.Flush()
	log.Printf("\nCapacity: %s", humanize.IBytes(s.MemoryCapacity()))
	log.Println("")

	// NICs

	log.Println(blue("NICS:"))
	hw.NicHeader(tw)
	for _, x := range s.Nics {
		x.Spec.Table(x.Count, tw)
	}
	tw.Flush()
	log.Printf("\nBandwidth: %s", strings.ToLower(humanize.SI(float64(s.Bandwidth()), "bps")))
	log.Println("")

	log.Println(blue("DISKS:"))
	hw.DiskHeader(tw)
	for _, x := range s.Disks {
		x.Spec.Table(x.Count, tw)
	}
	tw.Flush()
	log.Printf("\nCapacity: %s", humanize.IBytes(s.DiskCapacity()))
	log.Println("")

}

func invParse(s string) (string, int) {
	rs := []rune(s)
	x := len(rs)
	for i := len(rs) - 1; i >= 0; i-- {
		if !unicode.IsNumber(rs[i]) {
			break
		}
		x--
	}

	v, _ := strconv.Atoi(s[x:])
	return s[:x], v
}

func InvSort(a, b string) bool {

	ap, ai := invParse(a)
	bp, bi := invParse(b)

	if ap == bp {
		return ai < bi
	}

	return ap <= bp

}

func nodes(_net *xir.Net) {

	s, _ := _net.ToString()
	net, _ := xir.FromString(s)

	var infrapods, stors, emus, fabrics, leafs, consoles, tbnodes []*xir.Node

	all := net.AllNodes()

	sort.Slice(all, func(i, j int) bool { return InvSort(all[i].Label(), all[j].Label()) })

	for _, x := range all {

		if tb.HasRole(x, tb.InfrapodServer) {
			infrapods = append(infrapods, x)
		}

		if tb.HasRole(x, tb.StorageServer) {
			stors = append(stors, x)
		}

		if tb.HasRole(x, tb.NetworkEmulator) {
			emus = append(emus, x)
		}

		if tb.HasRole(x, tb.Fabric) {
			fabrics = append(fabrics, x)
		}

		if tb.HasRole(x, tb.Leaf) {
			leafs = append(leafs, x)
		}

		if tb.HasRole(x, tb.ConsoleServer) {
			consoles = append(consoles, x)
		}

		if tb.HasRole(x, tb.Node) {
			tbnodes = append(tbnodes, x)
		}

	}

	log.Println(blue("INFRAPODS"))
	for _, x := range infrapods {
		log.Println(x.Label())
	}

	log.Println(blue("STORAGE NODES"))
	for _, x := range stors {
		log.Println(x.Label())
	}

	log.Println(blue("NETWORK EMULATORS"))
	for _, x := range emus {
		log.Println(x.Label())
	}

	log.Println(blue("FABRIC SWITCHES"))
	for _, x := range fabrics {
		log.Println(x.Label())
	}

	log.Println(blue("LEAF SWITCHES"))
	for _, x := range leafs {
		log.Println(x.Label())
	}

	log.Println(blue("CONSOLE SERVERS"))
	for _, x := range consoles {
		log.Println(x.Label())
	}

	log.Println(blue("NODES"))
	for _, x := range tbnodes {
		log.Println(x.Label())
	}

}

func bgp(net *xir.Net) {

	fmt.Fprintf(tw, "NODE\tTUNNEL IP\tASN\n")

	for _, x := range net.AllNodes() {

		rs := tb.GetResourceSpec(x)
		if rs == nil {
			continue
		}
		if rs.System == nil {
			continue
		}
		if rs.System.OS == nil {
			continue
		}
		if rs.System.OS.Config == nil {
			continue
		}
		if rs.System.OS.Config.Evpn == nil {
			continue
		}

		fmt.Fprintf(tw, "%s\t%s\t%d\n", x.Label(),
			rs.System.OS.Config.Evpn.TunnelIP,
			rs.System.OS.Config.Evpn.ASN,
		)

	}

	tw.Flush()

}

func power(net *xir.Net) {

	fmt.Fprintf(tw, "COMPONENT\tNAMEPLATE\n")

	nameplateTotal := 0

	for _, x := range net.AllNodes() {

		rs := tb.GetResourceSpec(x)
		if rs == nil {
			continue
		}
		if rs.System == nil {
			continue
		}
		if rs.System.Device == nil {
			continue
		}

		nameplate := 0
		if len(rs.System.Device.PSUs) > 0 {
			nameplate = rs.System.Device.PSUs[0].PowerRatingWatts
			nameplateTotal += nameplate
		}

		fmt.Fprintf(tw, "%s\t%d\n", x.Label(), nameplate)

	}
	fmt.Fprintf(tw, "=========\t=========\n")
	fmt.Fprintf(tw, "\t%d\n", nameplateTotal)

	tw.Flush()
}

type PO struct {
	Nodes []POItem
	Links []POItem
}

type POItem struct {
	SKU  string
	TBID string
}

func emitPO(net *xir.Net) {

	var po PO

	for _, x := range net.AllNodes() {

		r := tb.GetResourceSpec(x)
		if r == nil {
			continue
		}

		dev := r.System.Device

		if dev.Cost == 0 {
			continue
		}

		po.Nodes = append(po.Nodes, POItem{
			SKU:  dev.SKU,
			TBID: x.Label(),
		})

	}

	for _, x := range net.AllLinks() {

		c := tb.GetCableSpec(x)
		if c == nil || c.Cost == 0 {
			continue
		}

		po.Links = append(po.Links, POItem{
			SKU:  c.SKU,
			TBID: x.Id,
		})

	}

	out, err := json.MarshalIndent(po, "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	err = ioutil.WriteFile(net.Label()+"_po.json", out, 0644)
	if err != nil {
		log.Fatal(err)
	}

}

func applyPO(net *xir.Net, poFile string) {

	in, err := ioutil.ReadFile(poFile)
	if err != nil {
		log.Fatal(err)
	}

	var po PO
	err = json.Unmarshal(in, &po)
	if err != nil {
		log.Fatal(err)
	}

	for _, x := range po.Nodes {

		_, _, n := net.GetNode(x.TBID)
		if n == nil {
			log.Printf("node not found: %s", x.TBID)
			continue
		}

		//TODO gross ..... round trip from GetResourceSpec will not work
		r := n.Props["resource"].(*tb.Resource)
		r.System.Device.Cost = 0

	}

	for _, x := range po.Links {

		_, _, l := net.GetLink(x.TBID)
		if l == nil {
			log.Printf("link not found: %s", x.TBID)
			continue
		}

		//TODO gross .....
		c := l.Props["cable"].(*hw.Cable)
		c.Cost = 0

	}

}
