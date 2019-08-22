import {EventEmitter} from "events";
import * as io from "socket.io";

export abstract class Socket extends EventEmitter {
    abstract apllySockets(socketIO: io.Socket)
}
