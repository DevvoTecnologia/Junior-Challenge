import { genNewPasswordHash } from '@lib/genNewPasswordHash';
import { User } from '@models/user';
import { Request, Response } from 'express';

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, username, password, email, role } = req.body;

    if (role !== 'admin') {
      return res.status(400).json({ error: 'Role must be "admin"' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'User already exists with this email' });
    }

    const passwordHash = await genNewPasswordHash(password);

    const user = await User.create({
      name,
      username,
      passwordHash,
      email,
      role,
    });

    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};
