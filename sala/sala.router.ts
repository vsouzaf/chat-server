import * as express from "express";
import {Router} from "../common/router";
import {Sala} from "./sala.model";
import * as uuidv1 from "uuid/v1"

class SalaRouter extends Router{
    apllyRoutes(application: express.Express) {
        application.post('/sala', (req, resp, mext) => {
            let sala = new Sala(req.body);
            sala.token = uuidv1();
            sala.save().then(this.render(resp));
        })
    }
}

export const salaRouter = new SalaRouter();
