import { Repository } from 'typeorm';
import { User } from '../models/User';
import AppDataSource from '../database/index';

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async createUser(login: string, senha: string): Promise<User> {
        const user = new User();
        user.login = login;
        user.senha = senha;
        return await this.userRepository.save(user);
    }

    // Outros métodos para manipulação de usuários
}
