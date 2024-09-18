import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/UserService';
import { IUser } from '../@types/IUser';
import { env } from '../env';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async loginUser(req: Request, res: Response): Promise<Response> {
    try {
      const requestUser = req.body as IUser;

      const user = await this.userService.saveUser(requestUser);

      return res.json(user);
    } catch (error) {
      console.log(error);
      throw new Error(`Erro: ${error}`)
    }
  }

  public async authenticateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { token } = req.query;
      console.log(token);

      const decoded = jwt.verify(token as string, env.JWT_SECRET) as { email: string };

      const user = await this.userService.findByEmail(decoded.email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({ message: 'Usuario autenticado' });
    } catch (error) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
  }
}