package build

import (
	"gitlab.com/mergetb/xir/v0.3/go"
)

type ProcConstructor func() *xir.Proc

func (ctor ProcConstructor) Modify(x interface{}) {
	r := x.(*xir.Resource)
	r.Procs = append(r.Procs, ctor())
}

type ProcsConstructor func() []*xir.Proc

func (ctor ProcsConstructor) Modify(x interface{}) {
	r := x.(*xir.Resource)
	r.Procs = append(r.Procs, ctor()...)
}

func Procs(count uint, mods ...Modifier) Modifier {

	return ProcsConstructor(func() []*xir.Proc {

		var ps []*xir.Proc

		for i := uint(0); i < count; i++ {
			p := &xir.Proc{}
			ps = append(ps, p)
			for _, mod := range mods {
				mod.Modify(p)
			}
		}

		return ps
	})

}

type CoresMod struct {
	Value uint32
}

func (m *CoresMod) Modify(x interface{}) {
	p := x.(*xir.Proc)
	p.Cores = m.Value
}

func Cores(count uint32) Modifier {
	return &CoresMod{count}
}

type FirmwareMod struct {
	Value xir.Firmware_Kind
}

func (m *FirmwareMod) Modify(x interface{}) {
	r := x.(*xir.Resource)
	r.Firmware = &xir.Firmware{Kind: m.Value}
}

func Bios() Modifier {
	return &FirmwareMod{xir.Firmware_BIOS}
}

func Uefi() Modifier {
	return &FirmwareMod{xir.Firmware_UEFI}
}

type AllocMod struct {
	Value xir.AllocMode
}

func (m *AllocMod) Modify(x interface{}) {
	r := x.(*xir.Resource)
	for _, x := range r.Alloc {
		if x == m.Value {
			return
		}
	}

	r.Alloc = append(r.Alloc, m.Value)
}

func Hypervisor() Modifier {
	return &AllocMod{xir.AllocMode_Virtual}
}

func BareMetal() Modifier {
	return &AllocMod{xir.AllocMode_Physical}
}
