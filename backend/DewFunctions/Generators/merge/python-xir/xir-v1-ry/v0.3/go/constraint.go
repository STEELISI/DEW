package xir

// The Satisfies family of checks only checks STATIC conditions, e.g. does a
// port have the right protocols. Dynamic checks that evaluate whether a
// consumable aspect of a resource such as bandwidht capacity are checked by the
// realization engine

func (n *NIC) Satisfies(s *NICSpec) bool {

	if s == nil {
		return true
	}

	if s.Kind != nil {
		switch s.Kind.Op {
		case Operator_EQ:
			if n.Kind != s.Kind.Value {
				return false
			}
		case Operator_NE:
			if n.Kind == s.Kind.Value {
				return false
			}
		}
	}

	if s.DPDK != nil {
		switch s.DPDK.Op {
		case Operator_EQ:
			if n.DPDK != s.DPDK.Value {
				return false
			}
		case Operator_NE:
			if n.DPDK == s.DPDK.Value {
				return false
			}
		}
	}

	return true

}

func (p *Port) Satisfies(s *PortSpec) bool {

	if s.FormFactor != nil {
		switch s.FormFactor.Op {
		case Operator_EQ:
			if p.FormFactor != s.FormFactor.Value {
				return false
			}
		}
	}

	//TODO check protocols

	return true

}
