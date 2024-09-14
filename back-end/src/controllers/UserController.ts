import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response): Promise<Response> {
        const { login, senha } = req.body;
        try {
            const user = await this.userService.createUser(login, senha);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error });
        }
    }


}
