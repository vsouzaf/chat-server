import * as mongoose from 'mongoose'
import {Sala} from "./sala.model";

class SalaService {
    constructor(protected salaModel: mongoose.Model<Sala>) {
    }

    isParticipanteEhDaSala(tokenSala: string, pariticipante: any) {
        return new Promise((resolve, reject) => {
            this.salaModel.findOne({
                'token': tokenSala,
                'participantes': {
                    $elemMatch: {
                        idExterno: pariticipante.idExterno
                    }
                }
            }, (err, teste: Sala) => {
                if(teste) {
                    resolve(true);
                }
                reject(false);
            })
        });
    }
}


export const salaService = new SalaService(Sala);
