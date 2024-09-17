import mongoose from "mongoose"

export enum Forger {
    ELFO = 'Elfos',
    ANAO = 'Anões',
    HOMEM = 'Homens',
    SAURON = 'Sauron',
}

const RingSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    power: { 
        type: String, 
        required: true 
    },
    carrier: { 
        type: String, 
        required: true 
    },
    forgedBy: { 
        type: String, 
        enum: Object.values(Forger),
        required: true 
    },
    image: { 
        type: String, 
        default: 'https://t4.ftcdn.net/jpg/02/08/98/45/360_F_208984513_uX8pSJNW2pw1fQ7Bge1FI1NDp8rirSSc.jpg' 
    }
},
    {
        timestamps: true,
    }
)

export const RingModel = mongoose.model("Ring", RingSchema)


