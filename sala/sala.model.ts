import * as mongoose from 'mongoose'

export interface Sala extends mongoose.Document {
    token: string,
    participantes: Array<any>
}

const salaSchema = new mongoose.Schema({
    token: {
        type: String
    },
    participantes: {
        type: Object
    }
})

export const Sala = mongoose.model<Sala>('Sala', salaSchema);
