import prismaClient from "../prisma";

interface DeleteCustomerProps{
    id: string
}

class DeleteCustomerService{
    async excute({ id }: DeleteCustomerProps){
        if(!id){
            throw new Error("Solicitação invalida");
        }
        
        const findCustomer = await prismaClient.customer.findFirst({
            where: {
                id: id
            }
        })

        if(!findCustomer) {
            throw new Error("Cliente não exite");            
        }

        await prismaClient.customer.delete({
            where: {
                id: findCustomer.id
            }
        })

        return { message: "Deletado com sucesso."}
    }
}

export { DeleteCustomerService }