import prismaClient from "../prisma";

interface AtualizarAneisProps {
    id: string;
    nome?: string;
    poder?: string;
    portador?: string;
    forjadoPor?: string;
    imagem?: string;
}

class AtualizarAneis {
    async executa({ id, nome, poder, portador, forjadoPor, imagem }: AtualizarAneisProps) {
        if (!id) {
            throw new Error("ID inválido");
        }

        // Verifica se o anel existe
        const acharAnel = await prismaClient.customer.findFirst({
            where: {
                id: id
            }
        });

        if (!acharAnel) {
            throw new Error("Anel não encontrado");
        }

        // Atualiza os dados do anel
        const anelAtualizado = await prismaClient.customer.update({
            where: {
                id: acharAnel.id
            },
            data: {
                nome: nome || acharAnel.nome,
                poder: poder || acharAnel.poder,
                portador: portador || acharAnel.portador,
                forjadoPor: forjadoPor || acharAnel.forjadoPor,
                imagem: imagem || acharAnel.imagem,
            }
        });

        return { message: "Anel atualizado com sucesso", anelAtualizado };
    }
}

export { AtualizarAneis };