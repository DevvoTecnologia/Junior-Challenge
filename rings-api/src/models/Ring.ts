import mongoose, { Document, Schema } from 'mongoose'

export interface IRing extends Document {
  nome: string
  poder: string
  portador: string
  forjadoPor: string
  imagem: string
}

const RingSchema: Schema = new mongoose.Schema({
  nome: { type: String, required: true },
  poder: { type: String, required: true },
  portador: { type: String, required: true },
  forjadoPor: { type: String, required: true },
  imagem: { type: String, required: false },
})

export default mongoose.model<IRing>('Ring', RingSchema)
