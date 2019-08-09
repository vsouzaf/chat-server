import {environment} from "../common/environment";
import * as express from "express";
import * as http from 'http';
import * as mongoose from "mongoose";
import * as io from "socket.io";
import * as cors from "cors";
import {Router} from "../common/router";
import {Socket} from "../common/socket";

export class Server {
    application: express.Express;
    server: http.Server;
    socketIO: io.Server;
    clients = [];

    initializeDb(): mongoose.MongooseThenable {
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(environment.db.url, {
            useMongoClient: true
        })
    }

    initRoutes(routers: Router[] = [], sockets: Socket[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = express();
                this.application.use(cors());

                for (let router of routers) {
                    router.apllyRoutes(this.application);
                }

                this.server = new http.Server(this.application);

                this.socketIO = io(this.server);
                this.socketIO.on("connection",(client: io.Socket) => {
                    client.on("join", (name) => {
                        console.log("Joined: " + name);
                        this.clients[client.id] = name;
                        client.emit("update", "You have connected to the server.");
                        client.broadcast.emit("update", name + " has joined the server.")
                    });

                    client.on("send", (msg) => {
                        console.log("Message: " + msg);
                        client.broadcast.emit("chat", this.clients[client.id], msg);
                    });

                    client.on("disconnect", () => {
                        console.log("Disconnect");
                        this.socketIO.emit("update", this.clients[client.id] + " has left the server.");
                        delete this.clients[client.id];
                    });
                });

                this.server.listen(environment.server.port, () => {
                    resolve(this);
                });
            } catch (error) {
                reject(error);
            }
        })
    }
    bootstrap(routers: Router[] = [], sockets: Socket[] = []): Promise<Server>{
        return this.initializeDb().then(()=> {
            return this.initRoutes(routers, sockets).then(()=> this);
        })
    }
}
