package tb

import (
	"fmt"

	"github.com/mitchellh/mapstructure"
	log "github.com/sirupsen/logrus"

	"gitlab.com/mergetb/xir/lang/go/v0.2"
	"gitlab.com/mergetb/xir/lang/go/v0.2/hw"
	"gitlab.com/mergetb/xir/lang/go/v0.2/sys"
)

// AllocMode indicates the allocation mode of a resource
type AllocMode uint16

const (
	// AllocUnspec indicates the resource has no specified allocation mode
	AllocUnspec AllocMode = iota

	// NoAlloc indicates the resource cannot be allocated
	NoAlloc

	// NetAlloc indicates the resource can be allocated as a network appliance
	NetAlloc

	// NetEmuAlloc indicates the resource can be allocated as a network emulator
	NetEmuAlloc

	// FilesystemAlloc indicates the resource can be allocated as mass storage
	FilesystemAlloc

	// BlockDeviceAlloc indicates the resource can be allocated as a block device
	// server
	BlockDeviceAlloc

	// PhysicalAlloc indicates the resource can be allocated as a physical device
	PhysicalAlloc

	// VirtualAlloc indicates the resource can be virtually allocated
	VirtualAlloc

	// Infrapod alloc indicates the resource can hold infrapods
	InfrapodAlloc

	// Physical simulation allocation
	PhysimAlloc
)

// Role indicates the usage model of a resource in a testbed. A resource may
// have multiple roles. Roles have an unsigned 16 bit integer identifier. Roles
// 0-1024 are reserved. The values in the reserved range are defined here.
type Role uint16

// todo this would be better as a 64-bit flag
const (
	RoleUnspec       Role = 0
	Node                  = 1
	InfraServer           = 2
	ConsoleServer         = 3
	PowerController       = 4
	NetworkEmulator       = 5
	XpSwitch              = 6
	InfraSwitch           = 7
	MgmtSwitch            = 8
	Gateway               = 9
	Leaf                  = 10
	Fabric                = 11
	Spine                 = 12
	InfraLink             = 13
	XpLink                = 14
	Tor                   = 15
	EmuLink               = 16
	StorageServer         = 17
	InfrapodServer        = 18
	MgmtLink              = 19
	EtcdHost              = 20
	MinIOHost             = 21
	RexHost               = 22
	DriverHost            = 23
	ManagerHost           = 24
	CommanderHost         = 25
	SledHost              = 26
	RallyHost             = 27
	GatewayLink           = 28
	HarborEndpoint        = 29
	PDU                   = 30
	EmuSwitch             = 31
	Hypervisor            = 32
	PhysicsSimulator      = 33
	SimLink               = 34
)

func (r Role) String() string {

	switch r {
	case RoleUnspec:
		return "Unspec"
	case Node:
		return "Node"
	case InfraServer:
		return "Infrastructure Server"
	case ConsoleServer:
		return "Console Server"
	case PowerController:
		return "Power Controller"
	case NetworkEmulator:
		return "Network Emulator"
	case XpSwitch:
		return "Experiment Switch"
	case InfraSwitch:
		return "Infrastructure Switch"
	case MgmtSwitch:
		return "Management Switch"
	case Gateway:
		return "Gateway"
	case Leaf:
		return "Leaf"
	case Fabric:
		return "Fabric"
	case Spine:
		return "Spine"
	case InfraLink:
		return "Infra Link"
	case XpLink:
		return "Experiment Link"
	case Tor:
		return "ToR"
	case EmuLink:
		return "Emulator Link"
	case StorageServer:
		return "Storage Server"
	case InfrapodServer:
		return "Infrapod Server"
	case MgmtLink:
		return "Mangement Link"
	case EtcdHost:
		return "Etcd Host"
	case MinIOHost:
		return "MinIO Host"
	case RexHost:
		return "Rex Host"
	case DriverHost:
		return "Driver Host"
	case ManagerHost:
		return "Manager Host"
	case CommanderHost:
		return "Commander Host"
	case SledHost:
		return "Sled Host"
	case RallyHost:
		return "Rally Host"
	case GatewayLink:
		return "Gateway Link"
	case HarborEndpoint:
		return "Harbor Endpoint"
	}

	return "?"
}

// A Resource captures testbed operation relevant information about a resource.
// It contains a System object that captures OS level details about the
// unerlying device.
type Resource struct {
	Alloc        []AllocMode `json:"alloc"`
	Roles        []Role      `json:"roles"`
	DefaultImage string      `json:"default_image,omitempty" mapstructure:"default_image"`
	ImageVariant string      `json:"image_variant,omitempty" mapstructure:"image_variant"`
	Ptags        []string    `json:"ptags,omitempty" mapstructure:"ptag"`
	Props        xir.Props   `json:"xir,omitempty"`

	//TODO change name to PortRoles/port_roles
	//system.link.name -> role
	LinkRoles map[string]Role `json:"link_roles,omitempty" mapstructure:"link_roles"`

	//system.link.name -> addr
	PortAddrs map[string]uint32 `json:"port_addrs" mapstructure:"port_addrs"`
	System    *sys.System       `json:"-"`
}

// GetLinksByRole returns all OS level links that have the specified testbed
// role.
func (r *Resource) GetLinksByRole(role Role) []*sys.Link {

	var result []*sys.Link
	if r.System == nil {
		log.Warn("resource system is nil")
		return result
	}
	if r.System.OS == nil {
		log.Warn("resource os is nil")
		return result
	}
	for _, x := range r.System.OS.Links {
		linkrole, ok := r.LinkRoles[x.Name]
		if ok {
			if linkrole == role {
				result = append(result, x)
			}
		}
	}

	return result

}

func (r *Resource) GetEndpointsByRole(n *xir.Node, role Role) []*xir.Endpoint {

	var result []*xir.Endpoint
	xs := r.GetLinksByRole(role)

	//TODO OMFG gross
	for _, e := range n.Endpoints {
		for _, x := range xs {
			if e.Props["name"] == x.Name {
				result = append(result, e)
			}
		}
	}

	return result

}

// Node generates an XIR node from a resource.
func (r *Resource) Node() *xir.Node {

	node := r.System.Node()
	for k, v := range r.Props {
		node.Props[k] = v
	}
	node.Props["resource"] = r
	node.Props["system"] = r.System
	return node

}

// HasAllocMode checks if the specified node has any of the specified alloc
// modes.

func toInt(x interface{}) int {

	f, ok := x.(float64)
	if ok {
		return int(f)
	}
	a, ok := x.(AllocMode)
	if ok {
		return int(a)
	}
	r, ok := x.(Role)
	if ok {
		return int(r)
	}
	i, ok := x.(int)
	if ok {
		return i
	}

	log.Warning("%#v unexpected type", x)
	return i

}

func HasAllocMode(x *xir.Node, allocModes ...AllocMode) bool {

	if x.Props == nil {
		return false
	}
	rs, ok := x.Props["resource"].(map[string]interface{})
	if !ok {
		return false
	}
	ams, ok := rs["alloc"].([]interface{})
	if !ok {
		return false
	}
	for _, x := range ams {
		for _, m := range allocModes {
			if AllocMode(toInt(x)) == m {
				return true
			}
		}
	}
	return false

}

func IsXp(x *xir.Endpoint) bool {

	fields := log.Fields{
		"ep": x.Id(),
	}

	p := x.Parent
	if p == nil {
		log.WithFields(fields).Warn("no parent")
		return false
	}

	if p.Props == nil {
		log.WithFields(fields).Warn("no parent props")
		return false
	}

	r, _ := p.Props["resource"].(map[string]interface{})
	if r == nil {
		log.WithFields(fields).Warn("no resource")
		return false
	}

	lr, _ := r["link_roles"].(map[string]interface{})
	if lr == nil {
		log.WithFields(fields).Warn("no link roles")
		return false
	}

	name, ok := x.Props["name"].(string)
	if !ok {
		log.WithFields(fields).Warn("no name")
		return false
	}

	role, ok := lr[name]
	if !ok {
		log.WithFields(fields).Warn("bad role")
		return false
	}

	return Role(toInt(role)) == XpLink

}

// HasAllocMode checks if the resource has any of the specified alloc modes.
func (r *Resource) HasAllocMode(modes ...AllocMode) bool {

	for _, x := range r.Alloc {
		for _, y := range modes {
			if x == y {
				return true
			}
		}
	}
	return false

}

// not returning typesd list to avoid copy as this function is on a performance
// crit path, need to cast later
func extractRoles(x *xir.Node) []interface{} {

	if x.Props == nil {
		return nil
	}
	rs, ok := x.Props["resource"].(map[string]interface{})
	if !ok {
		return nil
	}
	rls, ok := rs["roles"].([]interface{})
	if !ok {
		return nil
	}
	return rls

}

func HasRole(x *xir.Node, roles ...Role) bool {

	// if resource structs have already been lifted
	rs, ok := x.Props["resource"].(*Resource)
	if ok {
		return rs.HasRole(roles...)
	}

	for _, x := range extractRoles(x) {
		for _, m := range roles {
			if Role(toInt(x)) == m {
				return true
			}
		}
	}
	return false
}

func HasRoles(x *xir.Node, roles ...Role) bool {

	// if resource structs have already been lifted
	rs, ok := x.Props["resource"].(*Resource)
	if ok {
		return rs.HasRoles(roles...)
	}

	target := len(roles)
	found := 0

	for _, x := range extractRoles(x) {
		for _, m := range roles {
			if Role(toInt(x)) == m {
				found++
			}
			if found == target {
				return true
			}
		}
	}
	return false
}

// HasRole checks if the resource has any of the specified roles.
func (r *Resource) HasRole(roles ...Role) bool {

	for _, x := range r.Roles {
		for _, y := range roles {
			if x == y {
				return true
			}
		}
	}
	return false

}

// HasRoles checks if the resource has all of the specified roles.
func (r *Resource) HasRoles(roles ...Role) bool {

	target := len(roles)
	found := 0

	for _, x := range r.Roles {
		for _, y := range roles {
			if x == y {
				found++
			}
			if found == target {
				return true
			}
		}
	}
	return false

}

// DecodeResource attempts to extract and decode a resource spec from a property
// set. Returns null if a decoding cannot be done.
func DecodeResource(props xir.Props) *Resource {

	obj, ok := props["resource"]
	if !ok {
		return nil
	}

	rs, ok := obj.(*Resource)
	if ok {
		return rs
	}

	decoder, err := mapstructure.NewDecoder(&mapstructure.DecoderConfig{
		WeaklyTypedInput: true,
		DecodeHook:       mapstructure.StringToIPHookFunc(),
		Result:           &rs,
	})
	if err != nil {
		log.WithError(err).Warn("failed to initialize resource decoder")
		return nil
	}

	err = decoder.Decode(obj)
	if err != nil {
		log.Warn(err)
		return nil
	}

	return rs

}

// GetResourceSpec attempts to get a testbed resource specification associated
// with the provided node. If none can be found, nil is returned.
func GetResourceSpec(x *xir.Node) *Resource {

	rs := DecodeResource(x.Props)
	if rs != nil {
		rs.System = sys.Sys(x)
	}
	return rs

}

// Nic a NIC contained within the resource at the spcified index
func (r *Resource) Nic(i int) hw.Nic {
	return r.System.Device.Nics[i]
}

func GetCableSpec(x *xir.Link) *hw.Cable {

	return DecodeCable(x.Props)

}

func DecodeCable(props xir.Props) *hw.Cable {

	obj, ok := props["cable"]
	if !ok {
		return nil
	}

	c, ok := obj.(*hw.Cable)
	if ok {
		return c
	}

	err := mapstructure.Decode(obj, &c)
	if err != nil {
		log.WithError(err).Warn("failed to decode cable")
		return nil
	}

	return c

}

func (r *Resource) NicKind(kind string) []hw.Nic {
	var result []hw.Nic
	for _, x := range r.System.Device.Nics {
		if x.Kind == kind {
			result = append(result, x)
		}
	}
	return result
}

func (r *Resource) Port(kind string, i int) *hw.Port {
	var ports []*hw.Port
	for _, nic := range r.NicKind(kind) {
		ports = append(ports, nic.Ports...)
	}
	return ports[i]
}

func (r *Resource) Swp(i int) *hw.Port  { return r.Port("swp", i) }
func (r *Resource) Eth(i int) *hw.Port  { return r.Port("eth", i) }
func (r *Resource) Ipmi(i int) *hw.Port { return r.Port("ipmi", i) }

func (r *Resource) NextSwp() *hw.Port {

	for _, nic := range r.NicKind("swp") {
		for _, port := range nic.Ports {
			if port.Connector == nil {
				return port
			}
		}
	}

	log.Fatalf("ports exhausted for %s", r.System.Name)
	return nil

}

// Assign switch port role
func AssignSwpRole(resource *Resource, role Role) {

	if resource.LinkRoles == nil {
		resource.LinkRoles = make(map[string]Role)
	}

	for _, n := range resource.System.Device.Nics {
		if n.Kind == "swp" {
			for i, _ := range n.Ports {
				name := fmt.Sprintf("%s%d", n.Kind, n.StartingIndex+i)
				resource.LinkRoles[name] = role
			}
		}
	}

}
