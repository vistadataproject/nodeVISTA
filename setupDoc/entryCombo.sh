#!/bin/bash
# Invoke with ENTRYPOINT [/home/nodevista/entry.sh] - temporary until move FMQL to own container
/home/nodevista/bin/start.sh
su vdp -c "pm2 start /home/vdp/FMQL/webservice/fmqlServer.js && pm2 save >> /home/vdp/logs/fmqlStartup.log"
