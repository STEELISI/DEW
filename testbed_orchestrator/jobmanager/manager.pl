# Accept and run scripts in a separate process

$usage = "$0 path-to-script label start|stop\n";
if ($#ARGV < 2)
{
    print $usage;
    exit 1;
}
$script = $ARGV[0];
$label = $ARGV[1];
$action = $ARGV[2];
if ($action ne "start" && $action ne "stop")
{
    print "Non-supported action $action\n";
    exit 1;
}
if (!-e $script)
{
    print "Script $script does not exist\n";
    exit 1;
}
