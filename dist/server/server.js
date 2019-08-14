"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../common/environment");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const io = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
class Server {
    constructor() {
        this.clients = [];
    }
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routers = [], sockets = []) {
        return new Promise((resolve, reject) => {
            try {
                this.application = express();
                this.application.use(cors());
                this.application.use(bodyParser.json({ type: 'application/json' }));
                for (let router of routers) {
                    router.apllyRoutes(this.application);
                }
                this.server = new http.Server(this.application);
                this.socketIO = io(this.server);
                this.socketIO.on("connection", (client) => {
                    client.on("join", (joinObj) => {
                        let socketSala = client.join(joinObj.sala);
                        this.clients[joinObj.sala][client.id] = joinObj.nome;
                        socketSala.to(joinObj.sala).emit("update", "You have connected to the server.");
                        socketSala.to(joinObj.sala).broadcast.emit("update", joinObj.nome + " has joined the server.");
                    });
                    client.on("send", (msgObg) => {
                        client.to(msgObg.sala).broadcast.emit("chat", this.clients[msgObg.sala][client.id], msgObg.texto);
                    });
                    // client.on("disconnect", () => {
                    //     console.log("Disconnect");
                    //     this.socketIO.emit("update", this.clients[client.id] + " has left the server.");
                    //     delete this.clients[client.id];
                    // });
                });
                this.server.listen(environment_1.environment.server.port, () => {
                    resolve(this);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = [], sockets = []) {
        return this.initializeDb().then(() => {
            return this.initRoutes(routers, sockets).then(() => this);
        });
    }
}
exports.Server = Server;
