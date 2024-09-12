import { Request, Response } from 'express';
import { AuthUserService } from '../../services/user/auth-user-service';
import { signInSchema } from '../../validation/user-schema';
import { ZodError } from 'zod';

class AuthUserController {
  async handle(req: Request, res: Response) {
    try {
      const validatedData = signInSchema.parse(req.body);
      const authUserService = new AuthUserService();
      const auth = await authUserService.execute(validatedData);

      return res.status(200).json(auth);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }

      return res.status(500).json({ error: error.message });
    }
  }
}

export { AuthUserController };
