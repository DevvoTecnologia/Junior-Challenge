import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(req: Request, res: Response): Promise<Response> {
        const { login, senha } = req.body;

        try {
            const token = await this.authService.authenticate(login, senha);

            if (token) {
                return res.json({ token });
            } else {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}
