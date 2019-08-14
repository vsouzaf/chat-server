import * as express from "express";
import {Router} from "../common/router";
import {Sala} from "./sala.model";
import * as uuidv1 from "uuid/v1"

class SalaRouter extends Router{

    constructor(){
        super();
        this.on('beforeRender', (document: Sala) =>{
            document.participantes = undefined;
            document.__v = undefined;
        })
    }

    apllyRoutes(application: express.Express) {
        application.post('/conversa', (req, resp, mext) => {
            let sala = new Sala(req.body);
            sala.token = uuidv1();
            sala.save().then(this.render(resp));
        })
    }

    renderObj(document, response) {
        super.renderObj(document, response);
    }
}

export const salaRouter = new SalaRouter();
