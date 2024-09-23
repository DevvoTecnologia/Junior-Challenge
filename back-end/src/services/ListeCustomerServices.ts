import prismaClient from "../prisma";

class ListeCustomerService{
    async execute() {
        const customers = await prismaClient.customer.findMany()

        return customers;
    }
}

export { ListeCustomerService }