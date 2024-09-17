import mongoose from "mongoose";

const RingSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: [true, "Por favor, adicione um nome."]
    },

    poder: {
        type: String,
        required: [true, "Por favor, descreva um poder."]
    },

    portador: {
        type: String,
        required: [true, "Por favor, diga quem o porta."]
    },

    forjadoPor: {
        type: String,
        required: [true, "Por favor, quem o forjou?"]
    },

});

const Ring = mongoose.model("Ring", RingSchema);

export default Ring;