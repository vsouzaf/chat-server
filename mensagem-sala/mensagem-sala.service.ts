import * as mongoose from 'mongoose'
import {MensagemSala} from "./mensagem-sala.model";
import {salaService} from "../sala/sala.service";

class MensagemSalaService {
    constructor(protected mensagemSalaModel: mongoose.Model<MensagemSala>) {
    }

    salvarMensagem(tokenSala: string, mensagem: MensagemSala) {
        salaService.isParticipanteEhDaSala(tokenSala, mensagem.remetente)
    }
}

export const mensagemSalaService = new MensagemSalaService(MensagemSala);
