import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const user = await AuthService.signup(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const token = await AuthService.login(req.body);
      res.json({ token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default AuthController;
