import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import AppDataSource from '../database/index';

const JWT_SECRET = 'devvoUserToken'; 

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    async authenticate(login: string, senha: string): Promise<string | null> {
        const user = await this.userRepository.findOneBy({ login });

        if (!user) {
            return null; 
        }

        const isPasswordValid = await user.comparePassword(senha);

        if (!isPasswordValid) {
            return null;
        }

        const token = jwt.sign({ id: user.id, login: user.login }, JWT_SECRET, {
            expiresIn: '1h', 
        });

        return token;
    }
}
