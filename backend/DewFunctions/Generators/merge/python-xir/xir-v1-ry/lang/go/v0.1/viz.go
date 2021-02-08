/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * ceftb xir
 * ==================
 *   A bit of glue to integrate the viz submodule.
 *
 *	Copyright ceftb 2018 - All Rights Reserved
 *	License: Apache 2.0
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

package xir

type Point struct {
	X, Y float64
}

// Node Positional interface implementation ~~~

func (n *Node) Position() *Point {
	//return n.Props["position"].(*Point)
	return &n.Pos
}
func (n *Node) Velocity() *Point {
	//return n.Props["dp"].(*Point)
	return &n.Vel
}
func (n *Node) Weight() float64 {
	v := float64(n.Valence())
	min := 25.0
	if v < min {
		v = min
	}
	return 10 * v
}

// Net Positional interface implementation ~~~

func (n *Net) Position() *Point {
	return n.Props["position"].(*Point)
}
func (n *Net) Velocity() *Point {
	return n.Props["dp"].(*Point)
}

// Endpoint Positional interface implementation ~~~

func (n *Endpoint) Position() *Point {
	return n.Props["position"].(*Point)
}
func (n *Endpoint) Velocity() *Point {
	return n.Props["dp"].(*Point)
}

// local-global point translations

func (n *Net) Global() Point {

	p := *n.Position()

	if n.Parent == nil {
		return p
	}

	return Add(p, n.Parent.Global())

}

func (n *Node) Global() Point {

	p := *n.Position()

	return Add(p, n.Parent.Global())

}

func (n *Endpoint) Global() Point {

	p := *n.Position()

	return Add(p, n.Parent.Global())

}

func Add(v, x Point) Point {

	return Point{v.X + x.X, v.Y + x.Y}

}

func (net *Net) Bounds() Bounds {
	b := Bounds{}
	b.Top = 1.0e22
	b.Left = 1.0e22
	for _, n := range net.Nets {
		b.Consume(n.Bounds(), n.Loc)
	}
	for _, n := range net.Nodes {
		if n.Loc.X < b.Left {
			b.Left = n.Loc.X
		}
		if n.Loc.X > b.Right {
			b.Right = n.Loc.X
		}
		if n.Loc.Y > b.Bottom {
			b.Bottom = n.Loc.Y
		}
		if n.Loc.Y < b.Top {
			b.Top = n.Loc.Y
		}
	}

	return b
}

func (b *Bounds) Consume(x Bounds, c Vec2) {
	if x.Left+c.X < b.Left {
		b.Left = x.Left + c.X
	}
	if x.Right+c.X > b.Right {
		b.Right = x.Right + c.X
	}
	if x.Top+c.Y < b.Top {
		b.Top = x.Top + c.Y
	}
	if x.Bottom+c.Y > b.Bottom {
		b.Bottom = x.Bottom + c.Y
	}
}
