export interface AnelDto {
	_id: string;
	nome: string;
	poder: string;
	portador: string;
	forjadoPor: string;
	imagem: string;
}
export interface AnelCriarDto {
	nome: string;
	poder: string;
	portador: string;
	forjadoPor: string;
}

export interface AnelAtualizarDto {
	poder: string;
	portador: string;
}
