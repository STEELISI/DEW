use IO::Socket::INET;

$peer = $ARGV[0];


my ($socket, $data);

$socket = new IO::Socket::INET (
    PeerAddr => 'controller.multi.DEW.isi.deterlab.net:17711',
    Proto => 'udp'
    );

print "Peer $peer socket $socket\n";
$data = $ARGV[1];
$socket->send($data);
