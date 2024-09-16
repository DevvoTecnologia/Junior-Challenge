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
        default: 'default-image-url.jpg' 
    }
},
    {
        timestamps: true,
    }
)

export const RingModel = mongoose.model("Ring", RingSchema)


