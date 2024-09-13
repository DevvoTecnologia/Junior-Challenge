import { where } from 'sequelize';
import { comparePassword, generateToken, hashPassword } from '../utils/authUtils';
import { FastifyError } from 'fastify';
import User from '../models/user';

export const createUserService = async (newUser: {
  username: string;
  password: string;
  email: string;
}): Promise<{ id: string; username: string; email: string }> => {
  try {
    const hashedPassword = await hashPassword(newUser.password);
    const result = await User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword,
    });

    if (!result) {
      throw new Error('Error on create user');
    }
    const data = {
      id: result.id,
      username: result.username,
      email: result.email,
    };
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user');
  }
};

export const loginUserService = async (loginData: {
  email: string;
  password: string;
}): Promise<{
  user: { email: string; id: string; username: string };
  token: string;
} | null> => {
  const user = await getByEmail(loginData.email);

  if (!user) {
    const error: FastifyError = {
      statusCode: 404,
      message: 'User not found',
      name: 'NotFoundError',
      code: 'USER_NOT_FOUND',
    };
    throw error;
  }

  const isPasswordValid = await comparePassword(loginData.password, user.password);
  if (!isPasswordValid) {
    const error: FastifyError = {
      statusCode: 401,
      message: 'Invalid password',
      name: 'UnauthorizedError',
      code: 'INVALID_PASSWORD',
    };
    throw error;
  }

  const token = generateToken(user.id);
  const loggedUser = {
    user: {
      email: user.email,
      username: user.username,
      id: user.id,
    },
    token,
  };

  return loggedUser;
};

export const getByUsername = async (username: string) => {
  return User.findOne({
    where: { username },
  });
};

export const getByEmail = async (email: string) => {
  return await User.findOne({
    where: { email },
  });
};

export const getById = async (id: string) => {
  const user = await User.findOne({ where: { id } });

  return user;
};

export const deleteUserService = async (id: string) => {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    const error: FastifyError = {
      statusCode: 404,
      message: 'User not found',
      name: 'NotFoundError',
      code: 'NOT_FOUND',
    };
    throw error;
  }
  return await User.destroy({ where: { id } });
};
