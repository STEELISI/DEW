package build

import (
	"gitlab.com/mergetb/xir/v0.3/go"
)

type Modifier interface {
	Modify(x interface{})
}

type AllocModeMod struct {
	Modes []xir.AllocMode
}

func (a AllocModeMod) Modify(x interface{}) {

	r, ok := x.(*xir.Resource)
	if ok {
		r.Alloc = a.Modes
	}

}

func AllocModes(modes ...xir.AllocMode) AllocModeMod {
	return AllocModeMod{
		Modes: modes,
	}
}

type RoleMod struct {
	Roles []xir.Role
}

func (a RoleMod) Modify(x interface{}) {

	r, ok := x.(*xir.Resource)
	if ok {
		r.Roles = a.Roles
	}

}

func Roles(roles ...xir.Role) RoleMod {
	return RoleMod{
		Roles: roles,
	}
}

type RoleAddMod struct {
	Roles []xir.Role
}

func (a RoleAddMod) Modify(x interface{}) {

	r, ok := x.(*xir.Resource)
	if ok {
		r.Roles = append(r.Roles, a.Roles...)
	}

}

func RoleAdd(roles ...xir.Role) RoleAddMod {
	return RoleAddMod{
		Roles: roles,
	}
}

type CapacityMod struct {
	Value uint64
}

func (m *CapacityMod) Modify(x interface{}) {
	x.(xir.SetCapacity).SetCapacity(m.Value)
}

func TB(value uint64) *CapacityMod {

	return &CapacityMod{
		Value: xir.TB(value),
	}

}

func GB(value uint64) *CapacityMod {

	return &CapacityMod{
		Value: xir.GB(value),
	}

}

type ConnectorMod struct {
	Value xir.ConnectorKind
}

func (m *ConnectorMod) Modify(x interface{}) {
	x.(xir.SetConnector).SetConnector(m.Value)
}

func RJ45() Modifier {
	return &ConnectorMod{Value: xir.ConnectorKind_RJ45}
}

func QSFP28() Modifier {
	return &ConnectorMod{Value: xir.ConnectorKind_QSFP28}
}

func QSFPP() Modifier {
	return &ConnectorMod{Value: xir.ConnectorKind_QSFPP}
}

func SFPP() Modifier {
	return &ConnectorMod{Value: xir.ConnectorKind_SFPP}
}
