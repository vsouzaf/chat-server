import {EventEmitter} from "events";
import {Server} from "socket.io";

export abstract class Socket extends EventEmitter {
    abstract apllySockets(socketIO: Server)
}
