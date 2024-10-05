import { Anel } from "./anel";

export type User = {
	id: number;
	nome: string;
	email: string;
	access_token: string;
	aneis: Anel[];
	imagem?: string;
};
