import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
	{
		nome: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		senha: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, ret) => {
				delete ret.senha;
			},
		},
	}
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

export { Usuario, usuarioSchema };
