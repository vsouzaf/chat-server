import {environment} from "../common/environment";
import * as express from "express";
import * as http from 'http';
import * as mongoose from "mongoose";
import {Router} from "../common/router";

export class Server {
    application: express.Express;
    server: http.Server;

    initializeDb(): mongoose.MongooseThenable {
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(environment.db.url, {
            useMongoClient: true
        })
    }

    initRoutes(routers: Router[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = express();

                for (let router of routers) {
                    router.apllyRoutes(this.application);
                }

                this.server = this.application.listen(environment.server.port, () => resolve(this));

            } catch (error) {
                reject(error);
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initializeDb().then(()=> {
            return this.initRoutes(routers).then(()=> this);
        })
    }
}
