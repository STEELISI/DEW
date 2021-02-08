package xir_test

import (
	"encoding/json"
	"testing"

	"gitlab.com/mergetb/xir/lang/go/hw"
	"gitlab.com/mergetb/xir/lang/go/sys"
	"gitlab.com/mergetb/xir/lang/go/tb"
)

func Test_SimpleThing(t *testing.T) {

	d := &hw.Device{
		Base: hw.Base{
			Manufacturer: "Siilicon Mechanics",
			Model:        "Emu 1000",
		},
		Procs: []hw.Proc{{
			Base: hw.Base{
				Manufacturer: "AMD",
				Model:        "Epyc 4047",
			},
			Cores: 47,
		}},
	}

	os := sys.OS(d)
	os.Name = "debian-buster"

	n := os.Node("emu1")

	r := tb.Resource{
		Alloc: tb.NetOnly,
		Roles: []tb.Role{
			tb.InfraServer,
		},
	}

	r.Attach(n)

	buf, err := json.MarshalIndent(*n, "", "  ")
	if err != nil {
		t.Fatal(err)
	}

	t.Logf(string(buf))

}
