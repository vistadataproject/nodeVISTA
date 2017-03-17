'use strict';

const path = require('path');
const childProcess = require('child_process');
const _ = require('underscore');

const PROCESS_ADAPTER_CHILD_MODULE = process.env.PROCESS_ADAPTER_CHILD_MODULE || 'nodeVISTAManagerChild.js';

const RPC_SERVER_EVENTS = ['lockedRPCList', 'rpcCall', 'mvdmCreate', 'mvdmDescribe', 'mvdmList', 'mvdmUpdate', 'mvdmRemove', 'mvdmUnremoved', 'mvdmDelete'];

class ProcessAdapter {
    constructor() {
        this.isParentProcess = !process.env.PROCESS_ADAPTER_CHILD_PROCESS;
        this.isChildProcess = !this.isParentProcess;

        this.childProcess = null;
        this.childEventHandlers = {};
    }

    /**
     * Initialize the manager process adapter object. This must be called after construction to ensure
     * proper setup of the object internals.
     */
    init() {
        // If this is a parent process, spawn the nodeVISTAManager instance as a child process. Instances
        // of this class that are created within will be created with the appropriate environment variable
        if (this.isParentProcess) {
            this.childProcess = childProcess.fork(path.join(__dirname, PROCESS_ADAPTER_CHILD_MODULE), [], {
                env: { PROCESS_ADAPTER_CHILD_PROCESS: 1 },
            });

            this.childProcess.on('error', ProcessAdapter.onChildError);
            this.childProcess.on('exit', ProcessAdapter.onChildExit);
        }
    }

    /**
     * Bind the adapter to an EventManager instance. Prior to the process adapter, the EventManager used to be
     * a singleton that interfaced both the RPC server and the web server. By splitting the two entities into
     * distinct processes, we bind the events to and from the EventManager to facilitate the event handling.
     */
    bindEventManager(eventManager) {
        this.eventManager = eventManager;

        if (this.isParentProcess) {
            // Bind events coming from the RPC Server (via the EventManager) to the web server (via this.childProcess)
            RPC_SERVER_EVENTS.forEach((event) => {
                this.eventManager.on(event, (value) => {
                    this.childProcess.send({ event, value });
                });
            });

            // Bind the events coming from the web server (via this.childProcess) to the child event handlers
            this.childProcess.on('message', (message) => {
                const childEventHandler = this.childEventHandlers[message.event];
                if (_.isFunction(childEventHandler)) {
                    childEventHandler(message.value);
                }
            });
        } else {
            // Bind events coming from the RPC Server (process) to the web server (via the EventManager)
            process.on('message', (message) => {
                this.eventManager.emit(message.event, message.value);
            });
        }
    }

    /**
     * Register a child event handler on the RPC server side. This allows you to enclose RPC server
     * context in event handlers without actually providing concrete coupling within the process adapter.
     */
    registerChildEventHandler(eventName, handler) {
        if (this.isParentProcess) {
            this.childEventHandlers[eventName] = handler;
        }
    }

    /**
     * Sample webserver API call. This will set the MVDM management option on the RPC server side (which
     * used to be a singleton) via call.
     */
    setRPCLocked(isRPCLocked) {
        if (this.isChildProcess) {
            process.send({
                event: 'isRPCLocked',
                value: isRPCLocked,
            });
        }
    }

    // Child error handler
    static onChildError(code, signal) {
        console.log(code, signal);
    }

    // Child exit handler
    static onChildExit(code, signal) {
        console.log(code, signal);
    }
}

module.exports = ProcessAdapter;
