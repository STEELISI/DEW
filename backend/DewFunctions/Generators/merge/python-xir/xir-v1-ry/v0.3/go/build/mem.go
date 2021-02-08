package build

import (
	"gitlab.com/mergetb/xir/v0.3/go"
)

type DimmConstructor func() *xir.Dimm

func (ctor DimmConstructor) Modify(x interface{}) {
	r := x.(*xir.Resource)
	r.Memory = append(r.Memory, ctor())
}

type DimmsConstructor func() []*xir.Dimm

func (ctor DimmsConstructor) Modify(x interface{}) {
	r := x.(*xir.Resource)
	r.Memory = append(r.Memory, ctor()...)
}

func Dimms(count uint, mods ...Modifier) Modifier {

	return DimmsConstructor(func() []*xir.Dimm {
		var ds []*xir.Dimm

		for i := uint(0); i < count; i++ {
			d := &xir.Dimm{}
			ds = append(ds, d)
			for _, mod := range mods {
				mod.Modify(d)
			}
		}

		return ds
	})

}

type DimmTypeMod struct {
	Value xir.MemoryType
}

func (m *DimmTypeMod) Modify(x interface{}) {
	d := x.(*xir.Dimm)
	d.Type = m.Value
}

func DDR3() Modifier { return &DimmTypeMod{xir.MemoryType_DDR3} }
func DDR4() Modifier { return &DimmTypeMod{xir.MemoryType_DDR4} }
