Want simple Vagrant install for Ubuntu/node/nodem/jasmine etc

See: https://github.com/vistadataproject/nodeVISTA/issues/74

vdp dev overlay on that

Also see _VBoxManage_

GOAL: nodeVISTA has a simple set of Vagrant/scripts that installs a VDP compatible OSEHRA VISTA.

NOTE: NO NEED TO CLONE WHOLE OSEHRA VISTA as GTM install's vista instance add (when no tests)
will clone VISTA-M into /usr/local/src on the VM.

# Vagrant file

... optional: explicit name
1. sets up Ubuntu
2. forwards ports and IP
3. shared folder ie/ can then run things back in main system from there
4. end with autoinstaller being called with -e (load EWD) and instance name (ENV(instance))

# Autoinstaller

Defaults arguments like 'instance' as not set in VAGRANT ie/ ENV var.

```text
if [[ -z $instance ]]; then
    instance=osehra
fi
```

Note the line endings part where it relies on having a vagrant directory (mounted for copying)
and this allows it to read scripts from the host system. The host may be windows so it
a/cs for this. If there is no vagrant, then it git clones the setup again.

Need to add cloning OSEHRA VISTA but 

# GTM

Note switch of 'foia' to $instance (osehra)

```text
# Modify xinetd.d scripts to reflect $instance
perl -pi -e 's/foia/'$instance'/g' $basedir/bin/*.sh
perl -pi -e 's/foia/'$instance'/g' $basedir/etc/xinetd.d/vista-*

# Modify init.d script to reflect $instance
perl -pi -e 's/foia/'$instance'/g' $basedir/etc/init.d/vista
```




