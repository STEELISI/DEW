package main

import (
	"net"

	"gitlab.com/mergetb/xir/lang/go"
	"gitlab.com/mergetb/xir/lang/go/hw"
	"gitlab.com/mergetb/xir/lang/go/tb"
)

type DComp struct {
	// Emulation Servers
	Emu []*tb.Resource

	// Storage Servers
	Stor []*tb.Resource

	// Out of band management switches
	Mgmt []*tb.Resource

	// Experiment network spine
	XSpine *tb.Resource

	// Experiment Network fabric
	XFabric []*tb.Resource

	// Infrastructure network spine
	ISpine *tb.Resource

	// Infrastructure network switches
	IFabric []*tb.Resource

	// District subnetworks
	District []*District

	// IP address counters
	MgIP   Ip
	MvrfIP Ip
	IBgpIP Ip
	XBgpIP Ip
	MoaIP  Ip

	// Cables
	Cables []*hw.Cable
}

type District struct {
	// District number
	Index int

	// Parent topology
	Parent *DComp

	// Minnowchassis subnetwork
	Mc []*Chassis

	// RCC-VE nodes
	RccVe []*tb.Resource

	// Infrastructure leaves
	ILeaf []*tb.Resource

	// Experiment leaves
	XLeaf []*tb.Resource

	// Console servers
	Cs []*tb.Resource

	// Cables
	Cables []*hw.Cable
}

type Chassis struct {
	// Chassis index
	Index int

	// Parent district
	Parent *District

	// MinnowBoard nodes
	Minnow []*tb.Resource

	// Chassis power controller
	XPort *tb.Resource
}

const (
	NumEmu              = 5
	NumStor             = 4
	NumMgmt             = 4
	NumIFabric          = 4
	NumXFabric          = 5
	NumILeafPerIFabric  = 8
	NumXLeafPerXFabric  = 7
	NumILeafPerDistrict = 6
	NumXLeafPerDistrict = 7
	NumMinnowPerLeaf    = 48
	NumRccVePerLeaf     = 48
	MgmtRadix           = 48
	NumDistrict         = 5
	ChassisSize         = 24
)

func DCompTB() *DComp {

	d := &DComp{
		MgIP:   Ip{net.IPv4(172, 22, 0, 0)},
		MvrfIP: Ip{net.IPv4(172, 22, 1, 0)},
		MoaIP:  Ip{net.IPv4(172, 22, 5, 0)},
		IBgpIP: Ip{net.IPv4(10, 99, 0, 0)},
		XBgpIP: Ip{net.IPv4(10, 99, 1, 0)},
	}

	for i := 0; i < NumEmu; i++ {
		d.NewEmu()
	}

	for i := 0; i < NumStor; i++ {
		d.NewStor()
	}

	for i := 0; i < NumMgmt; i++ {
		d.NewMgmt()
	}

	d.NewISpine()
	d.NewXSpine()

	for i := 0; i < NumIFabric; i++ {
		d.NewIFabric()
	}

	for i := 0; i < NumXFabric; i++ {
		d.NewXFabric()
	}

	for i := 0; i < NumDistrict; i++ {
		d.NewDistrict()
	}

	d.Connect()

	return d

}

func (d *DComp) Connect() {

	d.ConnectIFabrics()
	d.ConnectXFabrics()
	d.ConnectILeaves()
	d.ConnectXLeaves()

	for _, di := range d.District {
		di.ConnectMinnows()
		di.ConnectRccVes()
	}

	d.ConnectMgmt()

}

func (d *DComp) Net() *xir.Net {

	net := xir.NewNet()

	net.AddNode(d.ISpine.Node())
	net.AddNode(d.XSpine.Node())

	for _, x := range d.IFabric {
		net.AddNode(x.Node())
	}

	for _, x := range d.XFabric {
		net.AddNode(x.Node())
	}

	for _, x := range d.District {
		net.AddNet(x.Net())
	}

	for _, x := range d.Cables {
		net.AddLink(x.Link())
	}

	return net

}

func (d *District) Net() *xir.Net {

	net := xir.NewNet()

	for _, x := range d.RccVe {
		net.AddNode(x.Node())
	}

	for _, x := range d.ILeaf {
		net.AddNode(x.Node())
	}

	for _, x := range d.XLeaf {
		net.AddNode(x.Node())
	}

	for _, x := range d.Cs {
		net.AddNode(x.Node())
	}

	for _, mc := range d.Mc {
		net.AddNet(mc.Net())
	}

	for _, x := range d.Cables {
		net.AddLink(x.Link())
	}

	return net

}

func (c *Chassis) Net() *xir.Net {

	net := xir.NewNet()

	net.AddNode(c.XPort.Node())

	for _, x := range c.Minnow {
		net.AddNode(x.Node())
	}

	return net

}
