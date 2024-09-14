import prismaClient from "../prisma";

// Definindo um tipo literal para os valores de forjadoPor
type Forjador = "Elfos" | "Anões" | "Homens" | "Sauron";

interface CriarAneisProps {
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: Forjador; // Usando o tipo literal aqui
    imagem: string;
}

class CriarAneis {
    async executa({ nome, poder, portador, forjadoPor, imagem }: CriarAneisProps) {
        // Verifica se todos os campos estão preenchidos
        if (!nome || !poder || !portador || !forjadoPor || !imagem) {
            throw new Error("Preencha todos os campos");
        }

        // Definindo os limites com o tipo literal para forjador
        const limites: Record<Forjador, number> = {
            "Elfos": 3,
            "Anões": 7,
            "Homens": 9,
            "Sauron": 1
        };

        // Conta quantos anéis já existem para o forjador fornecido
        const quantidadeExistente = await prismaClient.customer.count({
            where: {
                forjadoPor: forjadoPor
            }
        });

        // Verifica se o limite foi atingido
        if (quantidadeExistente >= limites[forjadoPor]) {
            throw new Error(`Limite de anéis atingido para ${forjadoPor}. Máximo permitido: ${limites[forjadoPor]}`);
        }

        // Cria o novo anel se o limite não foi excedido
        const novoAnel = await prismaClient.customer.create({
            data: {
                nome,
                poder,
                portador,
                forjadoPor,
                imagem
            }
        });

        return novoAnel;
    }
}

export { CriarAneis };