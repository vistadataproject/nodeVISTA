# Caché VistA Development VM

__Background__: VDP MVDM must work on Cache and GT/M. The current nodeVISTA is VISTA on GT/M. We need to have a Vagrant and
supporting scripts that sets up nodeVISTA on Cache. __The contents here will be merged__ with the GT/M Vagrant and other
scripts in nodeVISTA.

Issue: [Support Cache in nodeVISTA](https://github.com/vistadataproject/nodeVISTA/issues/18)

The scripts contained within this project allows a user to stand-up, install and configure a VistA instance on Caché within
a CentOS 6.5 VM.

## Prerequisites
Before creating the development VM, you'll need to ensure that you have the following required tools installed and resources
gathered on your workstation:

### Tools
* [Git](http://www.git-scm.com) - Tested with v2.5.4
* [Vagrant](http://downloads.vagrantup.com) - Tested with v1.6.5
* [VirtualBox](https://www.virtualbox.org/wiki/Downloads) - Tested with v4.3.30

### Resources
* **_REQUIRED_ - Connection to the Internet**:

    The scripts download multiple resources from the Internet, so it goes without saying that is absolutely required.
* **_REQUIRED_ - Caché installer package for 64-bit RHEL**:

    Since Caché is a licensed product, you must provide your own installer package to use with the project script bundle.
    Intersystems _does_ offer an single-user evaluation copy of Caché which can be downloaded after registration
    from the Intersystems site: https://download.intersystems.com/download/register.csp.  **The installer file must be copied
to the 'resources' project subdirectory!**
* **_OPTIONAL_ - Caché license file**:

    If you have a license file for Caché that you'd like to use with the Caché installation (_cache.key_), **that file must
also be copied to the 'resources' project subdirectory.**
* **_OPTIONAL_ - Caché export file (CACHE.DAT):**

    By default, the scripts will retrieve a fresh copy of VistA from the OSEHRA FOIA VistA archives.  However, if you'd like
    to use your own Caché export file, **you can copy your version of CACHE.DAT into the 'resources' project subdirectory.**


## Installation
Begin by cloning this repository via Git using the following command:
```
git clone https://github.com/vistadataproject/nodeVISTA.git
```

Once all the prerequisites in place and after you have cloned the repository, enter the repository directory and
kick-start the installation process from within the base project directory by typing the following command:
```
./createVM.sh
```
That's it!  Now go get some coffee, since the installation will take about 10-30 minutes, depending on download speeds.


## What Just Happened?
If all went well, the scripts created an up-to-date CentOS 6.5 64-bit VM with the following parameters:
```
  IP Address: 10.2.2.201 (Private Network)
    Hostname: cache-vista
Dev Username: vistad
Dev Password: vistaisdata
  Open Ports: 57772 (Caché System Management Portal)
              1972  (Caché SuperServer)
              80    (Web Access)
              9430  (RPC Broker)
```

The scripts then installed and configured the Caché software and base VistA instance from an OSEHRA FOIA VistA archive
(or your own custom CACHE.DAT file, if you provided it) with the following parameters:
```
Install Directory: /opt/cachesys/cache
    Instance Name: cache
 Service Commands: STOP - sudo service cache start
                   START - sudo service cache stop
```

The post-install scripts associated with the Caché installation will also configure and add the RPC Broker listener service to
the Taskman task list. Note that if you used the default, the VistA instance installed is a base system with no clinical data added.


## Installation Verification / Smoke Test
One way to verify that Cache was installed and is running properly is to access the Cache Management Portal via CSP:
http://10.2.2.201:57772/csp/sys/UtilHome.csp

If the page does not come up, something may have gone wrong during installation (see the Troubleshooting section for details)


## Operation
After successful creation of the VM, you can manipulate the VM using standard Vagrant commands:
* Start an SSH session in the VM: `vagrant ssh`
* Halt the VM: `vagrant halt`
* Restart a halted VM: `vagrant up`
* Destroy the VM: `vagrant destroy --force`


## Troubleshooting
TBD
