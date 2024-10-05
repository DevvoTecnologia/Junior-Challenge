export type Anel = {
	id: number;
	nome: string;
	poder: string;
	portador: string;
	forjadoPor: "Elfos" | "Anões" | "Homens" | "Sauron";
	imagem: string;
};

export type CreateAnelDto = {
	nome: string;
	poder: string;
	portador: string;
	forjadoPor: "Elfos" | "Anões" | "Homens" | "Sauron";
	imagem: string;
};
