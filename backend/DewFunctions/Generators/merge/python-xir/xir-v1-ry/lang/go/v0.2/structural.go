/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * MergeTB XIR
 * ==================
 *
 *  XIR Go Langauge Bindings
 *
 *
 *	Copyright MergeTB 2020 - All Rights Reserved
 *	License: Apache 2.0
 *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

package xir

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"sort"
	"strconv"
	"strings"
	"text/tabwriter"

	"github.com/mergetb/yaml"
)

type Props map[string]interface{}
type Prop struct {
	Key   string
	Value interface{}
}
type SortedProps []Prop

type Model struct {
	Net Net
}

type Net struct {
	Id     string  `json:"id"`
	Nodes  []*Node `json:"nodes"`
	Links  []*Link `json:"links,omitempty"`
	Nets   []*Net  `json:"nets,omitempty"`
	Phyos  []*Phyo `json:"phyos,omitempty"`
	Props  Props   `json:"props,omitempty"`
	Parent *Net    `json:"-" yaml:"-"`
}

type Endpoints []*Endpoint

type NodeKind uint

const (
	BasicKind NodeKind = iota
	SensorKind
	ActuatorKind
)

type Node struct {
	Kind      NodeKind  `json:"kind"`
	Id        string    `json:"id"`
	Endpoints Endpoints `json:"endpoints"`
	Parent    *Net      `json:"-" yaml:"-"`
	Props     Props     `json:"props,omitempty"`
	Visited   bool      `json:"-" yaml:"-"`
	Mounts    []*Mount  `json:"mounts,omitempty"`
}

type Phyo struct {
	Name  string   `json:"name"`
	Eqtns []string `json:"eqtns"`
}

type Sensor struct {
	Var    string  `json:"var"`
	Rate   float32 `json:"rate"`
	Target string  `json:"target"`
	Tag    int32   `json:"tag"`
}

type Actuator struct {
	Var           string `json:"var"`
	DynamicLimits Limits `json:"dynamic_limits" mapstructure:"dynamic_limits"`
	StaticLimits  Limits `json:"static_limits" mapstructure:"static_limits"`
	Tag           int32  `json:"tag"`
}

type Limits struct {
	Lower float32
	Upper float32
}

type Link struct {
	Id        string        `json:"id"`
	Endpoints []EndpointRef `json:"endpoints"`
	Props     Props         `json:"props"`
}

type Endpoint struct {
	Index     int                     `json:"index"`
	Props     Props                   `json:"props,omitempty"`
	Neighbors map[*Endpoint]*Neighbor `json:"-" yaml:"-"`
	Parent    *Node                   `json:"-" yaml:"-"`
}

type EndpointRef struct {
	Node     string    `json:"node"`
	Index    int       `json:"index"`
	Endpoint *Endpoint `json:"-"`
}

func (e *Endpoint) Ref() EndpointRef {
	return EndpointRef{
		Node:     e.Parent.Label(),
		Index:    e.Index,
		Endpoint: e,
	}
}

func (e *Endpoint) Id() string {
	return fmt.Sprintf("%s.%d", e.Parent.Label(), e.Index)
}

func (e *EndpointRef) Id() string {
	return fmt.Sprintf("%s.%d", e.Node, e.Index)
}

// Asset is object that will reside on the other side of the mount
// ID: name of the asset object
// Type: type of device to mount (fs, block, image)
// Size: total allocated size, required for block sizes
type AssetObject struct {
	ID   string `json:"id"`
	Type string `json:"type"`
	Size int64  `json:"size"`
}

// Mount is a device or filesystem mounted to a device
// Path: where the mount will reside locally
type Mount struct {
	Path  string      `json:"path"`
	Asset AssetObject `json:"asset"`
}

type Software struct {
	Props        Props `json:"props"`
	Requirements Props `json:"target"`
}

type Neighbor struct {
	Link     *Link
	Endpoint *Endpoint
}

// NodeNeighbor as opposed to Neighbor includes the local endpoint the neighbor
// is connected by. Because the Neighbor struct is relative to an endpoint in
// terms of it's structural organization this information is not needed.
// However, when giving information back to clients at the node level, this
// information is required.
type NodeNeighbor struct {
	Local  *Endpoint
	Remote *Endpoint
	Link   *Link
}

// Props methods --------------------------------------------------------------

// Json() marshals a property set to a JSON string
func (p *Props) Json() string {

	js, _ := json.MarshalIndent(p, "", "  ")
	return string(js)

}

// GetString tries to return the property located at key as a string. It returns
// (value, true) if an object exists at key and is a string.
func (p *Props) GetString(key string) (string, bool) {
	obj, ok := (*p)[key]
	if !ok {
		return "", ok
	}
	s, ok := obj.(string)
	return s, ok
}

// GetNumber tries to return the property located at key as a number. It returns
// (value, true) if an object exists at key and is a number.
func (p *Props) GetNumber(key string) (float64, bool) {
	obj, ok := (*p)[key]
	if !ok {
		return -1, ok
	}
	f, ok := obj.(float64)
	return f, ok
}

// GetConstraint tries to return the property located at key as a constraint. It
// returns (value, true) if an object exists at key and is a constraint.
func (p *Props) GetConstraint(key string) (Constraint, bool) {
	obj, ok := (*p)[key]
	if !ok {
		return Constraint{}, ok
	}

	c, ok := obj.(Constraint)
	if ok {
		return c, ok
	}

	m, ok := obj.(map[string]interface{})
	if !ok {
		return Constraint{}, ok
	}

	return ExtractConstraint(m)
}

// GetBool tries to return the property located at key as a boolean. It returns
// (value, true) if an object exists at key and is a boolean.
func (p *Props) GetBool(key string) (bool, bool) {
	obj, ok := (*p)[key]
	if !ok {
		return false, ok
	}
	f, ok := obj.(bool)
	return f, ok
}

// GetProps tries to return the property located at key as a Props object. It
// returns (value, true) if an object exists at key and is a Props object.
func (p *Props) GetProps(key string) (Props, bool) {
	obj, ok := (*p)[key]
	if !ok {
		return nil, ok
	}
	ps, ok := obj.(map[string]interface{})
	if ok {
		return Props(ps), ok
	}
	return nil, ok
}

// GetArray tries to return the property located at key as an array of props. It
// returns (value, true) if an object exists at key and is an array of props.
func (p *Props) GetArray(key string) ([]Props, bool) {
	obj, ok := (*p)[key]
	if !ok {
		return nil, ok
	}
	ps, ok := obj.([]interface{})
	if ok {
		result := []Props{}
		for _, x := range ps {
			result = append(result, Props(x.(map[string]interface{})))
		}
		return result, ok
	}
	return nil, ok
}

// Net methods ----------------------------------------------------------------

// NewNet creates a new empty Net object.
func NewNet(name string) *Net {
	return &Net{
		Id:    name,
		Props: make(Props),
	}
}

func (n *Net) AllLinks() []*Link {

	result := []*Link{}
	for _, link := range n.Links {
		result = append(result, link)
	}

	for _, net := range n.Nets {
		result = append(result, net.AllLinks()...)
	}

	return result

}

func (n *Net) AllNodes() []*Node {

	result := []*Node{}
	for _, node := range n.Nodes {
		result = append(result, node)
	}

	for _, net := range n.Nets {
		result = append(result, net.AllNodes()...)
	}

	return result

}

func (n *Net) Select(f func(x *Node) bool) []*Node {

	result := []*Node{}
	for _, node := range n.Nodes {
		if f(node) {
			result = append(result, node)
		}
	}

	for _, net := range n.Nets {
		result = append(result, net.Select(f)...)
	}

	return result

}

// Net creates a new Net object and adds it as a subnetwork to this Net.
func (n *Net) Net(name string) *Net {
	net := &Net{
		Id:     name,
		Props:  make(Props),
		Parent: n,
	}
	n.Nets = append(n.Nets, net)
	return net
}

// AddNet adds an existing Net object to this Net as a subnetwork.
func (n *Net) AddNet(net *Net) {
	net.Parent = n
	n.Nets = append(n.Nets, net)
}

// AddNode adds an existing node to this Net
func (n *Net) AddNode(node *Node) {
	node.Parent = n
	n.Nodes = append(n.Nodes, node)
}

// Node creates a new Node, adds it to this Net and returns a pointer to it.
func (n *Net) Node(name string) *Node {
	node := &Node{
		Id:     name,
		Props:  make(Props),
		Parent: n,
	}
	n.Nodes = append(n.Nodes, node)
	return node
}

func LinkID(es ...EndpointRef) string {

	var parts []string
	for _, e := range es {
		parts = append(parts, fmt.Sprintf("%s.%d", e.Endpoint.Parent.Label(), e.Index))
	}

	sort.Strings(parts)

	return strings.Join(parts, "~")

}

// Link creates a new Link between the provided Endpoints, adds it to this
// network and returns a pointer to it.
func (n *Net) Link(es ...*Endpoint) *Link {
	link := &Link{
		Props: make(Props),
	}
	for _, e := range es {
		link.Endpoints = append(link.Endpoints, e.Ref())
	}
	link.Id = LinkID(link.Endpoints...)
	setNeighbors(link)
	n.Links = append(n.Links, link)
	link.Props["local"] = link.IsLocal()
	return link
}

func (n *Net) AddLink(link *Link) {

	if link == nil {
		return
	}

	setNeighbors(link)
	n.Links = append(n.Links, link)

	if link.Props == nil {
		link.Props = make(Props)
	}
	link.Props["local"] = link.IsLocal()

}

// Size returns the total number of Nodes in this network.
func (n *Net) Size() int {
	s := len(n.Nodes)
	for _, x := range n.Nets {
		s += x.Size()
	}
	return s
}

// Label attempts to return the friendliest label that can be applied to a Net.
// If the Net has a name in its properties, that is returned. Otherwise the
// Net's ID is returned.
func (n *Net) Label() string {
	if n == nil {
		return ""
	}
	label := n.Id
	name, ok := n.Props["name"]
	if ok {
		label = name.(string)
	}
	return label
}

// GetElementProps searches for a Node or Link in this network with the
// specified ID and returns it properties. This search is recursive.
func (n *Net) GetElementProps(id string) *Props {
	_, _, node := n.GetNode(id)
	if node != nil {
		return &node.Props
	}

	_, _, link := n.GetLink(id)
	if link != nil {
		return &link.Props
	}

	return nil
}

// GetSubnet searches for a Network with the specified ID. This search is not
// recursive.
func (n *Net) GetSubnet(id string) (int, *Net) {
	for i, x := range n.Nets {
		if x.Id == id {
			return i, x
		}
	}
	return -1, nil
}

// DeleteSubnet deletes a subnet from this network with the specified id. This
// deletion is not recursive.
func (n *Net) DeleteSubnet(id string) *Net {
	i, x := n.GetSubnet(id)
	if x == nil {
		return nil
	}

	// excessively cryptic go mechanism to delete element at index
	n.Nets[i] = n.Nets[len(n.Nets)-1]
	n.Nets = n.Nets[:len(n.Nets)-1]

	return x
}

// GetNode finds a Node with the specified id and returns its index within
// its parent Net, a pointer to its parent Net, and a pointer to the
// Node itself.
func (n *Net) GetNode(id string) (int, *Net, *Node) {
	for i, x := range n.Nodes {
		if x.Id == id {
			return i, n, x
		}
	}
	for _, subnet := range n.Nets {
		i, s, x := subnet.GetNode(id)
		if x != nil {
			return i, s, x
		}
	}
	return -1, nil, nil
}

func (n *Net) GetPhyo(name string) (int, *Net, *Phyo) {
	for i, x := range n.Phyos {
		if x.Name == name {
			return i, n, x
		}
	}
	for _, subnet := range n.Nets {
		i, s, x := subnet.GetPhyo(name)
		if x != nil {
			return i, s, x
		}
	}
	return -1, nil, nil
}

// GetNodeByName searches this Net for a node with the given name. This is not
// a recursive search.
func (n *Net) GetNodeByName(name string) (int, *Net, *Node) {
	for i, x := range n.Nodes {
		if x.Props["name"] == name {
			return i, n, x
		}
		for _, e := range x.Endpoints {
			if e.Props["name"] == name {
				return i, n, x
			}
		}
	}

	for _, subnet := range n.Nets {
		i, s, x := subnet.GetNodeByName(name)
		if x != nil {
			return i, s, x
		}
	}
	return -1, nil, nil
}

// DeleteNode deletes a Node from this Net. This is a recursive operation.
func (n *Net) DeleteNode(id string) *Node {
	i, s, x := n.GetNode(id)
	if x == nil {
		return nil
	}

	// excessively cryptic go mechanism to delete element at index
	s.Nodes[i] = s.Nodes[len(s.Nodes)-1]
	s.Nodes = s.Nodes[:len(s.Nodes)-1]

	return x
}

// GetLink finds a Link with the specified id and returns its index within
// its parent Net, a pointer to its parent Net and a pointer to the
// Link itself.
func (n *Net) GetLink(id string) (int, *Net, *Link) {
	for i, x := range n.Links {
		if x.Id == id {
			return i, n, x
		}
	}
	for _, subnet := range n.Nets {
		i, s, x := subnet.GetLink(id)
		if x != nil {
			return i, s, x
		}
	}
	return -1, nil, nil
}

// DeleteLink deletes a Link from this Net. This is a recursive operation.
func (n *Net) DeleteLink(id string) *Link {
	i, s, x := n.GetLink(id)
	if x == nil {
		return nil
	}

	// excessively cryptic go mechanism to delete element at index
	s.Links[i] = s.Links[len(s.Links)-1]
	s.Links = s.Links[:len(s.Links)-1]

	return x
}

// String returns a human digestable string representation of a network. This
// includes all subnetworks.
func (n *Net) String() string {

	s := ""
	out := bytes.NewBufferString(s)
	var tw = tabwriter.NewWriter(out, 0, 0, 2, ' ', 0)

	n.str(tw)

	tw.Flush()

	return out.String()
}

func (n *Net) Yaml() string {

	y, err := yaml.Marshal(*n)
	if err != nil {
		return ""
	}
	return string(y)

}

func (n *Node) Yaml() string {

	y, err := yaml.Marshal(*n)
	if err != nil {
		return ""
	}
	return string(y)

}

func (net *Net) str(tw *tabwriter.Writer) {

	for _, n := range net.Nodes {

		fmt.Fprintf(tw, "%s\t|\t", n.Label())

		for _, e := range n.Neighbors() {
			fmt.Fprintf(tw, "%s ", e.Parent.Label())
		}

		fmt.Fprintf(tw, "\n")

	}

	for _, n := range net.Nets {
		n.str(tw)
	}

}

// FromFile reads an XIR Net from the given file. The file should contain
// the JSON representation of a Net as produced by ToFile().
func FromFile(filename string) (*Net, error) {

	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	return FromString(string(data))

}

// FromString reads and XIR Net from a string. The string should contain the
// JSON representation of a Net as produced by ToString().
func FromString(s string) (*Net, error) {

	net := NewNet("")
	err := json.Unmarshal([]byte(s), net)
	if err != nil {
		return nil, err
	}

	PrepNetwork(net)
	err = LinkNetwork(net)
	if err != nil {
		return net, err
	}

	LiftNetConstraints(net)

	return net, nil

}

// ToString serializes this Net to a JSON blob in a string.
func (n *Net) ToString() (string, error) {
	js, err := json.MarshalIndent(*n, "", "  ")
	if err != nil {
		return "", err
	}
	return string(js), err
}

// ToFile serializes this Net to a JSON blob and saves it to the specified file.
func (n *Net) ToFile(filename string) error {

	js, err := json.MarshalIndent(*n, "", "  ")
	if err != nil {
		return err
	}

	err = ioutil.WriteFile(filename, js, 0644)
	if err != nil {
		return err
	}

	return nil

}

// Json() serializes this Net to a JSON blob in a byte array
func (n *Net) Json() ([]byte, error) {
	js, err := json.MarshalIndent(*n, "", "  ")
	if err != nil {
		return nil, err
	}
	return js, nil
}

// Clone creates a deep clone of this Net.
func (n *Net) Clone() *Net {

	//TODO(ry) a bit ghetto, we can do better than round trip serialization ...
	s, _ := n.ToString()
	clone, _ := FromString(s)
	return clone

}

// LinkNetwork performs the business of internal pointer linking within a Net.
// When we read a Net from a file or database, the traversal pointers are not
// linked. This function ensures that all the traversal pointers in a Net data
// structure are linked.
func LinkNetwork(net *Net) error {

	for _, l := range net.Links {
		for i, e := range l.Endpoints {
			_, _, n := net.Root().GetNode(e.Node)
			if n == nil {
				return fmt.Errorf(
					"could not resolve endpoint node %s:%d", e.Node, e.Index)
			}
			l.Endpoints[i].Endpoint = n.Endpoints[e.Index]
		}
		setNeighbors(l)
	}

	//recurse networks
	for _, n := range net.Nets {
		n.Parent = net
		LinkNetwork(n)
	}

	return nil

}

// PrepNetwork ensures that all the Neighbor maps are ready. They are not ready
// upon deserialization. This is a precondition to LinkNetwork
func PrepNetwork(net *Net) {
	//TODO(ry) we should probably just integrate this into LinkNetwork

	if net.Props == nil {
		net.Props = make(Props)
	}

	for _, n := range net.Nodes {
		n.Parent = net

		for i, e := range n.Endpoints {
			e.Index = i
			e.Parent = n
			e.Neighbors = make(map[*Endpoint]*Neighbor)
		}
	}

	for _, n := range net.Nets {
		n.Parent = net
		PrepNetwork(n)
	}

}

// Root traverses upward from this Net until the root Net is found.
func (net *Net) Root() *Net {
	if net.Parent == nil {
		return net
	}
	return net.Parent.Root()
}

// ToFile writes the specified Net to the specified filename
func ToFile(net *Net, filename string) error {
	//TODO(ry) redundant with Net.ToFile()?

	js, err := json.MarshalIndent(net, "", "  ")
	if err != nil {
		return err
	}

	return ioutil.WriteFile(filename, js, 0660)
}

func (x SortedProps) Len() int           { return len(x) }
func (x SortedProps) Swap(i, j int)      { x[i], x[j] = x[j], x[i] }
func (x SortedProps) Less(i, j int) bool { return x[i].Key < x[j].Key }

func sortProps(p Props) SortedProps {

	result := make(SortedProps, 0, len(p))
	for k, v := range p {
		result = append(result, Prop{k, v})
	}
	sort.Sort(result)
	return result

}

func propString(p Props, indent string) string {
	st := ""
	ps := sortProps(p)
	for _, x := range ps {
		st += indent + fmt.Sprintf("  %s: %+v\n", x.Key, x.Value)
	}
	return st
}

// Node methods ---------------------------------------------------------------

// NewNode creates a new empty Node object.
func NewNode(name string, p Props) *Node {
	return &Node{
		Id:    name,
		Props: p,
	}
}

// Endpoint creates a new Endpoint, adds it to this Node and returns a pointer
// to it.
func (n *Node) Endpoint() *Endpoint {
	ep := &Endpoint{
		Props:     make(Props),
		Neighbors: make(map[*Endpoint]*Neighbor),
		Index:     len(n.Endpoints),
		Parent:    n,
	}
	n.Endpoints = append(n.Endpoints, ep)
	return ep
}

func (n *Node) GetEndpoint(label string) *Endpoint {

	for _, e := range n.Endpoints {
		if e.Label() == label {
			return e
		}
	}

	return nil

}

func (n *Node) GetEndpointById(id string) *Endpoint {

	parts := strings.Split(id, ".")
	index, err := strconv.Atoi(parts[len(parts)-1])
	if err != nil || index > len(n.Endpoints) {
		return nil
	}

	return n.Endpoints[index]

}

// Set sets the provided properties on this Node. This is a logical merge, any
// resident properties with the same key will be overwritten. Non-colliding
// resident properties will remain in tact.
func (n *Node) Set(p Props) *Node {
	for k, v := range p {
		n.Props[k] = v
	}
	return n
}

// Clone make a deep clone of this Node.
func (n *Node) Clone() *Node {
	n_ := &Node{
		Id:    n.Id,
		Props: n.Props,
	}
	for _, e := range n.Endpoints {
		n_.Endpoints = append(n_.Endpoints, &Endpoint{
			Index: e.Index,
			Props: e.Props,
		})
	}

	return n_
}

// Valence returns the number of neigbors this node has.
func (n *Node) Valence() int {
	v := 0
	for _, e := range n.Endpoints {
		v += len(e.Neighbors)
	}
	return v
}

// Neighbors returns a list containing all this Node's neighbors. The list of
// endpoints returned are those of the neighbors.
func (n *Node) Neighbors() []*Endpoint {

	var result []*Endpoint
	for _, e := range n.Endpoints {
		for _, n := range e.Neighbors {
			result = append(result, n.Endpoint)
		}
	}
	return result

}

func (n *Node) GetNeighbor(id string) (*Endpoint, *Endpoint) {

	for _, e := range n.Endpoints {
		for _, n := range e.Neighbors {
			if n.Endpoint.Parent.Id == id {
				return e, n.Endpoint
			}
		}
	}
	return nil, nil

}

func (n *Node) SelectNeighbors(
	selector func(nbr *NodeNeighbor) bool) []*NodeNeighbor {

	var result []*NodeNeighbor

	for _, e := range n.Endpoints {
		for _, nbr := range e.Neighbors {

			nbr := &NodeNeighbor{
				Local:  e,
				Remote: nbr.Endpoint,
				Link:   nbr.Link,
			}
			if selector(nbr) {
				result = append(result, nbr)
			}
		}
	}

	return result

}

// Label attempts to return the friendliest label that can be applied to a Node.
// If the Node has a name in its properties, that is returned. Otherwise the
// Nodes's ID is returned.
func (n *Node) Label() string {
	if n == nil {
		return ""
	}
	label := n.Id
	name, ok := n.Props["name"]
	if ok {
		label = name.(string)
	}
	return label
}

// Link methods ---------------------------------------------------------------

// Label attempts to return the friendliest label that can be applied to a Link.
// If the Link has a name in its properties, that is returned. Otherwise a
// a string concatenating the parent Node label of each Endpoint in the link over
// tildas is returned. For example "a~b~c".
func (l *Link) Label() string {

	if l == nil {
		return ""
	}

	name, ok := l.Props["name"]
	if ok {
		return name.(string)
	}

	label := ""
	for _, x := range l.Endpoints {
		label += x.Endpoint.Parent.Label() + "~"
	}

	return label[:len(label)-1]
}

// IsLocal determines if all endpoints in a link belong to the same Net.
func (l *Link) IsLocal() bool {

	for _, x := range l.Endpoints {
		for _, y := range l.Endpoints {

			if x.Endpoint == nil || y.Endpoint == nil {
				return false
			}

			if x.Endpoint.Parent == nil || x.Endpoint.Parent.Parent == nil ||
				y.Endpoint.Parent == nil || y.Endpoint.Parent.Parent == nil {
				panic("orphaned endpoint")
			}

			if x.Endpoint.Parent.Parent.Id != y.Endpoint.Parent.Parent.Id {
				return false
			}
		}
	}

	return true

}

// Set sets the provided properties on this Link. This is a logical merge, any
// resident properties with the same key will be overwritten. Non-colliding
// resident properties will remain in tact.
func (l *Link) Set(p Props) *Link {
	for k, v := range p {
		l.Props[k] = v
	}
	return l
}

// Clone creates a deep clone of this Link.
func (l *Link) Clone() *Link {
	l_ := &Link{
		Id:    l.Id,
		Props: l.Props,
	}
	for _, e := range l.Endpoints {
		l_.Endpoints = append(l_.Endpoints, e)
	}

	return l_
}

// Endpoint methods -----------------------------------------------------------

// Set sets the provided properties on this Endpoint. This is a logical merge,
// any resident properties with the same key will be overwritten. Non-colliding
// resident properties will remain in tact.
func (e *Endpoint) Set(p Props) *Endpoint {
	for k, v := range p {
		e.Props[k] = v
	}
	return e
}

// Label attempts to return an endpoint Label.If the Node has a name in its
// properties, that is returned. Otherwise the Nodes's ID is returned.
func (e *Endpoint) Label() string {
	if e == nil {
		return ""
	}
	label := fmt.Sprintf("%s:%d", e.Parent.Label(), e.Index)
	name, ok := e.Props["name"]
	if ok {
		label = name.(string)
	}
	return label
}

// Tag an endpoint
func (e *Endpoint) Tag(tags ...string) *Endpoint {

	tags_, ok := e.Props["tags"]
	if ok {
		tags, ok := tags_.([]string)
		if ok {
			tags = append(tags, tags...)
		} else {
			// overwrite whatever was there, tags is reserved for tags, any
			// other use can result in data loss
			e.Props["tags"] = tags
		}
	} else {
		e.Props["tags"] = tags
	}

	return e

}

func (es Endpoints) Proto(proto interface{}) Endpoints {

	var result Endpoints
	for _, e := range es {
		protocol, ok := e.Props["protocol"]
		if ok && protocol == proto {
			result = append(result, e)
		}
	}
	return result

}

func (es Endpoints) Has(key string, value interface{}) Endpoints {

	var result Endpoints
	for _, e := range es {
		v, ok := e.Props[key]
		if ok && v == value {
			result = append(result, e)
		}
	}
	return result

}

func (es Endpoints) Tag(tag string) Endpoints {

	var result Endpoints
	for _, e := range es {
		tags_, ok := e.Props["tags"]
		tags, ok := tags_.([]string)
		if ok {
			for _, t := range tags {
				if t == tag {
					result = append(result, e)
				}
			}
		}
	}
	return result

}

func (es Endpoints) Next() *Endpoint {

	for _, e := range es {
		if len(e.Neighbors) == 0 {
			return e
		}
	}

	return nil

}

func (es Endpoints) RNext() *Endpoint {

	for i := len(es) - 1; i >= 0; i-- {
		if len(es[i].Neighbors) == 0 {
			return es[i]
		}
	}

	return nil

}

func (n *Node) Next(kind string) *Endpoint {

	return n.Endpoints.Has("kind", kind).Next()

}

func (n *Node) RNext(kind string) *Endpoint {

	return n.Endpoints.Has("kind", kind).RNext()

}

func (n *Node) PNext(proto interface{}) *Endpoint {

	return n.Endpoints.Proto(proto).Next()

}

// helpers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func setNeighbors(link *Link) {
	for _, x := range link.Endpoints {
		for _, y := range link.Endpoints {
			if x == y || x.Endpoint == nil || y.Endpoint == nil {
				continue
			}
			if x.Endpoint.Neighbors == nil {
				x.Endpoint.Neighbors = make(map[*Endpoint]*Neighbor)
				continue
			}
			if y.Endpoint.Neighbors == nil {
				y.Endpoint.Neighbors = make(map[*Endpoint]*Neighbor)
				continue
			}
			x.Endpoint.Neighbors[y.Endpoint] = &Neighbor{link, y.Endpoint}
			y.Endpoint.Neighbors[x.Endpoint] = &Neighbor{link, x.Endpoint}
		}
	}

}
