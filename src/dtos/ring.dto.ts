export interface CriarAnelDTO {
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: string;
    imagem: string;
    userId: string;
}

export interface AtualizarAnelDTO {
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: string;
    imagem: string;
}

export interface DeletarAnelDTO {
    id: string;
    userId: string;
}