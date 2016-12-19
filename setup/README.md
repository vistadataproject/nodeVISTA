# osehraVISTA to nodeVISTA

### The following outlines how to install osehraVISTA and enable nodeVISTA development.

* Download and install [Virtualbox](https://www.virtualbox.org/wiki/Downloads?replytocom=98578)
* Download and install [Vagrant](https://www.vagrantup.com/downloads.html)

* Once you have Vagrant and VirtualBox setup open a terminal and cd to the nodeVista/setup directory and run the following:

    ```text
    $ vagrant up
    ```
    The initial Vagrant up process will invoke the "setup.sh" script. This script will take about 45-60 minutes to finish. Subsequent calls to vagrant up will not take this long.

    Note: Virtual Box VMs go under _/home/{user}/VirtualBox VMs/

* Check that FMQL was installed successfully by navigating your browser to [http://10.2.2.100:9000](http://10.2.2.100:9000).

### To develop inside the VM: 

* git clone the [VDM](https://github.com/vistadataproject/VDM) git and go into _prototypes_. There you'll find the existing VDP VDM prototypes and this is also where we develop new prototypes.
* Uncomment line 46 inside __Vagrantfile__ and share the VDM folder with your VistA instance.

    ```text
    config.vm.synced_folder "../../", "/home/vdp/dev", owner: "vdp", group: "vdp"
    ```

    You may need to modify "../../" so it points to your development folder (i.e. /Users/username/projects/vistadata/VDM/) 

* Reload/restart VistA instance to bring up shared folder.

    ```text
    $ vagrant reload
    ```

* Navigate to VDM prototypes directory and run tests for the problems domain. 
    * Open up a terminal and SSH into the VistA instance:

        ```text
        $ vagrant ssh <-- ssh vagrant@10.2.2.100 will also work (password is vagrant)
        
        $ su vdp <-- password is vdp
        
        $ cd
        
        $ cd dev/VDM/prototypes
        
        $ npm install <-- install prototype dependencies (only need to do this once)
        
        $ cd problems
        
        $ npm install <-- install problem test dependencies (only need to do this once per domain)
        
        $ npm test <-- kicks off the problem domain tests
        ```

Finally - how to __Suspend (pause) and Resume__: to temporarily suspend the VM, just call _vagrant suspend_ and resume with _vagrant resume_.
