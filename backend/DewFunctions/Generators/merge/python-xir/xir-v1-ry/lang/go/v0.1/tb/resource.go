package tb

import (
	"net"
	"reflect"

	"github.com/mitchellh/mapstructure"
	log "github.com/sirupsen/logrus"

	"gitlab.com/mergetb/xir/lang/go"
	"gitlab.com/mergetb/xir/lang/go/hw"
	"gitlab.com/mergetb/xir/lang/go/sys"
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
)

// Role indicates the usage model of a resource in a testbed. A resource may
// have multiple roles. Roles have an unsigned 16 bit integer identifier. Roles
// 0-1024 are reserved. The values in the reserved range are defined here.
type Role uint16

const (
	// RoleUnspec indicates no role is specified
	RoleUnspec Role = iota

	// Node indicates the resource is a testbed node
	Node

	// InfraServer indicates the resource is an infrastructure server
	InfraServer

	// ConsoleServer indicates the resource is a console server
	ConsoleServer

	// PowerController indidcates the resource is a power controller
	PowerController

	// NetworkEmulator indicates the resource is a network emulator
	NetworkEmulator

	// XpSwitch indicates the resource is an experiment plane switch
	XpSwitch

	// InfraSwitch indicates the resource is an infrastructure plane switch
	InfraSwitch

	// MgmtSwitch indicates the resource is a management plane switch
	MgmtSwitch

	// Gateway indicates the resource is a testbed gateway
	Gateway

	// Leaf indicates the resource is a leaf switch
	Leaf

	// Fabric indicates the resource is a fabric switch
	Fabric

	// Spine indicates the resource is a spine switch
	Spine

	// InfraLink indicates the resource is an infrastructure link
	InfraLink

	// XpLink indicates the resource is an experiment link
	XpLink

	// Tor indicates the resource is a top of rack switch
	Tor

	// EmuLink indicates that the link carries emulation traffic
	EmuLink

	// StorageServer indicates that the server can be used for providing storage
	StorageServer
)

// A Resource captures testbed operation relevant information about a resource.
// It contains a System object that captures OS level details about the
// unerlying device.
type Resource struct {
	Alloc     []AllocMode
	Roles     []Role
	Props     xir.Props
	LinkRoles map[string]Role //system.link.name -> role
	System    *sys.System
}

// GetLinksByRole returns all OS level links that have the specified testbed
// role.
func (r *Resource) GetLinksByRole(role Role) []*sys.Link {

	var result []*sys.Link
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

// Node generates an XIR node from a resource.
func (r *Resource) Node() *xir.Node {

	node := r.System.Node()
	for k, v := range r.Props {
		node.Props[k] = v
	}
	node.Props["resource"] = r
	return node

}

// HasAllocMode checks if the specified node has any of the specified alloc
// modes.
func HasAllocMode(x *xir.Node, allocModes ...AllocMode) bool {

	rs := GetResourceSpec(x)
	if rs == nil {
		return false
	}
	return rs.HasAllocMode(allocModes...)

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

// HasRole checks if the specified node has any of the specified roles.
func HasRole(x *xir.Node, roles ...Role) bool {

	rs := GetResourceSpec(x)
	if rs == nil {
		return false
	}
	return rs.HasRole(roles...)
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

func decodeHook(
	f reflect.Type, t reflect.Type, data interface{}) (interface{}, error) {

	if t != reflect.TypeOf(net.IP{}) {
		return data, nil
	}

	return net.ParseIP(data.(string)), nil

}

// DecodeResource attempts to extract and decode a resource spec from a property
// set. Returns null if a decoding cannot be done.
func DecodeResource(props xir.Props) *Resource {

	obj, ok := props["resource"]
	if !ok {
		return nil
	}

	rs := &Resource{}

	decoder, err := mapstructure.NewDecoder(&mapstructure.DecoderConfig{
		Metadata:   nil,
		DecodeHook: decodeHook,
		Result:     rs,
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

	return DecodeResource(x.Props)

}

// Nic a NIC contained within the resource at the spcified index
func (r *Resource) Nic(i int) hw.Nic {
	return r.System.Device.Nics[i]
}
