package main

import (
	"testing"

	"gitlab.com/mergetb/xir/lang/go"
	"gitlab.com/mergetb/xir/lang/go/tb"
)

func init() {

	tb := DCompTB()
	net := tb.Net()
	net.ToFile("dcomp-xir.json")

}

func TestRoles(t *testing.T) {

	net, err := xir.FromFile("dcomp-xir.json")
	if err != nil {
		t.Fatal(err)
	}

	_, _, x := net.GetNode("il4")
	if x == nil {
		t.Fatal("il4 not found")
	}

	if !tb.HasRole(x, tb.InfraSwitch) {
		t.Fatal("il4 is not an infra switch")
	}

	if !tb.HasRole(x, tb.Leaf) {
		t.Fatal("il4 is not a leaf")
	}

	if tb.HasRole(x, tb.Spine) {
		t.Fatal("il4 should not be a spine")
	}

}

func TestAllocModes(t *testing.T) {

	net, err := xir.FromFile("dcomp-xir.json")
	if err != nil {
		t.Fatal(err)
	}

	_, _, x := net.GetNode("xl7")
	if x == nil {
		t.Fatal("xl4 not found")
	}

	if !tb.HasAllocMode(x, tb.NetAlloc) {
		t.Fatal("xl4 has no NetAlloc")
	}

	if tb.HasAllocMode(x, tb.PhysicalAlloc) {
		t.Fatal("xl4 should not have PhysicalAlloc mode")
	}

}

func TestNeighbors(t *testing.T) {

	net, err := xir.FromFile("dcomp-xir.json")
	if err != nil {
		t.Fatal(err)
	}

	_, _, x := net.GetNode("m47")
	if x == nil {
		t.Fatal("m47 not found")
	}

	ep, nbr := x.GetNeighbor("il0")
	if nbr == nil {
		t.Fatal("m47 is not neighbors with il0")
	}
	if nbr.Parent.Label() != "il0" {
		t.Fatalf("il0 is not il0, '%s' found", nbr.Parent.Label())
	}
	if ep.Label() != "eth0" {
		t.Fatalf("m47 connected to il1 on unexpected port %s, expected eth0", ep.Label())
	}

	ep, nbr = x.GetNeighbor("il1")
	if nbr != nil {
		t.Fatal("m47 should not be neighbors with il1")
	}
	if ep != nil {
		t.Fatal("m47 should not have an endpoint for il1")
	}

}

/*
func testLeafMapping(t *testing.T) {

	net, err := xir.FromFile("dcomp-xir.json")
	if err != nil {
		t.Fatal(err)
	}

	_, _, x := net.GetNode("m47")
	if x == nil {
		t.Fatal("m47 not found")
	}

	ep := x.GetEndpoint("eth0")
	if ep == nil {
		t.Fatal("m47::eth0 not found")
	}

	leafport := cogs.GetNodeLeaf(ep)
	if leafport == nil {
		t.Fatal("m47::eth0 leafport not found")
	}

	if leafport.Parent.Label() != "il0" {
		t.Fatalf("il0 != %s", leafport.Parent.Label())
	}

}
*/
