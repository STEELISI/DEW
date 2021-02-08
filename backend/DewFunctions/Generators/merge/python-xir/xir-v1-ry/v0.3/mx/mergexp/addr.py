import ipaddress

def ip4(*args):
    addrs = []
    for x in args:
        try:
            ip = ipaddress.IPv4Interface(x)
            addrs.append(x)
        except:
            raise("invalid ipv4 %s"%x)
    return addrs

