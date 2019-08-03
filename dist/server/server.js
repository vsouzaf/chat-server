"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../common/environment");
const express = require("express");
const mongoose = require("mongoose");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routers = []) {
        return new Promise((resolve, reject) => {
            try {
                this.application = express();
                for (let router of routers) {
                    router.apllyRoutes(this.application);
                }
                this.server = this.application.listen(environment_1.environment.server.port, () => resolve(this));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => {
            return this.initRoutes(routers).then(() => this);
        });
    }
}
exports.Server = Server;
