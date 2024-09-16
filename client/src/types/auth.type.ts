export interface RegistrarDTO {
	nome: string;
	email: string;
	senha: string;
	confirmarSenha: string;
}
export interface EntrarDTO {
	email: string;
	senha: string;
}

export interface UsuarioDTO {
	_id: string;
	email: string;
	nome: string;
}
