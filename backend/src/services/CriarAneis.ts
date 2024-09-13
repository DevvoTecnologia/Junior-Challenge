import prismaClient from "../prisma";

interface CriarAneisProps{
    nome: string,
    poder: string,
    portador: string,
    forjadoPor: string
    imagem: string
}

class CriarAneis {
    async executa({nome, poder, portador, forjadoPor, imagem}: CriarAneisProps){
        if(!nome || !poder || !portador || !forjadoPor || !imagem){
            throw new Error("preencha os campos")
        }
        const aneisTeste = await prismaClient.customer.create({
            data:{
                nome,
                poder,
                portador,
                forjadoPor,
                imagem,
            }
        })
        return aneisTeste
    }
}

export {CriarAneis}