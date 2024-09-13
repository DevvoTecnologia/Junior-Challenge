import prismaClient from "../prisma";

class ListarAneis{
    async executa() {
        const todosAneis = await prismaClient.customer.findMany()

        return todosAneis
    }
}

export {ListarAneis}