package main

import (
	"encoding/binary"
	"net"
	"os"
	"text/tabwriter"

	"gitlab.com/mergetb/xir/lang/go/hw"
	"gitlab.com/mergetb/xir/lang/go/tb"
)

var tw = tabwriter.NewWriter(os.Stdout, 0, 0, 1, ' ', 0)

type Ip struct {
	ip net.IP
}

func (x *Ip) IP() net.IP {
	ip := make(net.IP, len(x.ip))
	copy(ip, x.ip)
	return ip
}

func (x *Ip) String() string {
	return x.IP().String()
}

func (x *Ip) Next() *Ip {

	var i uint32
	if i4 := x.ip.To4(); i4 != nil {
		i = binary.BigEndian.Uint32(i4)
		i++
		binary.BigEndian.PutUint32(i4, i)
	} else {
		i = binary.BigEndian.Uint32(x.ip)
		i++
		binary.BigEndian.PutUint32(x.ip, i)
	}

	return x
}

func connect(r *tb.Resource, nic, port int, cable *hw.Cable, side, connector int) {

	r.System.Device.Nics[nic].Ports[port].Connector = cable.Connectors[side][connector]

}

func nics(r *tb.Resource) []hw.Nic {
	return r.System.Device.Nics
}

type BgpAS int

func (x *BgpAS) Next() BgpAS {
	v := *x
	*x += 1
	return v
}
