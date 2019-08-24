import * as mongoose from 'mongoose'
import {Sala} from "../sala/sala.model";

export interface MensagemSala extends mongoose.Document {
    sala: string,
    remetente: Object,
    mensagem: string,
    dataEnvio: Date,
    dataLeitura: Date
}

const salaSchema = new mongoose.Schema({
    tokenSala: {
        type: String
    },
    remetente: {
        type: Object
    },
    mensagem: {
        type: String
    },
    dataEnvio: {
        type: Date
    },
    dataLeitura: {
        type: Date
    }
})

export const MensagemSala = mongoose.model<MensagemSala>('Sala', salaSchema);
