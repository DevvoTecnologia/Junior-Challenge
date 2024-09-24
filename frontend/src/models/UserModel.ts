export interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
}

export interface CreateUser {
    nome: string;
    email: string;
    senha: string;
}
