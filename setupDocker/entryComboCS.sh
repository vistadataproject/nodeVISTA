#!/bin/bash
su vdp -c "source /home/nodevista/etc/env && pm2 start /home/vdp/FMQL/webservice/fmqlServer.js"
source /home/nodevista/etc/env && pm2 start /home/vdp/nodeVISTA/clinicalService/index.js
/home/nodevista/bin/start.sh
