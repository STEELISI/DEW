package xir

import (
	"fmt"
	"strings"

	"github.com/dustin/go-humanize"
)

func NewResourceAllocation(
	resource string,
	mzid string,
	node string,
) *ResourceAllocation {
	return &ResourceAllocation{
		Resource: resource,
		Mzid:     mzid,
		Node:     node,
		Procs: &ProcAllocation{
			Alloc: make(map[uint32]*SocketAllocation),
		},
		Memory: &MemoryAllocation{
			Alloc: make(map[uint32]*DimmAllocation),
		},
		NICs: &NICsAllocation{
			Alloc: make(map[uint32]*NICAllocation),
		},
		Disks: &DisksAllocation{
			Alloc: make(map[uint32]*DiskAllocation),
		},
	}
}

func (a *ResourceAllocation) AddProc(p *ProcAllocation) {

	if p == nil {
		return
	}

	if a.Procs == nil {
		a.Procs = &ProcAllocation{
			Alloc: make(map[uint32]*SocketAllocation),
		}
	}
	for k, v := range p.Alloc {
		s, ok := a.Procs.Alloc[k]
		if !ok {
			a.Procs.Alloc[k] = &SocketAllocation{
				Cores: v.Cores,
			}
		} else {
			s.Cores += v.Cores
		}
	}

}

func (a *ProcAllocation) Allocate(index uint32, s *SocketAllocation) {

	if a == nil || s == nil {
		return
	}

	if a.Alloc == nil {
		a.Alloc = make(map[uint32]*SocketAllocation)
	}

	sa, ok := a.Alloc[index]
	if !ok {
		// don't trust external pointers, copy data
		a.Alloc[index] = new(SocketAllocation)
		*a.Alloc[index] = *s
	} else {
		sa.Cores += s.Cores
	}

}

func (a *MemoryAllocation) Allocate(index uint32, d *DimmAllocation) {

	if a == nil || d == nil {
		return
	}

	if a.Alloc == nil {
		a.Alloc = make(map[uint32]*DimmAllocation)
	}

	sa, ok := a.Alloc[index]
	if !ok {
		// don't trust external pointers, copy data
		a.Alloc[index] = new(DimmAllocation)
		*a.Alloc[index] = *d
	} else {
		sa.Capacity += d.Capacity
	}

}

func (a *DisksAllocation) Allocate(index uint32, d *DiskAllocation) {

	if a == nil || d == nil {
		return
	}

	if a.Alloc == nil {
		a.Alloc = make(map[uint32]*DiskAllocation)
	}

	sa, ok := a.Alloc[index]
	if !ok {
		// don't trust external pointers, copy data
		a.Alloc[index] = new(DiskAllocation)
		*a.Alloc[index] = *d
	} else {
		sa.Capacity += d.Capacity
	}

}

func (a *NICsAllocation) Allocate(n, p uint32, pa *PortAllocation) {

	if a == nil || pa == nil {
		return
	}

	if a.Alloc == nil {
		a.Alloc = make(map[uint32]*NICAllocation)
	}

	_, ok := a.Alloc[n]
	if !ok {
		a.Alloc[n] = &NICAllocation{
			Alloc: make(map[uint32]*PortAllocation),
		}
	}

	paa, ok := a.Alloc[n].Alloc[p]
	if !ok {
		a.Alloc[n].Alloc[p] = new(PortAllocation)
		*a.Alloc[n].Alloc[p] = *pa
	} else {
		paa.Capacity += pa.Capacity
	}

}

func (a *ResourceAllocation) AddMemory(m *MemoryAllocation) {

	if m == nil {
		return
	}

	if a.Memory == nil {
		a.Memory = &MemoryAllocation{
			Alloc: make(map[uint32]*DimmAllocation),
		}
	}
	for k, v := range m.Alloc {
		d, ok := a.Memory.Alloc[k]
		if !ok {
			a.Memory.Alloc[k] = &DimmAllocation{
				Capacity: v.Capacity,
			}
		} else {
			d.Capacity += v.Capacity
		}
	}

}

func (a *ResourceAllocation) AddDisks(m *DisksAllocation) {

	if m == nil {
		return
	}

	if a.Disks == nil {
		a.Disks = &DisksAllocation{
			Alloc: make(map[uint32]*DiskAllocation),
		}
	}
	for k, v := range m.Alloc {
		d, ok := a.Disks.Alloc[k]
		if !ok {
			a.Disks.Alloc[k] = &DiskAllocation{
				Capacity: v.Capacity,
			}
		} else {
			d.Capacity += v.Capacity
		}
	}

}

func (a *ResourceAllocation) AddNICs(m *NICsAllocation) {

	if m == nil {
		return
	}

	if a.NICs == nil {
		a.NICs = &NICsAllocation{
			Alloc: make(map[uint32]*NICAllocation),
		}
	}
	for k, v := range m.Alloc {
		_, ok := a.NICs.Alloc[k]
		if !ok {
			a.NICs.Alloc[k] = &NICAllocation{
				Alloc: make(map[uint32]*PortAllocation),
			}
		}
		for pk, pv := range v.Alloc {
			p, ok := a.NICs.Alloc[k].Alloc[pk]
			if !ok {
				a.NICs.Alloc[k].Alloc[pk] = &PortAllocation{
					Capacity: pv.Capacity,
				}
			} else {
				p.Capacity += pv.Capacity
			}
		}

	}

}

func AggregateResourceAllocations(as []*ResourceAllocation) *ResourceAllocation {

	agg := new(ResourceAllocation)

	for _, a := range as {
		agg.AddProc(a.Procs)
		agg.AddMemory(a.Memory)
		agg.AddDisks(a.Disks)
		agg.AddNICs(a.NICs)
		agg.Resource = a.Resource
		agg.Node += a.Node + ","
	}

	if len(agg.Node) > 0 {
		agg.Node = agg.Node[:len(agg.Node)-1]
	}

	return agg

}

func AggregateCableAllocations(cs []*CableAllocation) *CableAllocation {

	agg := new(CableAllocation)

	for _, c := range cs {
		agg.Cable = c.Cable
		agg.Link += c.Link + ", "
		agg.Capacity += c.Capacity
	}

	if len(agg.Link) > 0 {
		agg.Link = agg.Link[:len(agg.Link)-2]
	}

	return agg

}

func (a *SocketAllocation) Add(x *SocketAllocation) {
	a.Cores += x.Cores
}

func (a *DimmAllocation) Add(x *DimmAllocation) {
	a.Capacity += x.Capacity
}

func (a *DiskAllocation) Add(x *DiskAllocation) {
	a.Capacity += x.Capacity
}

func (a *PortAllocation) Add(x *PortAllocation) {
	a.Capacity += x.Capacity
}

func (p *ProcAllocation) Show() string {
	s := "procs:\n"
	if p == nil {
		return s
	}
	for i, x := range p.Alloc {
		s += fmt.Sprintf("  %d: %d\n", i, x.Cores)
	}
	return s
}

func (p *ProcAllocation) TotalCores() uint32 {

	var cores uint32
	for _, sa := range p.Alloc {
		cores += sa.Cores
	}

	return cores

}

func (m *MemoryAllocation) Show() string {
	s := "memory:\n"
	if m == nil {
		return s
	}
	for i, x := range m.Alloc {
		s += fmt.Sprintf("  %d: %s\n", i, humanize.IBytes(x.Capacity))
	}
	return s
}

func (m *MemoryAllocation) TotalCapacity() uint64 {

	var capacity uint64
	for _, da := range m.Alloc {
		capacity += da.Capacity
	}
	return capacity
}

func (m *DisksAllocation) TotalCapacity() uint64 {

	var capacity uint64
	for _, da := range m.Alloc {
		capacity += da.Capacity
	}
	return capacity
}

func (n *NICsAllocation) Show() string {
	s := "nics:\n"
	if n == nil {
		return s
	}
	for ni, nx := range n.Alloc {
		for pi, px := range nx.Alloc {
			s += fmt.Sprintf("  %d.%d: %s\n", ni, pi, humanize.Bytes(px.Capacity))
		}
	}
	return s
}

func (n *NICsAllocation) TotalCapacity() uint64 {

	var capacity uint64
	for _, na := range n.Alloc {
		for _, pa := range na.Alloc {
			capacity += pa.Capacity
		}
	}
	return capacity

}

func (d *DisksAllocation) Show() string {
	s := "disks:\n"
	if d == nil {
		return s
	}
	for i, x := range d.Alloc {
		s += fmt.Sprintf("  %d: %s\n", i, humanize.IBytes(x.Capacity))
	}
	return s
}

func (rs *ResourceAllocation) Show() string {

	s := fmt.Sprintf("%s: %s\n", rs.Resource, rs.Node)
	s += rs.Procs.Show()
	s += rs.Memory.Show()
	s += rs.NICs.Show()
	s += rs.Disks.Show()

	return FormatUnits(s)

}

func (ca *CableAllocation) Show() string {

	return fmt.Sprintf("%s: %s %s", ca.Cable, ca.Link, humanize.Bytes(ca.Capacity))

}

func FormatUnits(s string) string {

	// get rid of iB in GiB,MiB... and 1G instead of 1 G
	s = strings.Replace(s, "iB", "", -1)
	s = strings.Replace(s, "B", "", -1)
	return s

}
