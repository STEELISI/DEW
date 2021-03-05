# Listen on socket for start and kill events

use IO::Socket::INET;

%tree=();
%children=();
%childpids=();

# build a list of parent/child jobs
sub pstree
{
    opendir(my $dh, "/proc") || die "cannot open dir";
    # Rebuild tree
    %tree=();
    %children=();
    @files = readdir($dh);
    for $f (@files)	
    {
	if ($f =~ /^\d+$/)
	{
	    $fdh = new IO::File("/proc/$f/stat");
	    $line = <$fdh>;
	    @items = split /\s+/, $line;
	    $pid = $items[0];
	    $cmd = $items[1];
	    $i = 2;
	    while ($cmd !~ /\)$/)
	    {
		$cmd = $cmd . " " . $items[$i++];
	    }
	    $state = $items[$i++];
	    $ppid = $items[$i++];
	    $tree{$pid}{'cmd'} = $cmd;
	    $tree{$pid}{'state'} = $state;
	    $tree{$pid}{'parent'} = $ppid;
	    push(@{$children{$ppid}}, $pid);
	}
    }
}

#Main program

my ($socket,$received_data);
my ($peeraddress,$peerport);

$socket = new IO::Socket::INET (
    LocalHost => 'controller.multi.dew.isi.deterlab.net',
    LocalPort => '17711',
    Proto => 'udp',
    ) or die "ERROR in Socket Creation : $\n";

while(1)
{
    # read operation on the socket
    $socket->recv($received_data,1024);

    #assume what we got is either in the format
    #start scriptfile num or
    #stop scriptfile num
    @elems = split /\s+/, $received_data;
    if ($#elems != 2)
    {
	#wrong format
	next;
    }
    $cmd = $elems[0];
    $script = $elems[1];
    $num = $elems[2];
    if ($cmd ne "start" && $cmd ne "stop")
    {
	next;
    }
    if ($cmd eq "start")
    {
	my $childpid = fork() or exec("/bin/bash $script");  # fork off a child
	$childpids{$script . "-" . $num} = $childpid;
	print "Got child pid $childpid\n";
    }
    else
    {
	pstree();
	if (exists($childpids{$script . "-" . $num}))
	{
	    my $pid =  $childpids{$script . "-" . $num};
	    while(exists($children{$pid}))
	    {
		print "Should kill $pid\n";
		for $c (@{$children{$pid}})
		{
		    print "$c ";
		}
		# should do this recursively		
	    }
	    $children{$pid} = "";
	}	
    }
    pstree();
    for $p (keys %children)
    {
	print "$p ($tree{$p}{'cmd'}): ";
	for $c (@{$children{$p}})
	{
	    print "$c ";
	}
	print "\n";
    }
}
