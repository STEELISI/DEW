package tb

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
	"gitlab.com/mergetb/xir/lang/go/v0.2/sys"
)

func SmallServer(name, imac, xmac string, ptags ...string) *Resource {

	s := hw.GenericServer(4, hw.Gbps(100))
	s.Procs = []hw.Proc{
		{Cores: 8},
	}
	s.Memory = []hw.Dimm{
		{Capacity: hw.Gb(8)},
		{Capacity: hw.Gb(8)},
		{Capacity: hw.Gb(8)},
		{Capacity: hw.Gb(8)},
	}
	s.Nics[0].Ports[1].Mac = imac
	s.Nics[0].Ports[2].Mac = xmac

	system := sys.NewSystem(name, s)
	system.Props["append"] = "root=UUID=a0000000-0000-0000-0000-00000000000a rootfstype=ext4 rw net.ifnames=0 biosdevname=0"
	system.Props["rootdev"] = "sda"
	system.Props["disk"] = "debian-buster-disk"

	rs := &Resource{
		Alloc:  []AllocMode{PhysicalAlloc},
		Roles:  []Role{Node},
		System: system,
		Ptags:  ptags,
	}

	rs.System.Device.Model = "Small Server"

	return rs

}

func MediumServer(name, imac, xmac string, ptags ...string) *Resource {

	s := hw.GenericServer(4, hw.Gbps(100))
	s.Procs = []hw.Proc{
		{Cores: 8},
		{Cores: 8},
	}
	s.Memory = []hw.Dimm{
		{Capacity: hw.Gb(16)},
		{Capacity: hw.Gb(16)},
		{Capacity: hw.Gb(16)},
		{Capacity: hw.Gb(16)},
		{Capacity: hw.Gb(16)},
		{Capacity: hw.Gb(16)},
		{Capacity: hw.Gb(16)},
		{Capacity: hw.Gb(16)},
	}
	s.Nics[0].Ports[1].Mac = imac
	s.Nics[0].Ports[2].Mac = xmac

	system := sys.NewSystem(name, s)
	system.Props["append"] = "root=UUID=a0000000-0000-0000-0000-00000000000a rootfstype=ext4 rw net.ifnames=0 biosdevname=0"
	system.Props["rootdev"] = "sda"
	system.Props["disk"] = "debian-buster-disk"

	rs := &Resource{
		Alloc:  []AllocMode{PhysicalAlloc},
		Roles:  []Role{Node},
		System: system,
		Ptags:  ptags,
	}

	rs.System.Device.Model = "Medium Server"

	return rs

}

func LargeServer(name, imac, xmac string, ptags ...string) *Resource {

	s := hw.GenericServer(4, hw.Gbps(100))
	s.Procs = []hw.Proc{
		{Cores: 16},
		{Cores: 16},
	}
	s.Memory = []hw.Dimm{
		{Capacity: hw.Gb(32)},
		{Capacity: hw.Gb(32)},
		{Capacity: hw.Gb(32)},
		{Capacity: hw.Gb(32)},
		{Capacity: hw.Gb(32)},
		{Capacity: hw.Gb(32)},
		{Capacity: hw.Gb(32)},
		{Capacity: hw.Gb(32)},
	}
	s.Nics[0].Ports[1].Mac = imac
	s.Nics[0].Ports[2].Mac = xmac

	system := sys.NewSystem(name, s)
	system.Props["append"] = "root=UUID=a0000000-0000-0000-0000-00000000000a rootfstype=ext4 rw net.ifnames=0 biosdevname=0"
	system.Props["rootdev"] = "sda"
	system.Props["disk"] = "debian-buster-disk"

	rs := &Resource{
		Alloc:  []AllocMode{PhysicalAlloc},
		Roles:  []Role{Node},
		System: system,
		Ptags:  ptags,
	}

	rs.System.Device.Model = "Large Server"

	return rs

}

func GenericFabric(kind, role Role, name, ip string, radix int, gbps uint64) *Resource {

	rs := &Resource{
		Alloc:  []AllocMode{NetAlloc},
		Roles:  []Role{kind, role},
		System: sys.NewSystem(name, hw.GenericSwitch(radix, hw.Gbps(gbps))),
	}
	rs.System.OS.Config = &sys.OsConfig{
		Evpn: &sys.EvpnConfig{
			TunnelIP: ip,
		},
		PrimaryBridge: &sys.BridgeConfig{
			Name:      "bridge",
			VlanAware: true,
		},
	}

	rs.System.Device.Model = "Generic Spine Switch"

	if kind == InfraSwitch {
		rs.Alloc = []AllocMode{NoAlloc}
	} else {
		rs.Alloc = []AllocMode{NetAlloc}
	}

	return rs

}

func GenericLeaf(kind Role, name string, radix int, gbps uint64) *Resource {

	rs := &Resource{
		Roles:  []Role{kind, Leaf},
		System: sys.NewSystem(name, hw.GenericSwitch(radix, hw.Gbps(gbps))),
	}

	rs.System.Device.Model = "Generic Leaf Switch"
	rs.System.OS.Config = &sys.OsConfig{
		PrimaryBridge: &sys.BridgeConfig{
			Name:      "bridge",
			VlanAware: true,
		},
	}

	if kind == InfraSwitch {
		rs.Alloc = []AllocMode{NoAlloc}
	} else {
		rs.Alloc = []AllocMode{NetAlloc}
	}

	return rs

}
