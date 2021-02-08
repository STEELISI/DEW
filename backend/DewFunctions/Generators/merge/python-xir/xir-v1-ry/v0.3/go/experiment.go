package xir

import (
	"encoding/base64"
	"fmt"

	"google.golang.org/protobuf/proto"
)

func (n *Node) Identify() string {
	return n.Id
}

func (n *Node) Degree() int {

	return len(n.Sockets)

}

// TODO all these serialization functions need to be guarded by XIR semvers to
// avoid subtle and very difficult to track bugs from creeping in due to protobuf
// spec skew or protoc versions.
func NetworkFromB64String(pbuf string) (*Network, error) {

	data, err := base64.StdEncoding.DecodeString(pbuf)
	if err != nil {
		return nil, err
	}

	return NetworkFromRawString(string(data))

}

func NetworkFromRawString(pbuf string) (*Network, error) {

	n := new(Network)
	return n, proto.Unmarshal([]byte(pbuf), n)

}

func (n *Network) ToBuf() ([]byte, error) {

	return proto.Marshal(n)

}

func (f *Network) ToB64Buf() ([]byte, error) {

	buf, err := proto.Marshal(f)
	if err != nil {
		return nil, err
	}

	encoded := base64.StdEncoding.EncodeToString(buf)

	return []byte(encoded), nil

}

func (n *Network) Lift() *Topology {

	ifxmap := make(map[string]*Interface)
	edgemap := make(map[string]*Edge)

	t := new(Topology)

	// build maps

	for _, n := range n.Nodes {

		d := &Device{Data: n}

		for _, s := range n.Sockets {

			ifx := &Interface{
				Device: d,
				Data:   s,
			}
			d.Interfaces = append(d.Interfaces, ifx)
			ifxmap[s.Label(n.Id)] = ifx

		}

		t.Devices = append(t.Devices, d)

	}

	for _, l := range n.Links {

		cnx := &Connection{Data: l}

		for _, e := range l.Endpoints {

			edge := &Edge{
				Data:       e,
				Connection: cnx,
			}
			cnx.Edges = append(cnx.Edges, edge)
			edgemap[e.Label(l.Id)] = edge
		}

		t.Connections = append(t.Connections, cnx)

	}

	// connec topology

	for _, d := range t.Devices {
		for _, i := range d.Interfaces {
			if i.Data.(*Socket).Endpoint != nil {
				i.Edge = edgemap[i.Data.(*Socket).Endpoint.Label()]
			}
		}
	}

	for _, c := range t.Connections {
		for _, e := range c.Edges {
			if e.Data.(*Endpoint) != nil {
				e.Interface = ifxmap[e.Data.(*Endpoint).Socket.Label()]
			}
		}
	}

	return t

}

func (s *Socket) Label(node string) string {
	return fmt.Sprintf("%s.%d", node, s.Index)
}

func (e *Endpoint) Label(link string) string {
	return fmt.Sprintf("%s.%d", link, e.Index)
}

func (n *Network) GetNode(id string) *Node {

	for _, x := range n.Nodes {
		if x.Id == id {
			return x
		}
	}

	return nil

}

func (n *Network) GetLink(id string) *Link {

	for _, x := range n.Links {
		if x.Id == id {
			return x
		}
	}

	return nil

}
