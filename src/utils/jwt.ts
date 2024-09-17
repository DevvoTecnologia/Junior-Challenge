import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'Chave-randomica-que-pode-ser-env-bem-violento-em-sha256'; 
export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
