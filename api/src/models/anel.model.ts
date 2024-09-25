import mongoose from "mongoose";

const anelSchema = new mongoose.Schema(
	{
		nome: {
			type: String,
			required: true,
			unique: true,
		},
		poder: {
			type: String,
			required: true,
		},
		portador: {
			type: String,
			required: true,
		},
		forjadoPor: {
			type: String,
			required: true,
			enum: ["Elfos", "Anões", "Homens", "Sauron"],
		},
		imagem: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Anel = mongoose.model("Anel", anelSchema);

export { Anel, anelSchema };
