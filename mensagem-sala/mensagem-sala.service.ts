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
            dataEnvio: mensagem.dataEnvio,
            id: mensagem.id
        };
        let mensagemSala = new MensagemSala(objMensagemSala);
        mensagemSala = await mensagemSala.save();
        return mensagemSala;
    }

    async lerMensagem(sala: string, id: string) {
        let mensagemSala = await this.getMensagemPorIdESala(sala, id);
        let mensagemSalaDb = new MensagemSala(mensagemSala);
        mensagemSalaDb.dataLeitura = new Date();
        mensagemSala = await mensagemSalaDb.save();
        return mensagemSala;
    }

    getMensagemPorIdESala(sala: string, id: string) {
        return new Promise((resolve, reject) => {
            this.mensagemSalaModel.findOne({
                'tokenSala': sala,
                'id': id
            }, (err, mensagemSala: MensagemSala) => {
                if(mensagemSala) {
                    resolve(mensagemSala);
                }
                reject(null);
            })
        });
    }

    getUltimasMensagensPorSala(sala: string) {
        return this.mensagemSalaModel.find({
            'tokenSala': sala
        }).sort({'dataEnvio': -1});
    }
}

export const mensagemSalaService = new MensagemSalaService(MensagemSala);
