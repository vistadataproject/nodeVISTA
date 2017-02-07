# nodeVISTA

####These setup instructions are for advanced users only. Please refer to the [demo](https://github.com/vistadataproject) wiki to get started quickly.

### The following outlines how to install nodeVISTA from the setup shell script.

* Download and install [Virtualbox](https://www.virtualbox.org/wiki/Downloads?replytocom=98578)
* Download and install [Vagrant](https://www.vagrantup.com/downloads.html)

* From the command line, install the following Vagrant plugin(s):

    ```text
    $ vagrant plugin install vagrant-timezone
    ```

* Once you have Vagrant and VirtualBox setup open a terminal and cd to the __nodeVista/setup/__ directory. Open up the Vagrantfile in a text editor and make the following changes:

    * Comment out the following lines:
       ```text
        (Around line 11)
        
        config.vm.box = "nodeVISTA"
        config.vm.box_url = "http://45.33.127.157/files/vagrant/nodeVISTA.json"
        ```
        
    * Uncomment theses lines:
       
       ```text
          (Around line 14)
          
          # Uncomment for manual setup (see setup provision step commented out at the bottom of this script)
          config.vm.box = "addgene/xenial64" #Official Ubuntu 16.04 LTS (Xenial Xerus) Daily Build Cloud Image
        ...
        
        (Around line 144, towards the bottom) 
        
        # Uncomment for manual setup
        config.vm.provision :shell do |s|
           s.path = "setup.sh"
        end
        ```
        

* Then from the command-line run the following:

    ```text
    $ vagrant up
    ```
   The initial Vagrant up process will invoke the "setup.sh" script. This script will take about 45-60 minutes to finish. Subsequent calls to vagrant up will not take this long.

    Note: Virtual Box VMs go under /Users/{user}/VirtualBox VMs/ on macOS.

* Check that FMQL was installed successfully by navigating your browser to [http://10.2.2.100:9000](http://10.2.2.100:9000).

## CPRS Installation
1. On a Windows7 or Windows10 box, download, unzip, and run the Osehra CPRS installer: [CPRS_Demo_0613.zip](https://github.com/vistadataproject/documents/raw/master/cprs/osehra/v69/CPRS_Demo_0613.zip)
2. Download latest version of VA's CPRS binary: [CPRSChart30v75.zip (v1.0.30.75)](http://45.33.127.157/files/CPRSChart30v75.zip).
3. Unzip CPRSChart30v75.zip and rename the uncompressed binary CPRSChart30v75.exe to CPRSChart.exe.
4. Overwrite  C:\Program Files (x86)\VistA\CPRS\CPRSChart.exe with the latest binary (v1.0.30.75).
5. Download latest CommonFiles DLLs [CPRS30v72_dll.zip] (http://45.33.127.157/files/CPRS30v72_dll.zip).
6. Unzip CPRS30v72_dll.zip and copy/overwrite the contents of the CPRS30v72_dll/ folder to C:\Program Files (x86)\VistA\Common Files.
7. Copy the Osehra VistA Desktop Shortcut and rename it to something like "RPC Server", etc.
8. Right click on the new desktop shortcut ("RPC Server") and select "properties".
9. Modify the target to the following: "C:\Program Files (x86)\VistA\CPRS\CPRSChart.exe" CCOW=disable s=10.2.2.100 p=9010 showrpcs
10. Run "RPC Server" from windows desktop
11. Access / Verify codes: fakedoc1 / 1doc!@#$

Summary of paths and contents:
```text
C:\Program Files (x86)\VistA\Common Files\
    CPRS30v72dll
    GMV_VitalsViewEnter
    GMV_VitalsViewEnter.cnt
    GMV_VitalsViewEnter.dll

C:\Program Files (x86)\VistA\CPRS\
    CPRSChart.exe  <-- relabeled from CPRSChart30v75.exe
    CPRS
    CPRS.cnt
    borlndmm.dll

Desktop:
    RPC Server <-- relabelled from Osehra VistA 
```

  



