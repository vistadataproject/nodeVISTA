
This is a copy of ewd-qoper8 for use in nodeVISTA for specific use in nodeVISTA with changes to the code for compatibility issues in packaging.
The use of this copy of ewd-qoper8 is not intended to be long term and will be removed from nodeVISTA if and when ewd-qoper8 is updated in a way that eliminates the need for the modifications required for packaging compatibility with nodeVISTA.
Also the as the versions change in ewd-qoper8, the interface can change. For example in lib/worker/proto/messageHandler.js, the send() and finished() wrappers were changed. When once the results were returned in the messageObj unaltered, the current version deletes "type". These types of unexpected changes to API's, along with hard file paths necessitate the modified copy in nodeVISTA.
The copy was made from github: https://github.com/robtweed/ewd-qoper8 (build 3.10, Nov 7, 2016).



# ewd-qoper8: High-performance Node.js Message Queue

Rob Tweed <rtweed@mgateway.com>  
24 February 2016, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

Twitter: @rtweed

Google Group for discussions, support, advice etc: [http://groups.google.co.uk/group/enterprise-web-developer-community](http://groups.google.co.uk/group/enterprise-web-developer-community)


## What is ewd-qoper8?

ewd-qoper8 is a generic, high-performance Node.js-based message queue module.  It provides you with:

- a memory-based queue within your main process onto which you can add JSON messages
- a pool of persistent child processes (aka worker processes) that run your message handler functions
- a worker process pool manager that will start up and shut down worker processes based on demand
- a dispatcher that processes the queue whenever a message is added to it, and attempts to send the message to an available worker process

It differs from most other message queues by preventing a worker process from handling more than one message at a time.  This is by deliberate design.

You determine the maximum size of the worker process pool.  If no free worker processes are available, messages will remain on the queue.  The queue is automatically processed whenever:

- a new message is added to the queue
- a worker process completes its processing of a message and returns itself to the available pool

The structure of messages is entirely up to you, but:

- they are JavaScript objects
- they should always have a type property

How messages are handled within a worker process is up to you.  You define a handler method/function for each message type you expect to be added to the queue.

ewd-qoper8 is highly customisable.   For example, the master and/or worker processes can be customised to connect to any database you wish, and it can be integrated with a Node.js-based web-server module such as Express, and with a web-socket module such as socket.io.  You can also over-ride the memory-based queue and implement your own persistent one.

## Installing

       npm install ewd-qoper8
	   
## Using ewd-qoper8

  Full details and documentation can be found at
  [http://gradvs1.mgateway.com/download/ewd-qoper8.pdf](http://gradvs1.mgateway.com/download/ewd-qoper8.pdf)


## License

 Copyright (c) 2016 M/Gateway Developments Ltd,                           
 Reigate, Surrey UK.                                                      
 All rights reserved.                                                     
                                                                           
  http://www.mgateway.com                                                  
  Email: rtweed@mgateway.com                                               
                                                                           
                                                                           
  Licensed under the Apache License, Version 2.0 (the "License");          
  you may not use this file except in compliance with the License.         
  You may obtain a copy of the License at                                  
                                                                           
      http://www.apache.org/licenses/LICENSE-2.0                           
                                                                           
  Unless required by applicable law or agreed to in writing, software      
  distributed under the License is distributed on an "AS IS" BASIS,        
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
  See the License for the specific language governing permissions and      
   limitations under the License.      
