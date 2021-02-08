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

func (s *DeviceSpec) AddProc(x Proc) {

	_, ok := s.Procs[x.Model]
	if ok {
		s.Procs[x.Model].Count += 1
	} else {
		s.Procs[x.Model] = &Procs{
			Count: 1,
			Spec:  x,
		}
	}

}

func (s *DeviceSpec) AddMemory(x Dimm) {

	_, ok := s.Memory[x.Model]
	if ok {
		s.Memory[x.Model].Count += 1
	} else {
		s.Memory[x.Model] = &Dimms{
			Count: 1,
			Spec:  x,
		}
	}

}

func (s *DeviceSpec) AddNic(x Nic) {

	_, ok := s.Nics[x.Model]
	if ok {
		s.Nics[x.Model].Count += 1
	} else {
		s.Nics[x.Model] = &Nics{
			Count: 1,
			Spec:  x,
		}
	}

}

func (s *DeviceSpec) AddDisk(x Disk) {

	_, ok := s.Disks[x.Model]
	if ok {
		s.Disks[x.Model].Count += 1
	} else {
		s.Disks[x.Model] = &Disks{
			Count: 1,
			Spec:  x,
		}
	}

}

func NewSpec(d *Device) *DeviceSpec {

	s := &DeviceSpec{
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
