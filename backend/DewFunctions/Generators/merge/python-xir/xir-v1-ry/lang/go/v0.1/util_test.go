package xir

import (
	"testing"
)

func node0() Props {
	return Props{
		"proc": map[string]interface{}{
			"cores": "6",
			"speed": GHz(2.2),
		},
		"memory": map[string]interface{}{
			"size": GB(32),
		},
		"some": map[string]interface{}{
			"thing": map[string]interface{}{
				"is": map[string]interface{}{
					"here": map[string]interface{}{
						":)": "muffin",
					},
				},
			},
		},
	}
}

func TestPath0(t *testing.T) {

	x := node0()

	// get the proc speed
	p, err := x.GetProp("proc.speed")
	if err != nil {
		t.Fatal(err)
	}
	if p != GHz(2.2) {
		t.Fatalf("%v != %v", p, GHz(2.2))
	}

	// test the long path
	p, err = x.GetProp("some.thing.is.here.:)")
	if err != nil {
		t.Fatal(err)
	}
	if p != "muffin" {
		t.Fatal("%v != muffin", p)
	}

	// test a bad path
	p, err = x.GetProp("some.thing.is.not.here.:)")
	if err == nil {
		t.Fatal("error expected for bad path")
	}

	// test path too long
	p, err = x.GetProp("some.thing.is.here.:).taco.beans")
	if err == nil {
		t.Fatal("error expected for extraneous path")
	}

}
