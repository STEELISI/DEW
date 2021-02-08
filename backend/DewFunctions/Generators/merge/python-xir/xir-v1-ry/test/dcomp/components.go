package main

import (
	"fmt"
	"gitlab.com/mergetb/xir/lang/go"
	"gitlab.com/mergetb/xir/lang/go/hw"
	"gitlab.com/mergetb/xir/lang/go/sys"
	"gitlab.com/mergetb/xir/lang/go/tb"
)

func (d *DComp) NewEmu() *tb.Resource {

	system := sys.NewSystem(
		fmt.Sprintf("emu%d", len(d.Emu)),
		Moa1000(),
	)
	system.OS.Link(sys.Gbps(1))[0].AddAddr(d.MoaIP.Next().IP())

	resource := &tb.Resource{
		System: system,
		Alloc:  []tb.AllocMode{tb.NetEmuAlloc},
		Roles:  []tb.Role{tb.NetworkEmulator},
	}

	d.Emu = append(d.Emu, resource)
	return resource

}

func (d *DComp) NewStor() *tb.Resource {

	system := sys.NewSystem(
		fmt.Sprintf("stor%d", len(d.Stor)),
		RSled1000(),
	)
	system.OS.Link(sys.Gbps(1))[0].AddAddr(d.MgIP.Next().IP())

	resource := &tb.Resource{
		System: system,
		Alloc: []tb.AllocMode{
			tb.FilesystemAlloc,
			tb.BlockDeviceAlloc,
		},
		Roles: []tb.Role{tb.InfraServer},
	}

	d.Stor = append(d.Stor, resource)
	return resource

}

func (d *DComp) NewMgmt() *tb.Resource {

	system := sys.NewSystem(
		fmt.Sprintf("mg%d", len(d.Mgmt)),
		QuantaLYR4(),
	)
	system.OS.Link(sys.Gbps(1))[0].AddAddr(d.MgIP.Next().IP())

	resource := &tb.Resource{
		System: system,
		Alloc:  []tb.AllocMode{tb.NoAlloc},
		Roles:  []tb.Role{tb.MgmtSwitch},
	}

	d.Mgmt = append(d.Mgmt, resource)
	return resource

}

func (d *DComp) NewISpine() *tb.Resource {

	system := sys.NewSystem("isp0", Msn2100())
	system.OS.Link(sys.Gbps(1))[0].AddAddr(d.MvrfIP.Next().IP())
	system.OS.Link(sys.Lo())[0].AddAddr(d.IBgpIP.Next().IP())

	resource := &tb.Resource{
		System: system,
		Alloc:  []tb.AllocMode{tb.NetAlloc},
		Roles: []tb.Role{
			tb.InfraSwitch,
			tb.Spine,
		},
	}

	d.ISpine = resource
	return resource

}

func (d *DComp) NewXSpine() *tb.Resource {

	system := sys.NewSystem("xsp0", Msn2700())
	system.OS.Link(sys.Gbps(1))[0].AddAddr(d.MvrfIP.Next().IP())
	system.OS.Link(sys.Lo())[0].AddAddr(d.XBgpIP.Next().IP())

	resource := &tb.Resource{
		System: system,
		Alloc:  []tb.AllocMode{tb.NetAlloc},
		Roles: []tb.Role{
			tb.XpSwitch,
			tb.Spine,
		},
	}

	d.XSpine = resource
	return resource

}

func (d *DComp) NewIFabric() *tb.Resource {

	system := sys.NewSystem(
		fmt.Sprintf("if%d", len(d.IFabric)),
		Msn2100(),
	)
	system.OS.Link(sys.Lo())[0].AddAddr(d.IBgpIP.Next().IP())

	resource := &tb.Resource{
		System: system,
		Alloc:  []tb.AllocMode{tb.NetAlloc},
		Roles: []tb.Role{
			tb.InfraSwitch,
			tb.Fabric,
		},
	}

	d.IFabric = append(d.IFabric, resource)
	return resource

}

func (d *DComp) NewXFabric() *tb.Resource {

	system := sys.NewSystem(
		fmt.Sprintf("xf%d", len(d.XFabric)),
		Msn2100(),
	)
	system.OS.Link(sys.Lo())[0].AddAddr(d.XBgpIP.Next().IP())

	resource := &tb.Resource{
		System: system,
		Alloc:  []tb.AllocMode{tb.NetAlloc},
		Roles: []tb.Role{
			tb.XpSwitch,
			tb.Fabric,
		},
	}

	d.XFabric = append(d.XFabric, resource)
	return resource

}

const (
	NumDistrictRccVe = 48
	NumDistrictILeaf = 6
	NumDistrictXLeaf = 7
	NumDistrictCS    = 3
	NumDistrictMC    = 10
)

func (d *DComp) NewDistrict() *District {

	district := &District{
		Index:  len(d.District),
		Parent: d,
	}

	for i := 0; i < NumDistrictRccVe; i++ {
		district.NewRccVe()
	}

	for i := 0; i < NumDistrictILeaf; i++ {
		district.NewILeaf()
	}

	for i := 0; i < NumDistrictXLeaf; i++ {
		district.NewXLeaf()
	}

	for i := 0; i < NumDistrictCS; i++ {
		district.NewConsoleServer()
	}

	for i := 0; i < NumDistrictMC; i++ {
		district.NewChassis()
	}

	d.District = append(d.District, district)

	return district

}

func (d *District) NewRccVe() *tb.Resource {

	system := sys.NewSystem(
		fmt.Sprintf("n%d", d.Index*NumDistrictRccVe+len(d.RccVe)),
		RccVe(),
	)

	resource := &tb.Resource{
		System: system,
		Alloc:  []tb.AllocMode{tb.PhysicalAlloc},
		Roles:  []tb.Role{tb.Node},
	}

	d.RccVe = append(d.RccVe, resource)
	return resource

}

func (d *District) NewILeaf() *tb.Resource {

	system := sys.NewSystem(
		fmt.Sprintf("il%d", d.Index*NumDistrictILeaf+len(d.ILeaf)),
		EdgecoreAS4610(),
	)
	system.OS.Link(sys.Gbps(1))[0].AddAddr(d.Parent.MvrfIP.Next().IP())
	bgpip := d.Parent.IBgpIP.Next().IP()
	system.OS.Link(sys.Lo())[0].AddAddr(bgpip)

	resource := &tb.Resource{
		System: system,
		Alloc:  []tb.AllocMode{tb.NetAlloc},
		Roles: []tb.Role{
			tb.InfraSwitch,
			tb.Leaf,
		},
	}

	d.ILeaf = append(d.ILeaf, resource)
	return resource

}

func (d *District) NewXLeaf() *tb.Resource {

	system := sys.NewSystem(
		fmt.Sprintf("xl%d", d.Index*NumDistrictXLeaf+len(d.XLeaf)),
		EdgecoreAS4610(),
	)
	system.OS.Link(sys.Gbps(1))[0].AddAddr(d.Parent.MvrfIP.Next().IP())
	system.OS.Link(sys.Lo())[0].AddAddr(d.Parent.XBgpIP.Next().IP())

	resource := &tb.Resource{
		System: system,
		Alloc:  []tb.AllocMode{tb.NetAlloc},
		Roles: []tb.Role{
			tb.XpSwitch,
			tb.Leaf,
		},
	}

	d.XLeaf = append(d.XLeaf, resource)
	return resource

}

func (d *District) NewConsoleServer() *tb.Resource {

	system := sys.NewSystem(
		fmt.Sprintf("cs%d", d.Index*NumDistrictCS+len(d.Cs)),
		Zpe96(),
	)
	system.OS.Link(sys.Gbps(1))[0].AddAddr(d.Parent.MgIP.Next().IP())

	resource := &tb.Resource{
		System: system,
		Alloc:  []tb.AllocMode{tb.NoAlloc},
		Roles:  []tb.Role{tb.ConsoleServer},
	}

	d.Cs = append(d.Cs, resource)
	return resource

}

func (d *District) NewChassis() *Chassis {

	c := &Chassis{
		Index:  d.Index*NumDistrictMC + len(d.Mc),
		Parent: d,
	}

	c.NewXPort()

	for i := 0; i < NumChassisMinnow; i++ {
		c.NewMinnow()
	}

	d.Mc = append(d.Mc, c)

	return c

}

const (
	NumChassisMinnow = 24
)

func (c *Chassis) NewXPort() *tb.Resource {

	system := sys.NewSystem(
		fmt.Sprintf("mc%d", c.Index),
		XPort(),
	)
	system.OS.Links[0].AddAddr(c.Parent.Parent.MgIP.Next().IP())

	resource := &tb.Resource{
		System: system,
		Alloc:  []tb.AllocMode{tb.NoAlloc},
		Roles:  []tb.Role{tb.PowerController},
	}

	c.XPort = resource
	return resource

}

func (c *Chassis) NewMinnow() *tb.Resource {

	system := sys.NewSystem(
		fmt.Sprintf("m%d", c.Index*NumChassisMinnow+len(c.Minnow)),
		MinnowBoard(),
	)

	resource := &tb.Resource{
		System: system,
		Alloc:  []tb.AllocMode{tb.PhysicalAlloc},
		Roles:  []tb.Role{tb.Node},
	}

	c.Minnow = append(c.Minnow, resource)
	return resource

}

// Connection methods ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func (d *DComp) ConnectIFabrics() {

	p := 0
	for _, f := range d.IFabric {

		for i := 0; i < 3; i++ {
			cable := d.Cable(FsDac100())
			cable.Connectors[0][0].Connect(nics(d.ISpine)[1].Ports[p])
			cable.Connectors[1][0].Connect(nics(f)[1].Ports[13+i])
			p += 1
		}

	}

}

func (d *DComp) ConnectXFabrics() {

	p := 0
	for _, f := range d.XFabric {

		for i := 0; i < 3; i++ {
			cable := d.Cable(FsDac100())
			cable.Connectors[0][0].Connect(nics(d.XSpine)[1].Ports[p])
			cable.Connectors[1][0].Connect(nics(f)[1].Ports[13+i])
			p += 1
		}

	}

}

func (d *DComp) ConnectILeaves() {

	i := 0
	L := NumILeafPerIFabric
	for _, di := range d.District {
		for _, l := range di.ILeaf {

			ports := nics(l)[2].Ports
			cable := d.Cable(FsMpoBreakout40x10())
			cable.Connectors[0][0].Connect(nics(d.IFabric[i/L])[1].Ports[i%L])
			cable.Connectors[1][0].Connect(ports[0])
			cable.Connectors[1][1].Connect(ports[1])
			cable.Connectors[1][2].Connect(ports[2])
			cable.Connectors[1][3].Connect(ports[3])
			i += 1

		}
	}

}

func (d *DComp) ConnectXLeaves() {

	i := 0
	L := NumXLeafPerXFabric
	for _, di := range d.District {
		for _, l := range di.XLeaf {

			ports := nics(l)[2].Ports
			cable := d.Cable(FsMpoBreakout40x10())
			cable.Connectors[0][0].Connect(nics(d.XFabric[i/L])[1].Ports[i%L])
			cable.Connectors[1][0].Connect(ports[0])
			cable.Connectors[1][1].Connect(ports[1])
			cable.Connectors[1][2].Connect(ports[2])
			cable.Connectors[1][3].Connect(ports[3])
			i += 1

		}
	}

}

func (di *District) ConnectMinnows() {

	i := 0
	M := NumMinnowPerLeaf
	for _, mc := range di.Mc {
		for _, m := range mc.Minnow {

			cable := di.Cable(Cat6())
			cable.Connectors[0][0].Connect(nics(di.ILeaf[i/M])[1].Ports[i%M])
			cable.Connectors[1][0].Connect(nics(m)[0].Ports[0])

			cable = di.Cable(Cat6())
			cable.Connectors[0][0].Connect(nics(di.XLeaf[i/M])[1].Ports[i%M])
			cable.Connectors[1][0].Connect(nics(m)[1].Ports[0])

			i += 1

		}
	}

}

func (di *District) ConnectRccVes() {

	i := 0
	for _, rcc := range di.RccVe {

		cable := di.Cable(Cat6())
		cable.Connectors[0][0].Connect(nics(di.ILeaf[5])[1].Ports[i])
		cable.Connectors[1][0].Connect(nics(rcc)[0].Ports[0])

		cable = di.Cable(Cat6())
		cable.Connectors[0][0].Connect(nics(di.XLeaf[5])[1].Ports[i])
		cable.Connectors[1][0].Connect(nics(rcc)[1].Ports[0])

		cable = di.Cable(Cat6())
		cable.Connectors[0][0].Connect(nics(di.XLeaf[6])[1].Ports[i])
		cable.Connectors[1][0].Connect(nics(rcc)[2].Ports[0])

		i += 1

	}

}

func (d *DComp) ConnectMgmt() {

	i := 0
	N := MgmtRadix

	connectMgmt := func(r *tb.Resource) {
		cable := d.Cable(Cat6())

		cable.Connectors[0][0].Connect(nics(r)[0].Ports[0])
		cable.Connectors[1][0].Connect(nics(d.Mgmt[i/N])[1].Ports[i%N])

		i += 1
	}

	connectMgmt(d.ISpine)
	connectMgmt(d.XSpine)

	for _, x := range d.IFabric {
		connectMgmt(x)
	}

	for _, x := range d.XFabric {
		connectMgmt(x)
	}

	for _, di := range d.District {

		for _, x := range di.ILeaf {
			connectMgmt(x)
		}

		for _, x := range di.XLeaf {
			connectMgmt(x)
		}

		for _, x := range di.Cs {
			connectMgmt(x)
		}

	}

}

func (d *DComp) Cable(c *hw.Cable) *hw.Cable {
	d.Cables = append(d.Cables, c)
	return c
}

func (d *District) Cable(c *hw.Cable) *hw.Cable {
	d.Cables = append(d.Cables, c)
	return c
}
