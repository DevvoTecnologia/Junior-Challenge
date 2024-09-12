import { Request, Response } from 'express';
import { signUpSchema } from '../../validation/user-schema';
import { CreateUserService } from '../../services/user/create-user-service';
import { ZodError } from 'zod';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const validatedData = signUpSchema.parse(req.body);
      const createUserService = new CreateUserService();

      const user = await createUserService.execute(validatedData);

      return res.status(201).json(user);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }

      return res.status(500).json({ error: error.message });
    }
  }
}
