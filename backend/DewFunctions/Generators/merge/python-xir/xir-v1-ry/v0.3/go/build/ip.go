package build

import (
	"encoding/binary"
	"fmt"
	"net"
)

type IPCounter struct {
	ip    net.IP
	ipnet *net.IPNet
	ctr   uint32
	buf   []byte
}

func NewIPCounter(addr string) (*IPCounter, error) {

	ip, ipnet, err := net.ParseCIDR(addr)
	if err != nil {
		return nil, err
	}

	c := &IPCounter{
		ip:    ip,
		ipnet: ipnet,
	}
	c.buf = []byte(ip.To4())
	c.ctr = binary.BigEndian.Uint32(c.buf)

	return c, nil

}

func (c *IPCounter) Inc() { c.ctr++ }

func (c *IPCounter) Get() net.IP {

	binary.BigEndian.PutUint32(c.buf, c.ctr)
	return net.IP(c.buf).To4()

}

func (c *IPCounter) String() string {

	sub, _ := c.ipnet.Mask.Size()

	return fmt.Sprintf("%s/%d", c.ip, sub)

}
