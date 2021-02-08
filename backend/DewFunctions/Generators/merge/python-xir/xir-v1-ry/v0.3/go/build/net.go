package build

import (
	"fmt"
	//"log"
	"strings"

	"gitlab.com/mergetb/xir/v0.3/go"
)

func (tb *Builder) Connect(a, b *xir.Port, mods ...Modifier) *xir.Cable {

	id := fmt.Sprintf("%s-%s", a.Label(), b.Label())

	//log.Printf("connecting %s", id)

	c := &xir.Cable{
		Id: id,
		Ends: []*xir.End{
			{Connectors: []*xir.Connector{{Index: 0, Parent: id}}},
			{Connectors: []*xir.Connector{{Index: 1, Parent: id}}},
		},
	}

	for _, mod := range mods {
		mod.Modify(c)
	}

	a.Connector = &xir.Ref{Element: id, Index: 0}
	b.Connector = &xir.Ref{Element: id, Index: 1}
	c.Ends[0].Connectors[0].Port = &xir.Ref{Element: a.Parent, Index: a.Index}
	c.Ends[1].Connectors[0].Port = &xir.Ref{Element: b.Parent, Index: b.Index}

	tb.Cables = append(tb.Cables, c)

	return c

}

func (tb *Builder) Breakout(
	single *xir.Port, multi []*xir.Port, mods ...Modifier) *xir.Cable {

	parts := []string{single.Label()}
	for _, x := range multi {
		parts = append(parts, x.Label())
	}

	id := strings.Join(parts, "-")

	c := &xir.Cable{
		Id: id,
		Ends: []*xir.End{
			{Connectors: []*xir.Connector{{Index: 0, Parent: id}}},
			{},
		},
	}

	single.Connector = &xir.Ref{Element: id, Index: 0}
	c.Ends[0].Connectors[0].Port = &xir.Ref{Element: single.Parent, Index: single.Index}

	for i, p := range multi {
		cx := &xir.Connector{
			Index:  uint32(i) + 1,
			Parent: id,
		}
		c.Ends[1].Connectors = append(c.Ends[1].Connectors, cx)
		p.Connector = &xir.Ref{Element: id, Index: uint32(i) + 1}
		cx.Port = &xir.Ref{Element: p.Parent, Index: p.Index}

	}

	for _, mod := range mods {
		mod.Modify(c)
	}

	tb.Cables = append(tb.Cables, c)

	return c

}

func (tb *Builder) Trunk(as, bs []*xir.Port, mods ...Modifier) []*xir.Cable {

	if len(as) != len(bs) {
		panic("trunks must have equal end lengths")
	}

	var cs []*xir.Cable

	for i, a := range as {
		b := bs[i]

		cs = append(cs, tb.Connect(a, b, mods...))
	}

	return cs

}

type CableKindMod struct {
	Value xir.CableKind
}

func (m *CableKindMod) Modify(x interface{}) {
	c := x.(*xir.Cable)
	c.Kind = m.Value
}

func DAC() Modifier {
	return &CableKindMod{xir.CableKind_DAC}
}

func AOC() Modifier {
	return &CableKindMod{xir.CableKind_AOC}
}

type BreakoutConnectorMod struct {
	Single xir.ConnectorKind
	Multi  xir.ConnectorKind
}

func (m *BreakoutConnectorMod) Modify(x interface{}) {
	c := x.(*xir.Cable)
	c.Ends[0].SetConnector(m.Single)
	c.Ends[1].SetConnector(m.Multi)
}

func QSFP28_4xSFP28() Modifier {
	return &BreakoutConnectorMod{
		Single: xir.ConnectorKind_QSFP28,
		Multi:  xir.ConnectorKind_SFP28,
	}
}

func QSFP28_2xQSFP28() Modifier {
	return &BreakoutConnectorMod{
		Single: xir.ConnectorKind_QSFP28,
		Multi:  xir.ConnectorKind_QSFP28,
	}
}
