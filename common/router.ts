import {EventEmitter} from "events";
import * as express from "express";

export abstract class Router extends EventEmitter {
    abstract apllyRoutes(application: express.Express)

    render(response: express.Response){
        return (document)=>{
            return this.renderObj(document, response);
        }
    }

    renderObj(document, response) {
        if (document) {
            this.emit('beforeRender', document)
            response.json(document)
        } else {
            response.send(404)
        }
    }
}
