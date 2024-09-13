import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createId } from "@paralleldrive/cuid2";
import { User } from '../models/User';
import { env } from '../env';

export const registerUser = async (username: string, password: string) => {
  // Verificar se o usuário já existe
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    throw new Error('Usuário já existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    return await User.create({
      id: createId(),
      username,
      password: hashedPassword,
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw new Error('Falha ao criar usuário no banco de dados');
  }
};

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Senha inválida');
  }

  const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: '1h' });
  return { token, user: { id: user.id, username: user.username } };
};