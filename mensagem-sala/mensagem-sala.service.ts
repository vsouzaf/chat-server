import * as mongoose from 'mongoose'
import {MensagemSala} from "./mensagem-sala.model";
import {salaService} from "../sala/sala.service";
import {Sala} from "../sala/sala.model";

class MensagemSalaService {
    constructor(protected mensagemSalaModel: mongoose.Model<MensagemSala>) {
    }

    async salvarMensagem(tokenSala: string, remetente: any, mensagem: MensagemSala) {
        let objMensagemSala = {
            tokenSala: tokenSala,
            remetente: remetente,
            mensagem: mensagem.mensagem,
            dataEnvio: mensagem.dataEnvio
        };
        let mensagemSala = new MensagemSala(objMensagemSala);
        await mensagemSala.save();
    }
}

export const mensagemSalaService = new MensagemSalaService(MensagemSala);
