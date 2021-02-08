package xir

import (
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"log"
	"strings"

	"github.com/golang/protobuf/proto"
)

func (f *Facility) Lift() *Topology {

	ifxmap := make(map[string]*Interface)
	edgemap := make(map[string]*Edge)

	t := new(Topology)

	// build maps

	for _, r := range f.Resources {

		d := &Device{Data: r}

		i := uint32(0)
		for _, n := range r.NICs {
			for _, p := range n.Ports {
				p.Parent = r.Id
				p.Index = i
				i++

				ifx := &Interface{
					Device: d,
					Data:   p,
				}
				d.Interfaces = append(d.Interfaces, ifx)
				ifxmap[p.Label()] = ifx

			}
		}

		t.Devices = append(t.Devices, d)

	}

	for _, c := range f.Cables {

		cnx := &Connection{Data: c}

		i := uint32(0)
		for _, e := range c.Ends {
			for _, x := range e.Connectors {
				x.Parent = c.Id
				x.Index = i
				i++

				edge := &Edge{
					Data:       x,
					Connection: cnx,
				}
				cnx.Edges = append(cnx.Edges, edge)
				edgemap[x.Label()] = edge

			}
		}

		t.Connections = append(t.Connections, cnx)
	}

	// connect topology

	for _, d := range t.Devices {
		for _, i := range d.Interfaces {
			if i.Data.(*Port).Connector != nil {
				i.Edge = edgemap[i.Data.(*Port).Connector.Label()]
			}
		}
	}

	for _, c := range t.Connections {
		for _, e := range c.Edges {
			if e.Data.(*Connector) != nil {
				e.Interface = ifxmap[e.Data.(*Connector).Port.Label()]
			}
		}
	}

	return t

}

func (r *Resource) Device() *Device {

	d := &Device{Data: r}
	for _, x := range r.NICs {
		for _, p := range x.Ports {
			d.Interfaces = append(d.Interfaces, &Interface{
				Data:   p,
				Device: d,
			})
		}
	}

	return d

}

func Connect(p *Port, c *Connector) {
	p.Connector = &Ref{Element: c.Parent, Index: c.Index}
	c.Port = &Ref{Element: p.Parent, Index: p.Index}
}

func (r *Resource) Identify() string {
	return r.Id
}

func (r *Resource) Degree() int {

	d := 0

	for _, n := range r.NICs {
		d += len(n.Ports)
	}

	return d

}

func (r *Resource) Xdegree() int { return r.degree(LinkRole_XpLink) }
func (r *Resource) Idegree() int { return r.degree(LinkRole_InfraLink) }

func (r *Resource) degree(role LinkRole) int {

	d := 0

	for _, n := range r.NICs {
		for _, p := range n.Ports {
			if p.Role == role {
				d++
			}
		}
	}

	return d

}

func (r *Resource) GetBGP() []*BGPRouterConfig {

	if r == nil {
		return nil
	}

	if r.OS == nil {
		return nil
	}

	if r.OS.BGP == nil {
		return nil
	}

	return r.OS.BGP

}

func (r *Resource) NextEth() *Port { return r.NextIfx(NICKind_ETH) }
func (r *Resource) NextEnp() *Port { return r.NextIfx(NICKind_ENP) }
func (r *Resource) NextEno() *Port { return r.NextIfx(NICKind_ENO) }
func (r *Resource) NextSwp() *Port { return r.NextIfx(NICKind_SWP) }
func (r *Resource) NextSwps(count uint) []*Port {
	return r.NextIfxs(NICKind_SWP, count)
}

func (r *Resource) NextSwpsG(count uint, gbps uint64) []*Port {
	return r.NextIfxsG(gbps, NICKind_SWP, int(count))
}

func (r *Resource) NextSwpG(gbps uint64) *Port {
	return r.NextIfxG(gbps, NICKind_SWP)
}
func (r *Resource) NextEnoG(gbps uint64) *Port {
	return r.NextIfxG(gbps, NICKind_ENO)
}
func (r *Resource) NextEnpG(gbps uint64) *Port {
	return r.NextIfxG(gbps, NICKind_ENP)
}
func (r *Resource) NextEthG(gbps uint64) *Port {
	return r.NextIfxG(gbps, NICKind_ETH)
}

func (r *Resource) NextEnpsG(gbps uint64, quantity int) []*Port {
	return r.NextIfxsG(gbps, NICKind_ENP, quantity)
}

func (r *Resource) NextIfxG(gbps uint64, kind NICKind) *Port {
	return r.NextIfxsG(gbps, kind, 1)[0]
}

func (r *Resource) NextIfxsG(gbps uint64, kind NICKind, quantity int) []*Port {

	var ports []*Port

	for _, x := range r.NICs {
		if x.Kind != kind {
			continue
		}
		for _, p := range x.Ports {
			if p.Parent != r.Id {
				log.Printf("%s !! %s (%s)", r.Id, p.Parent, p.Label())
			}
			if p.Capacity != Gbps(gbps) {
				continue
			}
			if p.Connector == nil {
				ports = append(ports, p)
				if len(ports) == quantity {
					break
				}
			}
		}
	}
	if len(ports) < quantity {
		panic(
			fmt.Sprintf(
				"[%s] insufficient ports available %d found %d needed",
				r.Id, len(ports), quantity,
			),
		)
	}
	return ports
}

func (r *Resource) Infranet() *Port {
	for _, x := range r.NICs {
		for _, p := range x.Ports {
			if p.Role == LinkRole_InfraLink {
				return p
			}
		}
	}
	panic("infralink not available")
}

func (r *Resource) NextXpnet() *Port {
	for _, x := range r.NICs {
		for _, p := range x.Ports {
			if p.Role == LinkRole_XpLink {
				if p.Connector == nil {
					return p
				}
			}
		}
	}
	panic("xplink not available")
}

func (r *Resource) NextXpnetG(gbps uint64) *Port {
	for _, x := range r.NICs {
		for _, p := range x.Ports {
			if p.Role == LinkRole_XpLink && p.Capacity == Gbps(gbps) {
				if p.Connector == nil {
					return p
				}
			}
		}
	}
	panic("xplink not available")
}

func (r *Resource) NextIfx(kind NICKind) *Port {

	for _, x := range r.NICs {
		if x.Kind != kind {
			continue
		}
		for _, p := range x.Ports {
			if p.Connector == nil {
				return p
			}
		}
	}
	panic(fmt.Sprintf("%s not available", kind))

}

func (r *Resource) NextIfxs(kind NICKind, count uint) []*Port {

	for _, x := range r.NICs {
		if x.Kind != kind {
			continue
		}
		for i, p := range x.Ports {
			if p.Connector == nil {
				return x.Ports[i : i+int(count)]
			}
		}
	}
	panic(fmt.Sprintf("%s not available", kind))

}

func (r *Resource) Eth(i int) *Port {

	var eth []*Port
	for _, x := range r.NICs {
		if x.Kind != NICKind_ETH {
			continue
		}
		for _, p := range x.Ports {
			eth = append(eth, p)
		}
	}
	return eth[i]

}

func (r *Resource) Swp(i int) *Port {

	var eth []*Port
	for _, x := range r.NICs {
		if x.Kind != NICKind_SWP {
			continue
		}
		for _, p := range x.Ports {
			eth = append(eth, p)
		}
	}
	return eth[i]

}

func (r *Resource) Swps() []*Port {

	var swp []*Port
	for _, x := range r.NICs {
		if x.Kind != NICKind_SWP {
			continue
		}
		for _, p := range x.Ports {
			swp = append(swp, p)
		}
	}
	return swp

}

func (r *Resource) Gbps(v uint64) []*Port {

	var ps []*Port

	for _, n := range r.NICs {
		for _, p := range n.Ports {
			if p.Capacity == Gbps(v) {
				ps = append(ps, p)
			}
		}
	}

	return ps

}

func (r *Resource) PortSelect(selector func(*Port) bool) map[string]*Port {

	result := make(map[string]*Port)

	cnt := make(map[NICKind]uint32)

	for _, n := range r.NICs {
		for _, p := range n.Ports {
			if selector(p) {
				name := strings.ToLower(
					fmt.Sprintf("%s%d", n.Kind, cnt[n.Kind]+n.StartingIndex),
				)
				result[name] = p
			}
			cnt[n.Kind]++
		}
	}

	return result

}

func (ifx *Interface) PortName() string {

	return ifx.Device.Resource().PortName(ifx.Port(), ifx.Edge)

}

func (r *Resource) PortName(x *Port, e *Edge) string {

	suffix := ""
	cnt := make(map[NICKind]uint32)
	for _, n := range r.NICs {
		for _, p := range n.Ports {
			if p == x {
				return strings.ToLower(
					fmt.Sprintf("%s%d%s",
						n.Kind, cnt[n.Kind]+n.StartingIndex, suffix),
				)
			}
			cnt[n.Kind]++
		}
	}

	return ""
}

func (c *Connector) Equals(x *Connector) bool {
	return c.Parent == x.Parent && c.Index == x.Index
}

func (r *Resource) PortsByRole(role LinkRole) map[string]*Port {

	return r.PortSelect(func(p *Port) bool { return p.Role == role })

}

func (x NICKind) Prefix() string {

	return strings.ToLower(x.String())

}

func (r *Resource) HasAllocMode(modes ...AllocMode) bool {

	for _, mode := range modes {
		for _, x := range r.Alloc {
			if x == mode {
				return true
			}
		}
	}

	return false
}

func (r *Resource) HasRole(roles ...Role) bool {

	for _, role := range roles {
		for _, x := range r.Roles {
			if x == role {
				return true
			}
		}
	}

	return false

}

func (r *Resource) HasRoles(roles ...Role) bool {

	found := 0

	for _, role := range roles {
		for _, x := range r.Roles {
			if x == role {
				found++
			}
			if found == len(roles) {
				return true
			}
		}
	}

	return false

}

func (r *Resource) IsSwitch() bool {
	return r.HasRole(Role_XpSwitch, Role_InfraSwitch)
}

func (r *Resource) Cores() uint32 {
	c := uint32(0)
	for _, p := range r.Procs {
		c += p.Cores
	}
	return c
}

func (r *Resource) Mem() uint64 {
	c := uint64(0)
	for _, dimm := range r.Memory {
		c += dimm.Capacity
	}
	return c
}

func (r *Resource) Storage() uint64 {
	c := uint64(0)
	for _, disk := range r.Disks {
		c += disk.Capacity
	}
	return c
}

func (r *Resource) XpBandwidth() uint64 {
	c := uint64(0)
	for _, nic := range r.NICs {
		for _, p := range nic.Ports {
			if p.Role == LinkRole_XpLink {
				c += p.Capacity
			}
		}
	}
	return c
}

func (r *Resource) InfraBandwidth() uint64 {
	c := uint64(0)
	for _, nic := range r.NICs {
		for _, p := range nic.Ports {
			if p.Role == LinkRole_InfraLink {
				c += p.Capacity
			}
		}
	}
	return c
}

func (r *Resource) SwpBandwidth() uint64 {
	c := uint64(0)
	for _, nic := range r.NICs {
		if nic.Kind != NICKind_SWP {
			continue
		}
		for _, p := range nic.Ports {
			c += p.Capacity
		}
	}
	return c
}

func (p *Port) Label() string {
	return fmt.Sprintf("%s.%d", p.Parent, p.Index)
}

func (c *Connector) Label() string {
	return fmt.Sprintf("%s.%d", c.Parent, c.Index)
}

func FacilityFromFile(file string) (*Facility, error) {

	buf, err := ioutil.ReadFile(file)
	if err != nil {
		return nil, err
	}

	return FacilityFromB64String(string(buf))

}

// TODO all these serialization functions need to be guarded by XIR semvers to
// avoid subtle and very difficult to track bugs from creeping in due to protobuf
// spec skew or protoc versions.
func FacilityFromB64String(pbuf string) (*Facility, error) {

	data, err := base64.StdEncoding.DecodeString(pbuf)
	if err != nil {
		return nil, err
	}

	return FacilityFromRawString(string(data))

}

func FacilityFromRawString(pbuf string) (*Facility, error) {

	n := new(Facility)
	return n, proto.Unmarshal([]byte(pbuf), n)

}

func (f *Facility) ToB64Buf() ([]byte, error) {

	buf, err := proto.Marshal(f)
	if err != nil {
		return nil, err
	}

	encoded := base64.StdEncoding.EncodeToString(buf)

	return []byte(encoded), nil

}

func (f *Facility) ToBuf() ([]byte, error) {

	return proto.Marshal(f)

}

func (f *Facility) Clone() (*Facility, error) {

	if f == nil {
		return nil, nil
	}

	buf, err := f.ToBuf()
	if err != nil {
		return nil, err
	}

	return FacilityFromRawString(string(buf))

}

func (f *Facility) Resource(id string) *Resource {

	for _, x := range f.Resources {

		if x.Id == id {
			return x
		}

	}

	return nil

}

func (f *Facility) Cable(id string) *Cable {

	for _, x := range f.Cables {

		if x.Id == id {
			return x
		}

	}

	return nil

}
