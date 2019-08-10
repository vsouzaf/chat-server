import * as mongoose from 'mongoose'

export interface Sala extends mongoose.Document {
  token: string
}

const salaSchema = new mongoose.Schema({
  token: {
    type: String
  }
})

 export const Sala = mongoose.model<Sala>('Sala', salaSchema);
