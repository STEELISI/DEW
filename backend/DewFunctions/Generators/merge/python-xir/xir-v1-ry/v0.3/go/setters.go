package xir

type SetCapacity interface {
	SetCapacity(c uint64)
}

func (d *Dimm) SetCapacity(c uint64) {
	d.Capacity = c
}

func (d *Disk) SetCapacity(c uint64) {
	d.Capacity = c
}

func (p *Port) SetCapacity(c uint64) {
	p.Capacity = c
}

func (n *NIC) SetCapacity(c uint64) {
	for _, port := range n.Ports {
		port.SetCapacity(c)
	}
}

type SetConnector interface {
	SetConnector(c ConnectorKind)
}

func (n *NIC) SetConnector(c ConnectorKind) {
	for _, port := range n.Ports {
		port.SetConnector(c)
	}
}

func (p *Port) SetConnector(c ConnectorKind) {
	p.FormFactor = c
}

func (c *Connector) SetConnector(k ConnectorKind) {
	c.Kind = k
}

func (e *End) SetConnector(k ConnectorKind) {
	for _, x := range e.Connectors {
		x.Kind = k
	}
}

func (c *Cable) SetConnector(k ConnectorKind) {
	for _, e := range c.Ends {
		e.SetConnector(k)
	}
}
