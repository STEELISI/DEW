package build

import (
	"gitlab.com/mergetb/xir/v0.3/go"
)

type DiskConstructor func() *xir.Disk

func (ctor DiskConstructor) Modify(x interface{}) {
	r := x.(*xir.Resource)
	r.Disks = append(r.Disks, ctor())
}

type DisksConstructor func() []*xir.Disk

func (ctor DisksConstructor) Modify(x interface{}) {
	r := x.(*xir.Resource)
	r.Disks = append(r.Disks, ctor()...)
}

func SSDs(count uint, mods ...Modifier) Modifier {

	return DisksConstructor(func() []*xir.Disk {
		var ds []*xir.Disk

		for i := uint(0); i < count; i++ {
			d := &xir.Disk{
				FormFactor: xir.DiskFormFactor_SSD25,
			}
			ds = append(ds, d)
			for _, mod := range mods {
				mod.Modify(d)
			}
		}

		return ds
	})

}
