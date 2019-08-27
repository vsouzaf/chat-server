import * as mongoose from 'mongoose'
import {Sala} from "./sala.model";

class SalaService {
    constructor(protected salaModel: mongoose.Model<Sala>) {
    }

    getParticipanteDaSalaPorIdExterno(tokenSala: string, idExterno: string) {
        return new Promise((resolve, reject) => {
            this.salaModel.findOne({
                'token': tokenSala,
                'participantes':  {
                    $elemMatch: {
                        idExterno: idExterno
                    }
                }
            }, {
                'participantes':  {
                    $elemMatch: {
                        idExterno: idExterno
                    }
                }
            }, (err, sala: Sala) => {
                if(sala) {
                    let participante = sala.participantes[0];
                    resolve(participante);
                }
                reject(null);
            })
        });
    }
}


export const salaService = new SalaService(Sala);
