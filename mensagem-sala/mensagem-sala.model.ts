import * as mongoose from 'mongoose'
import {Sala} from "../sala/sala.model";

export interface MensagemSala extends mongoose.Document {
    sala: Sala,
    remetente: Object,
    mensagem: string
}

const salaSchema = new mongoose.Schema({
    sala: {
        type: Sala
    },
    remetente: {
        type: Object
    },
    mensagem: {
        type: String
    }
})

export const MensagemSala = mongoose.model<MensagemSala>('Sala', salaSchema);
