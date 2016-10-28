Want simple Vagrant install for Ubuntu/node/nodem/jasmine etc

See: https://github.com/vistadataproject/nodeVISTA/issues/74

vdp dev overlay on that

Also see _VBoxManage_

# Vagrant file

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




