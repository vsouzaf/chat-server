import * as mongoose from 'mongoose'
import {Sala} from "./sala.model";

class SalaService {
    constructor(protected salaModel: mongoose.Model<Sala>) {
    }

    isParticipanteEhDaSala(tokenSala: string, pariticipante: any) {
        return new Promise((resolve, reject) => {
            this.salaModel.findOne({
                'token': tokenSala
            }, (err, teste: Sala) => {
                if(teste && teste.participantes.find(elem => elem.idExterno == pariticipante.idExterno)) {
                    resolve(true);
                }
                reject(false);
            })
        });
    }
}


export const salaService = new SalaService(Sala);
