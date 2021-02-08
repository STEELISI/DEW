package xir

type Operator string

const (
	EQ     Operator = "="
	LT              = "<"
	LE              = "<="
	GT              = ">"
	GE              = ">="
	CHOICE          = "?"
	SELECT          = "[]"
)

type Constraint struct {
	Op    Operator    `json:"constraint__"`
	Value interface{} `json:"value__"`
}

func Eq(value interface{}) Constraint     { return Constraint{EQ, value} }
func Lt(value interface{}) Constraint     { return Constraint{LT, value} }
func Le(value interface{}) Constraint     { return Constraint{LE, value} }
func Gt(value interface{}) Constraint     { return Constraint{GT, value} }
func Ge(value interface{}) Constraint     { return Constraint{GE, value} }
func Choice(value interface{}) Constraint { return Constraint{CHOICE, value} }
func Select(value interface{}) Constraint { return Constraint{SELECT, value} }

func LiftNetConstraints(net *Net) {

	for _, x := range net.Nodes {
		LiftConstraints(map[string]interface{}(x.Props))
	}

	for _, x := range net.Links {
		LiftConstraints(map[string]interface{}(x.Props))
	}

	for _, x := range net.Nets {
		LiftNetConstraints(x)
	}

}

func IsValidOp(x Operator) bool {
	return x == EQ || x == LT || x == LE || x == GT || x == GE ||
		x == CHOICE || x == SELECT
}

// LiftConstraints and ExtractConstraints are a pair of mutually recursive
// functions that traverse a property tree, identify constraints within
// the tree and lift any identified constraints into the constraint type
func LiftConstraints(x interface{}) interface{} {

	m, ok := x.(map[string]interface{})
	if ok {
		c, ok := ExtractConstraint(m)
		if ok {
			return c
		} else {
			for k, v := range m {
				m[k] = LiftConstraints(v)
			}
		}
	}

	l, ok := x.([]interface{})
	if ok {
		for i, e := range l {
			l[i] = LiftConstraints(e)
		}
	}

	return x

}
func ExtractConstraint(m map[string]interface{}) (Constraint, bool) {

	c, hasConstraint := m["constraint__"]
	v, hasValue := m["value__"]
	if hasConstraint && hasValue {
		s, ok := c.(string)
		if ok {
			op := Operator(s)
			if IsValidOp(op) {
				return Constraint{op, LiftConstraints(v)}, true
			}
		}
	}
	return Constraint{}, false

}

// Int attempts to return a constaint value as an int. If the underlying value
// is floating point it will be cast to an int.
func (c *Constraint) Int() (int, bool) {

	f, ok := c.Value.(float64)
	if ok {
		return int(f), true
	}

	i, ok := c.Value.(int)
	if ok {
		return i, true
	}

	return 0, false
}
