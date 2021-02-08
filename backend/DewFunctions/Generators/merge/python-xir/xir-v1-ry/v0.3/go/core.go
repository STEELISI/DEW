package xir

import (
	"fmt"
)

type Identify interface{ Identify() string }

type Topology struct {
	Devices     []*Device
	Connections []*Connection
}

type Device struct {
	Interfaces []*Interface
	Data       Identify
	Visited    bool
}

type Interface struct {
	Edge   *Edge
	Device *Device
	Data   interface{}
}

type Edge struct {
	Interface  *Interface
	Connection *Connection
	Data       interface{}
}

type Connection struct {
	Edges []*Edge
	Data  interface{}
}

type Neighbor struct {
	Local      *Interface
	Remote     *Interface
	Connection *Connection
}

// ---------------------------------

func (t *Topology) Device(id string) *Device {

	for _, x := range t.Devices {
		if x.Id() == id {
			return x
		}
	}

	return nil

}

func (d *Device) Id() string {
	return d.Data.Identify()
}

func (d *Device) Resource() *Resource { return d.Data.(*Resource) }
func (d *Device) Node() *Node         { return d.Data.(*Node) }

func (d *Device) Infranet() *Interface {

	for _, x := range d.Interfaces {
		p := x.Port()
		if p != nil {
			if p.Role == LinkRole_InfraLink {
				return x
			}
		}
	}

	return nil
}

func (i *Interface) Port() *Port     { return i.Data.(*Port) }
func (i *Interface) Socket() *Socket { return i.Data.(*Socket) }

func (e *Edge) Connector() *Connector {
	if e == nil {
		return nil
	}
	return e.Data.(*Connector)
}
func (e *Edge) Endpoint() *Endpoint { return e.Data.(*Endpoint) }

func (c *Connection) Cable() *Cable {
	if c == nil {
		return nil
	}
	return c.Data.(*Cable)
}
func (c *Connection) Link() *Link { return c.Data.(*Link) }

func (d *Device) Neighbors(
	selectors ...func(n *Neighbor) bool,
) []*Neighbor {

	var ns []*Neighbor

	for _, local := range d.Interfaces {

		if local.Edge == nil {
			continue
		}
		if local.Edge.Connection == nil {
			continue
		}

		for _, remote := range local.Edge.Connection.Edges {

			if remote == local.Edge {
				continue
			}
			if remote.Interface == nil {
				continue
			}

			nbr := &Neighbor{
				Local:      local,
				Remote:     remote.Interface,
				Connection: local.Edge.Connection,
			}

			skip := false
			for _, sel := range selectors {
				if !sel(nbr) {
					skip = true
					continue
				}
			}

			if !skip {
				ns = append(ns, nbr)
			}

		}

	}

	return ns

}

func (t *Topology) Show() string {

	s := ""

	for _, d := range t.Devices {

		s += d.Id() + " <=> "
		for _, n := range d.Neighbors() {
			s += n.Remote.Device.Id() + " "
		}
		s += "\n"

	}

	return s

}

func (c *Connection) Label() string {

	s := ""
	for _, e := range c.Edges {
		if e.Interface != nil {
			s += e.Interface.Ref().Label() + "~"
		}
	}

	if len(s) > 1 {
		return s[:len(s)-1]
	}
	return s

}

func (r *Ref) Label() string {
	return fmt.Sprintf("%s.%d", r.Element, r.Index)
}

func (r *Ref) Eq(other *Ref) bool {
	return r.Element == other.Element && r.Index == other.Index
}

func (t *Topology) Select(f func(*Device) bool) []*Device {

	var result []*Device

	for _, x := range t.Devices {
		if f(x) {
			result = append(result, x)
		}
	}

	return result

}

func (ifx *Interface) Ref() *Ref {

	r := &Ref{
		Element: ifx.Device.Id(),
	}

	for i, x := range ifx.Device.Interfaces {
		if x == ifx {
			r.Index = uint32(i)
		}
	}

	return r
}
