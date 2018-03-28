#!/bin/bash
su vdp -c "source /home/nodevista/etc/env && pm2 start /home/vdp/FMQL/webservice/fmqlServer.js"
/home/nodevista/bin/start.sh
