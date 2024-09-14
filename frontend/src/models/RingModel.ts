export interface Ring {
    id: string;
    name: string;
    power: string;
    carrier: string;
    forgedBy: string | string[];
    image: string;
    carrierId: string;
}

export interface createRing {
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: string;
    imagem: string;
}

export interface updateRing {
    id: string;
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: string;
    imagem: string;
}