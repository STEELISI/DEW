package hw

type Procs struct {
	Count int
	Spec  Proc
}

type Dimms struct {
	Count int
	Spec  Dimm
}

type Nics struct {
	Count int
	Spec  Nic
}

type Disks struct {
	Count int
	Spec  Disk
}

// DeviceSpec contains a keyed set of components. The semantics behind this data
// structure are that they key uniquely identifies the object, and that when a
// new object is added with the same key the count is simply incremented. This
// is uesful for building device specifications that contain many of the same
// parts. For example consider a computer with 8 identical ram sticks, or 10
// identical drives. This data structure contains the spec for just one and
// increments a counter.
type DeviceSpec struct {
	Base
	Procs  map[string]*Procs
	Memory map[string]*Dimms
	Nics   map[string]*Nics
	Disks  map[string]*Disks
}

func (s DeviceSpec) CoreCount() int {

	c := 0
	for _, p := range s.Procs {
		c += p.Count * int(p.Spec.Cores)
	}

	return c

}

func (s DeviceSpec) MemoryCapacity() uint64 {

	c := uint64(0)
	for _, m := range s.Memory {
		c += uint64(m.Count) * m.Spec.Capacity
	}

	return c

}

func (s DeviceSpec) DiskCapacity() uint64 {

	c := uint64(0)
	for _, m := range s.Disks {
		c += uint64(m.Count) * m.Spec.Capacity
	}

	return c

}

func (s DeviceSpec) Bandwidth() uint64 {

	c := uint64(0)
	for _, n := range s.Nics {
		for _, p := range n.Spec.Ports {
			c += uint64(n.Count) * p.Capacity
		}
	}

	return c

}

func (s *DeviceSpec) AddProc(x Proc) {

	_, ok := s.Procs[x.SKU]
	if ok {
		s.Procs[x.SKU].Count += 1
	} else {
		s.Procs[x.SKU] = &Procs{
			Count: 1,
			Spec:  x,
		}
	}

}

func (s *DeviceSpec) AddMemory(x Dimm) {

	_, ok := s.Memory[x.SKU]
	if ok {
		s.Memory[x.SKU].Count += 1
	} else {
		s.Memory[x.SKU] = &Dimms{
			Count: 1,
			Spec:  x,
		}
	}

}

func (s *DeviceSpec) AddNic(x Nic) {

	_, ok := s.Nics[x.SKU]
	if ok {
		s.Nics[x.SKU].Count += 1
	} else {
		s.Nics[x.SKU] = &Nics{
			Count: 1,
			Spec:  x,
		}
	}

}

func (s *DeviceSpec) AddDisk(x Disk) {

	_, ok := s.Disks[x.SKU]
	if ok {
		s.Disks[x.SKU].Count += 1
	} else {
		s.Disks[x.SKU] = &Disks{
			Count: 1,
			Spec:  x,
		}
	}

}

func NewSpec(d *Device) *DeviceSpec {

	s := &DeviceSpec{
		Base:   d.Base,
		Procs:  make(map[string]*Procs),
		Memory: make(map[string]*Dimms),
		Nics:   make(map[string]*Nics),
		Disks:  make(map[string]*Disks),
	}

	for _, x := range d.Procs {
		s.AddProc(x)
	}

	for _, x := range d.Memory {
		s.AddMemory(x)
	}

	for _, x := range d.Nics {
		s.AddNic(x)
	}

	for _, x := range d.Disks {
		s.AddDisk(x)
	}

	return s
}
