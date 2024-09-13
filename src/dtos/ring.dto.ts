export interface CriarAnelDTO {
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: string;
    imagem: string;
    portadorId: string;
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
    portadorId: string;
}