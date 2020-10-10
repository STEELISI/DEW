# About Monit

Monit is a utility for managing and monitoring processes, programs, files, directories and filesystems on a Unix system. Monit conducts automatic maintenance and repair and can execute meaningful causal actions in error situations. E.g. Monit can start a process if it does not run, restart a process if it does not respond and stop a process if it uses too much resources. You can use Monit to monitor files, directories and filesystems for changes, such as timestamps changes, checksum changes or size changes.
Monit is controlled via an easy to configure control file based on a free-format, token-oriented syntax. Monit logs to syslog or to its own log file and notifies you about error conditions via customisable alert messages. Monit can perform various TCP/IP network checks, protocol checks and can utilise SSL for such checks. Monit provides a HTTP(S) interface and you may use a browser to access the Monit program.

Documentation: https://mmonit.com/monit/documentation/monit.html

## How are we using it in dew

To share an experiment with another user, both users must have accounts in DEW. Along with sharing, the creator of the experiment can also control the access a user has for the experiment.

### Access levels
There are 3 levels

* **Spectator/Read only** - The user can only view the experiment but cannot change it.
* **Developer/Write** - The user can change the contents of the experiment but cannot change sharing settings
* **Admin/Manage** - The user will have the ability to change all aspects of an experiment. The creator of the experiment will have this level of access.


## Sharing in Google Drive

Another way to share with others is to save the experiment to Google Drive. After saving to Google Drive, the user can share the files to anyone just like any other folder or file on Google Drive. To know more about how to save to Google Drive, [click here](../experiment_page#save-to-Google-drive).

