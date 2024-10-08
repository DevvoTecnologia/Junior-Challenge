import prismaClient from "../prisma"
interface DeletarProps{
    id: string
}

class DeletarAneis {
    async executa({id}: DeletarProps){
        if(!id){
            throw new Error("id errado")
        }

        const acharAnel = await prismaClient.customer.findFirst({
            where: {
                id: id
            }
        })

        if(!acharAnel){
            throw new Error("anel nao existe")
        }

        await prismaClient.customer.delete({
            where:{
                id: acharAnel.id
            }
        })

        return {message: "deletado com sucesso"}
    }
}
 

export {DeletarAneis}