// src/services/AuthService.ts
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'secreta123';

class AuthService {
  static async signup({ name, email, password }: { name: string; email: string; password: string }) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const user = new User();
    user.name = name;
    user.email = email;
    await user.setPassword(password);
    await user.save();

    return { message: 'Usuário cadastrado com sucesso' };
  }

  static async login({ email, password }: { email: string; password: string }) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Usuário ou senha inválidos');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Usuário ou senha inválidos');
    }
    
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return token;
  }
}

export default AuthService;
