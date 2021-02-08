package build

import (
	"gitlab.com/mergetb/xir/v0.3/go"
)

type NICConstructor func() *xir.NIC

func (ctor NICConstructor) Modify(x interface{}) {

	r := x.(*xir.Resource)

	nic := ctor()

	idx := uint32(0)
	for _, n := range r.NICs {
		idx += uint32(len(n.Ports))
	}

	for _, p := range nic.Ports {
		p.Parent = r.Id
		p.Index = idx
		idx++
	}

	r.NICs = append(r.NICs, nic)

}

func port(count uint, kind xir.NICKind, mods ...Modifier) Modifier {

	return NICConstructor(func() *xir.NIC {

		nic := &xir.NIC{
			Kind: kind,
		}

		for i := uint(0); i < count; i++ {
			nic.Ports = append(nic.Ports, new(xir.Port))
		}

		for _, mod := range mods {
			mod.Modify(nic)
		}

		return nic
	})

	//	return &NICConstructor{nic}
}

func Eth(count uint, mods ...Modifier) Modifier {

	return port(count, xir.NICKind_ETH, mods...)
}

func Swp(count uint, mods ...Modifier) Modifier {

	return port(count, xir.NICKind_SWP, mods...)

}

func Eno(count uint, mods ...Modifier) Modifier {

	return port(count, xir.NICKind_ENO, mods...)

}

func Enp(count uint, mods ...Modifier) Modifier {

	return port(count, xir.NICKind_ENP, mods...)

}

func Ipmi(count uint, mods ...Modifier) Modifier {

	return port(count, xir.NICKind_IPMI, mods...)

}

func Combo(count uint, mods ...Modifier) Modifier {

	return port(count, xir.NICKind_Combo, mods...)

}

func Gbps(value uint64) Modifier {

	return &CapacityMod{Value: xir.Gbps(value)}

}

type LinkRoleMod struct {
	Value   xir.LinkRole
	Indices []uint
}

func (m *LinkRoleMod) Modify(nic interface{}) {

	if len(m.Indices) == 0 {
		for _, p := range nic.(*xir.NIC).Ports {
			p.Role = m.Value
		}
	} else {
		for _, i := range m.Indices {
			nic.(*xir.NIC).Ports[i].Role = m.Value
		}
	}

}

func Xpnet(indices ...uint) Modifier {
	return &LinkRoleMod{Value: xir.LinkRole_XpLink, Indices: indices}
}

func Infranet(indices ...uint) Modifier {
	return &LinkRoleMod{Value: xir.LinkRole_InfraLink, Indices: indices}
}

func Mgmt(indices ...uint) Modifier {
	return &LinkRoleMod{Value: xir.LinkRole_MgmtLink, Indices: indices}
}

func Gw(indices ...uint) Modifier {
	return &LinkRoleMod{Value: xir.LinkRole_GatewayLink, Indices: indices}
}
