package build

import (
	"fmt"

	"gitlab.com/mergetb/xir/v0.3/go"
)

type Underlay struct {
	Subnet   string
	AsnBegin uint64

	// counters
	ip  *IPCounter
	asn uint64
}

func (u *Underlay) Init() error {

	c, err := NewIPCounter(u.Subnet)
	if err != nil {
		return err
	}
	u.ip = c
	u.asn = u.AsnBegin

	return nil

}

func (u *Underlay) IncBGP() {
	u.asn++
	u.ip.Inc()
}

type Builder struct {
	Id            string
	FQDN          string
	InfraUnderlay Underlay
	XpUnderlay    Underlay
	Resources     []*xir.Resource
	Cables        []*xir.Cable
}

func NewBuilder(id, fqdn string, infra, xp Underlay) (*Builder, error) {

	err := infra.Init()
	if err != nil {
		return nil, err
	}

	err = xp.Init()
	if err != nil {
		return nil, err
	}

	b := &Builder{
		Id:            id,
		FQDN:          fqdn,
		InfraUnderlay: infra,
		XpUnderlay:    xp,
	}

	return b, nil

}

func (b *Builder) Gateways(
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	return resources(b.Gateway, count, idprefix, mods...)

}

func (b *Builder) Gateway(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id:    id,
		Alloc: []xir.AllocMode{xir.AllocMode_Net},
		Roles: []xir.Role{xir.Role_Gateway},
		OS: &xir.OSConfig{
			BGP: []*xir.BGPRouterConfig{
				{
					Name: "ifabric",
					ASN:  b.InfraUnderlay.asn,
					Interfaces: []*xir.InterfaceConfig{
						{
							Address:   b.InfraUnderlay.ip.String(),
							Interface: "lo",
						},
					},
				},
				{
					Name: "xfabric",
					ASN:  b.XpUnderlay.asn,
					Interfaces: []*xir.InterfaceConfig{
						{
							Address:   b.XpUnderlay.ip.String(),
							Interface: "lo",
						},
					},
				},
			},
		},
	}

	b.InfraUnderlay.IncBGP()
	b.XpUnderlay.IncBGP()

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r
}

func (b *Builder) InfraSpines(
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	return resources(b.InfraSpine, count, idprefix, mods...)

}

func (b *Builder) InfraSpine(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id:    id,
		Alloc: []xir.AllocMode{xir.AllocMode_Net},
		Roles: []xir.Role{
			xir.Role_InfraSwitch,
			xir.Role_Spine,
		},
		OS: &xir.OSConfig{
			BGP: []*xir.BGPRouterConfig{
				{
					Name: "ifabric",
					ASN:  b.InfraUnderlay.asn,
					Interfaces: []*xir.InterfaceConfig{
						{
							Address:   b.InfraUnderlay.ip.String(),
							Interface: "lo",
						},
					},
				},
			},
		},
	}

	b.InfraUnderlay.IncBGP()

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r
}

func (b *Builder) InfraLeaves(
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	return resources(b.InfraLeaf, count, idprefix, mods...)

}

func (b *Builder) InfraLeaf(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id:    id,
		Alloc: []xir.AllocMode{xir.AllocMode_Net},
		Roles: []xir.Role{
			xir.Role_InfraSwitch,
			xir.Role_Leaf,
		},
		OS: &xir.OSConfig{
			BGP: []*xir.BGPRouterConfig{
				{
					Name: "ifabric",
					ASN:  b.InfraUnderlay.asn,
					Interfaces: []*xir.InterfaceConfig{
						{
							Address:   b.InfraUnderlay.ip.String(),
							Interface: "lo",
						},
					},
				},
			},
		},
	}

	b.InfraUnderlay.IncBGP()

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r
}

func (b *Builder) InfraStems(
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	return resources(b.InfraStem, count, idprefix, mods...)

}

func (b *Builder) InfraStem(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id:    id,
		Alloc: []xir.AllocMode{xir.AllocMode_Net},
		Roles: []xir.Role{
			xir.Role_InfraSwitch,
			xir.Role_Stem,
		},
		OS: &xir.OSConfig{
			BGP: []*xir.BGPRouterConfig{
				{
					Name: "ifabric",
					ASN:  b.InfraUnderlay.asn,
					Interfaces: []*xir.InterfaceConfig{
						{
							Address:   b.InfraUnderlay.ip.String(),
							Interface: "lo",
						},
					},
				},
			},
		},
	}

	b.InfraUnderlay.IncBGP()

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r
}

func (b *Builder) XpSpines(
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	return resources(b.XpSpine, count, idprefix, mods...)

}

func (b *Builder) XpSpine(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id:    id,
		Alloc: []xir.AllocMode{xir.AllocMode_Net},
		Roles: []xir.Role{
			xir.Role_XpSwitch,
			xir.Role_Spine,
		},
		OS: &xir.OSConfig{
			BGP: []*xir.BGPRouterConfig{
				{
					Name: "xfabric",
					ASN:  b.XpUnderlay.asn,
					Interfaces: []*xir.InterfaceConfig{
						{
							Address:   b.XpUnderlay.ip.String(),
							Interface: "lo",
						},
					},
				},
			},
		},
	}

	b.XpUnderlay.IncBGP()

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r
}

func (b *Builder) XpStems(
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	return resources(b.XpStem, count, idprefix, mods...)

}

func (b *Builder) XpStem(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id:    id,
		Alloc: []xir.AllocMode{xir.AllocMode_Net},
		Roles: []xir.Role{
			xir.Role_XpSwitch,
			xir.Role_Stem,
		},
		OS: &xir.OSConfig{
			BGP: []*xir.BGPRouterConfig{
				{
					Name: "xfabric",
					ASN:  b.XpUnderlay.asn,
					Interfaces: []*xir.InterfaceConfig{
						{
							Address:   b.XpUnderlay.ip.String(),
							Interface: "lo",
						},
					},
				},
			},
		},
	}

	b.XpUnderlay.IncBGP()

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r
}

func (b *Builder) XpLeaves(
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	return resources(b.XpLeaf, count, idprefix, mods...)

}

func (b *Builder) XpLeaf(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id:    id,
		Alloc: []xir.AllocMode{xir.AllocMode_Net},
		Roles: []xir.Role{
			xir.Role_XpSwitch,
			xir.Role_Leaf,
		},
		OS: &xir.OSConfig{
			BGP: []*xir.BGPRouterConfig{
				{
					Name: "xfabric",
					ASN:  b.XpUnderlay.asn,
					Interfaces: []*xir.InterfaceConfig{
						{
							Address:   b.XpUnderlay.ip.String(),
							Interface: "lo",
						},
					},
				},
			},
		},
	}

	b.XpUnderlay.IncBGP()

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r
}

func (b *Builder) MgmtSpines(
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	return resources(b.MgmtSpine, count, idprefix, mods...)

}

func (b *Builder) MgmtSpine(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id:    id,
		Alloc: []xir.AllocMode{xir.AllocMode_Net},
		Roles: []xir.Role{
			xir.Role_MgmtSwitch,
			xir.Role_Spine,
		},
	}

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r
}

func (b *Builder) MgmtLeaves(
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	return resources(b.MgmtLeaf, count, idprefix, mods...)

}

func (b *Builder) MgmtLeaf(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id:    id,
		Alloc: []xir.AllocMode{xir.AllocMode_Net},
		Roles: []xir.Role{
			xir.Role_MgmtSwitch,
			xir.Role_Leaf,
		},
	}

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r
}

func (b *Builder) Infraserver(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id:    id,
		Alloc: []xir.AllocMode{xir.AllocMode_NoAlloc},
		Roles: []xir.Role{
			xir.Role_InfraServer,
			xir.Role_EtcdHost,
			xir.Role_MinIOHost,
			xir.Role_RexHost,
			xir.Role_DriverHost,
			xir.Role_ManagerHost,
			xir.Role_CommanderHost,
		},
		OS: &xir.OSConfig{
			BGP: []*xir.BGPRouterConfig{
				{
					Name: "ifabric",
					ASN:  b.InfraUnderlay.asn,
					Interfaces: []*xir.InterfaceConfig{
						{
							Address:   b.InfraUnderlay.ip.String(),
							Interface: "lo",
						},
					},
				},
			},
		},
	}

	b.InfraUnderlay.IncBGP()

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r
}

func (b *Builder) StorageServers(
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	return resources(b.StorageServer, count, idprefix, mods...)

}

func (b *Builder) StorageServer(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id: id,
		Alloc: []xir.AllocMode{
			xir.AllocMode_Filesystem,
			xir.AllocMode_BlockDevice,
		},
		Roles: []xir.Role{
			xir.Role_StorageServer,
			xir.Role_SledHost,
		},
		OS: &xir.OSConfig{
			BGP: []*xir.BGPRouterConfig{
				{
					Name: "ifabric",
					ASN:  b.InfraUnderlay.asn,
					Interfaces: []*xir.InterfaceConfig{
						{
							Address:   b.InfraUnderlay.ip.String(),
							Interface: "lo",
						},
					},
				},
			},
		},
	}

	b.InfraUnderlay.IncBGP()

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r

}

func (b *Builder) NetworkEmulators(
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	return resources(b.NetworkEmulator, count, idprefix, mods...)

}

func (b *Builder) NetworkEmulator(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id: id,
		Alloc: []xir.AllocMode{
			xir.AllocMode_NetEmu,
		},
		Roles: []xir.Role{
			xir.Role_NetworkEmulator,
		},
		OS: &xir.OSConfig{
			BGP: []*xir.BGPRouterConfig{
				{
					Name: "xfabric",
					ASN:  b.InfraUnderlay.asn,
					Interfaces: []*xir.InterfaceConfig{
						{
							Address:   b.XpUnderlay.ip.String(),
							Interface: "lo",
						},
					},
				},
			},
		},
	}

	b.XpUnderlay.IncBGP()

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r

}

func (b *Builder) PhysicsSimulators(
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	return resources(b.PhysicsSimulator, count, idprefix, mods...)

}

func (b *Builder) PhysicsSimulator(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id: id,
		Alloc: []xir.AllocMode{
			xir.AllocMode_Physim,
		},
		Roles: []xir.Role{
			xir.Role_PhysicsSimulator,
		},
		OS: &xir.OSConfig{
			BGP: []*xir.BGPRouterConfig{
				{
					Name: "xfabric",
					ASN:  b.InfraUnderlay.asn,
					Interfaces: []*xir.InterfaceConfig{
						{
							Address:   b.XpUnderlay.ip.String(),
							Interface: "lo",
						},
					},
				},
			},
		},
	}

	b.XpUnderlay.IncBGP()

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r

}

func (b *Builder) Nodes(
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	return resources(b.Node, count, idprefix, mods...)

}

func (b *Builder) Node(id string, mods ...Modifier) *xir.Resource {

	r := &xir.Resource{
		Id:    id,
		Alloc: []xir.AllocMode{},
		Roles: []xir.Role{
			xir.Role_TbNode,
		},
	}

	for _, mod := range mods {
		mod.Modify(r)
	}

	b.Resources = append(b.Resources, r)

	return r

}

func (b *Builder) Facility() *xir.Facility {
	return &xir.Facility{
		Id:        b.Id,
		Fqdn:      b.FQDN,
		Resources: b.Resources,
		Cables:    b.Cables,
	}
}

func resources(
	constructor func(string, ...Modifier) *xir.Resource,
	count int, idprefix string, mods ...Modifier) []*xir.Resource {

	var rs []*xir.Resource

	for i := 0; i < count; i++ {
		name := fmt.Sprintf("%s%d", idprefix, i)
		r := constructor(name, mods...)
		rs = append(rs, r)
	}

	return rs

}
