'use strict';

const path = require('path');
const childProcess = require('child_process');
const _ = require('lodash');

const PROCESS_ADAPTER_CHILD_MODULE = process.env.PROCESS_ADAPTER_CHILD_MODULE || 'nodeVISTAManagerChild.js';

const RPC_SERVER_EVENTS = ['emulatedRPCList', 'rpcCall', 'mvdmCreate', 'mvdmDescribe', 'mvdmList', 'mvdmUpdate', 'mvdmRemove', 'mvdmUnremoved', 'mvdmDelete'];

/**
 * This class serves two purposes. First, it is responsible for forking and managing the management client application
 * (nodeVISTAManager) as a separate process. Second it manages the interaction between the RPC Server and the
 * nodeVISTAManager seamlessly via bindings through the existing event-driven plumbing available via the EventManager.
 *
 * This high-level goal of this class is to move relatively expensive event-related activity (i.e. websocket I/O) out
 * of the main process, which improves overall efficiency and apparent visual performance.
 */
class ProcessAdapter {
    constructor() {
        this.isParentProcess = !process.env.PROCESS_ADAPTER_CHILD_PROCESS;
        this.isChildProcess = !this.isParentProcess;

        this.childProcess = null;
        this.childEventHandlers = {};

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
     * distinct processes, we bind the events to and from the EventManager to facilitate the event handling. Both
     * parent (RPC Server) and child (nodeVISTAManager) require their own unique 'wiring' be done.
     *
     * @param {object} eventManager EventManager instance object.
     */
    bindEventManager(eventManager) {
        this.eventManager = eventManager;

        if (this.isParentProcess) {
            // Bind events from the RPC Server (via the EventManager) to the nodeVISTA manager (via this.childProcess)
            RPC_SERVER_EVENTS.forEach((event) => {
                this.eventManager.on(event, (value) => {
                    this.childProcess.send({ event, value });
                });
            });

            // Bind the events from the nodeVISTA manager (via this.childProcess) to the child event handlers
            this.childProcess.on('message', (message) => {
                const childEventHandler = this.childEventHandlers[message.event];
                if (_.isFunction(childEventHandler)) {
                    childEventHandler(message.value);
                }
            });
        } else {
            // Bind events from the RPC Server (via the process) to the nodeVISTA manager (via the EventManager)
            process.on('message', (message) => {
                this.eventManager.emit(message.event, message.value);
            });
        }
    }

    /**
     * Register a child event handler on the RPC server side. This allows you to enclose RPC server
     * context in event handlers without actually providing concrete coupling within the process adapter.
     *
     * @param {string} eventName Name of the JS event to bind the handler to.
     * @param {function} handler Handler function to call when the JS event comes in, takes a single JS object.
     */
    registerChildEventHandler(eventName, handler) {
        if (this.isParentProcess) {
            this.childEventHandlers[eventName] = handler;
        }
    }

    /**
     * Send a JS-based event from the child process (nodeVISTAManager) to the RPC Server. On the parent side,
     * these events can be processed by registered child event handlers (via registerChildEventHandler)
     *
     * @param {object} event Send an event to the RPC Server as a message object. The object should contain:
     *                       event (string): name of the event
     *                       value      (*): value associated with the event
     */
    sendEventToRPCServer(event) {
        if (this.isChildProcess) {
            process.send(event);
        }
    }

    /**
     * nodeVISTA manager API function. This will allow the nodeVISTAManager to set the MVDM management option on
     * the RPC server side (which used to be a singleton) transparently through the interprocess barrier.
     *
     * @param {boolean} isRPCEmulated State to set the 'isRPCEmulated' in the RPC Server
     */
    setRPCEmulated(isRPCEmulated) {
        this.sendEventToRPCServer({
            event: 'isRPCEmulated',
            value: isRPCEmulated,
        });
    }

    // Child error handler
    static onChildError(code, signal) {
        console.log('ProcessAdapter handing child ERROR signal', code, signal);
    }

    // Child exit handler
    static onChildExit(code, signal) {
        console.log('ProcessAdapter handing child EXIT signal', code, signal);
    }
}

module.exports = ProcessAdapter;
