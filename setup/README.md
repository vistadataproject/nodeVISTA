# nodeVISTA

### The following outlines how to install nodeVISTA

* Download and install [Virtualbox](https://www.virtualbox.org/wiki/Downloads?replytocom=98578)
* Download and install [Vagrant](https://www.vagrantup.com/downloads.html)

* From the command line, install the following Vagrant plugin(s):

    ```text
    $ vagrant plugin install vagrant-timezone
    ```

* Once you have Vagrant and VirtualBox setup open a terminal and cd to the __nodeVista/setup/__ directory and run the following:

    ```text
    $ vagrant up
    ```
    The initial Vagrant up process will invoke the "setup.sh" script. This script will take about 45-60 minutes to finish. Subsequent calls to vagrant up will not take this long.

    Note: Virtual Box VMs go under /Users/{user}/VirtualBox VMs/

* Check that FMQL was installed successfully by navigating your browser to [http://10.2.2.100:9000](http://10.2.2.100:9000).

### To develop inside the VM: 

* git clone the [VDM](https://github.com/vistadataproject/VDM) git and go into _prototypes_. There you'll find the existing VDP VDM prototypes and this is also where we develop new prototypes.
* Uncomment line 46 inside __Vagrantfile__ and share the VDM folder with your VistA instance.

    ```text
    config.vm.synced_folder "../../", "/home/vdp/dev", owner: "vdp", group: "vdp"
    ```

    You may need to modify "../../" so it points to your development folder (i.e. /Users/{user}/projects/vistadata/VDM/) 

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
        
        $ sudo apt install npm
        
        $ npm install <-- install prototype dependencies (only need to do this once)
        
        $ cd problems
        
        $ npm install <-- install problem test dependencies (only need to do this once per domain)
        
        $ npm test <-- kicks off the problem domain tests
        ```

Finally - how to __Suspend (pause) and Resume__: to temporarily suspend the VM, just call _vagrant suspend_ and resume with _vagrant resume_.

## CPRS Installation
1. On a Windows box, download, unzip, and run the Osehra CPRS installer: [CPRS_Demo_0613.zip](https://github.com/vistadataproject/documents/raw/master/cprs/osehra/v69/CPRS_Demo_0613.zip)
2. Download latest version of VA's CPRS binary: [CPRSChart30v75.zip (v1.0.30.75)](http://45.33.127.157/files/CPRSChart30v75.zip).
3. Unzip CPRSChart30v75.zip and rename the uncompressed binary CPRSChart30v75.exe to CPRSChart.exe.
4. Overwrite C:\Program Files\VistA\CPRS\CPRSChart.exe with the latest binary (v1.0.30.75).
5. Download latest CommonFiles DLLs [CPRS30v72_dll.zip] (http://45.33.127.157/files/CPRS30v72_dll.zip).
6. Unzip CPRS30v72_dll.zip and copy/overwrite the contents of the CPRS30v72_dll/ folder to C:\Program Files (x86)\VistA\Common Files.
7. Copy the Osehra VistA Desktop Shortcut and rename it to something like "RPC Server", etc.
8. Right click on the new desktop shortcut ("RPC Server") and select "properties".
9. Modify the target to the following: "C:\Program Files\VistA\CPRS\CPRSChart.exe" CCOW=disable s=10.2.2.100 p=9010 showrpcs

**Note "10.2.2.100" is the presumed the IP address of the box RPC Server is running on and "9010" is the port that RPC Server is listening on for incoming RPC traffic. These settings match up with the RPC Server configurations inside of "cfg/config.js".**
