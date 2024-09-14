import { Anel } from "../entities/anel.entity";
import { CriarUserDTO, BuscarTodosAneisDTO } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private userRepository = new UserRepository();

    async createCustomer(user: CriarUserDTO): Promise<void> {
        try {
            await this.userRepository.criar(user);
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async buscarTodosAneis(data: BuscarTodosAneisDTO): Promise<Array<Anel>> {
        try {
            return await this.userRepository.buscarTodosAneis(data);
        } catch (error) {
            throw new Error(String(error));
        }
    }
}
