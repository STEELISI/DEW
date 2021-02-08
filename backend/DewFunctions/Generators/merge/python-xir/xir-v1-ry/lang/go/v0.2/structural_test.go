package xir

import (
	"encoding/json"
	"io/ioutil"
	"testing"
)

func net4() *Net {

	host := NewNet()
	zwitch := host.Node().Set(Props{"name": "leaf"})
	for i := 0; i < 4; i++ {
		zwitch.Endpoint().Set(Props{"bandwidth": "1G"})
	}

	a := host.Node().Set(Props{"name": "a"})
	a.Endpoint().Set(Props{"bandwidth": "1G"})

	b := host.Node().Set(Props{"name": "b"})
	b.Endpoint().Set(Props{"bandwidth": "1G"})

	c := host.Node().Set(Props{"name": "c"})
	c.Endpoint().Set(Props{"bandwidth": "1G"})

	d := host.Node().Set(Props{"name": "d"})
	d.Endpoint().Set(Props{"bandwidth": "1G"})

	host.Link(zwitch.Endpoints[0], a.Endpoints[0])
	host.Link(zwitch.Endpoints[1], b.Endpoints[0])
	host.Link(zwitch.Endpoints[2], c.Endpoints[0])
	host.Link(zwitch.Endpoints[3], d.Endpoints[0])

	return host

}

func TestModelA(t *testing.T) {

	a := net4()

	buf, _ := json.MarshalIndent(a, "", "  ")
	ioutil.WriteFile("4net.json", buf, 0644)

	/*
		err := viz.NetSvg("4net", a)
		if err != nil {
			t.Fatal(err)
		}
	*/

	/*
		buf, _ = json.MarshalIndent(a, "", "  ")
		ioutil.WriteFile("4net_vt.json", buf, 0644)
	*/

}

func TestModelAB(t *testing.T) {

	a := net4()
	b := net4()
	c := net4()

	abc := NewNet()
	abc.Nets = append(abc.Nets, a)
	a.Parent = abc

	abc.Nets = append(abc.Nets, b)
	b.Parent = abc

	abc.Nets = append(abc.Nets, c)
	c.Parent = abc

	t_ab := a.GetNodeByName("leaf").Endpoint().Set(Props{"bandwidth": "10G"})
	t_ba := b.GetNodeByName("leaf").Endpoint().Set(Props{"bandwidth": "10G"})

	t_bc := b.GetNodeByName("leaf").Endpoint().Set(Props{"bandwidth": "10G"})
	t_cb := c.GetNodeByName("leaf").Endpoint().Set(Props{"bandwidth": "10G"})

	t_ca := c.GetNodeByName("leaf").Endpoint().Set(Props{"bandwidth": "10G"})
	t_ac := a.GetNodeByName("leaf").Endpoint().Set(Props{"bandwidth": "10G"})

	abc.Link(t_ab, t_ba)
	abc.Link(t_bc, t_cb)
	abc.Link(t_ca, t_ac)

	buf, err := json.MarshalIndent(abc, "", "  ")
	if err != nil {
		t.Fatal(err)
	}
	ioutil.WriteFile("44net.json", buf, 0644)

	//TODO new layout code not working with recursive networks yet
	/*
		err = viz.NetSvg("44net", abc)
		if err != nil {
			t.Fatal(err)
		}
	*/

	/*
		VTag(abc)

		buf, err = json.MarshalIndent(abc, "", "  ")
		if err != nil {
			t.Fatal(err)
		}
		ioutil.WriteFile("44net_vt.json", buf, 0644)
	*/

}
