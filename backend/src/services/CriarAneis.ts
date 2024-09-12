import prismaClient from "../prisma";

interface CriarAneisProps{
    nome: string,
    poder: string,
    portador: string,
    forjadoPor: string
}

class CriarAneis {
    async executa({nome, poder, portador, forjadoPor}: CriarAneisProps){
        if(!nome || !poder || !portador || !forjadoPor){
            throw new Error("preencha os campos")
        }
        const aneisTeste = await prismaClient.customer.create({
            data:{
                nome,
                poder,
                portador,
                forjadoPor,
            }
        })
        return aneisTeste
    }
}

export {CriarAneis}