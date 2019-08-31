import * as express from "express";
import {Router} from "../common/router";
import * as uuidv1 from "uuid/v1"
import {MensagemSala} from "./mensagem-sala.model";
import {mensagemSalaService} from "./mensagem-sala.service";

class MensagemSalaRouter extends Router{

    constructor(){
        super();
        this.on('beforeRender', (document: MensagemSala) =>{
            document.__v = undefined;
        })
    }

    apllyRoutes(application: express.Express) {
        application.get('/conversa/ultimas-mensagens/sala/:sala', (req, resp, mext) => {
            mensagemSalaService.getUltimasMensagensPorSala(req.params.sala).then(
                this.renderAll(resp)
            );
        })
    }

    renderObj(document, response) {
        super.renderObj(document, response);
    }

}

export const mensagemSalaRouter = new MensagemSalaRouter();
