import express from 'express';

import {getUserByEmail, createUser, getUserBySessionToken, createNewUser} from '../db/users';
import { random, authentication } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const {email, password} = req.body

    if(!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if(!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if(user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('LOTR-AUTH', user.authentication.sessionToken, { 
      domain: 'localhost', 
      path: '/',
      httpOnly: true,       
      secure: false,        
      sameSite: 'lax',      
      maxAge: 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400)
  }
}

export const register = async(req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const newUser = await createNewUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    // Criar um novo token de sessão
    const sessionToken = authentication(random(), newUser._id.toString());

    // Atualizar o documento do usuário com o token
    newUser.authentication.sessionToken = sessionToken;
    await newUser.save(); // Salvar o documento atualizado

    // Configurar o cookie de autenticação
    res.cookie('LOTR-AUTH', sessionToken, { 
      domain: 'localhost', 
      path: '/',
      httpOnly: true,       
      secure: false,        
      sameSite: 'lax',      
      maxAge: 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json(newUser).end();
  } catch (error) {
    return res.sendStatus(400);
  }
}

export const validateToken = async (req: express.Request, res: express.Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.sendStatus(403); // Não autorizado
    }

    const user = await getUserBySessionToken(token);

    if (!user) {
      return res.sendStatus(403); // Não autorizado
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.sendStatus(400); // Erro genérico
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie('LOTR-AUTH', {
      domain: 'localhost', 
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return res.status(200).json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    return res.sendStatus(400);
  }
};