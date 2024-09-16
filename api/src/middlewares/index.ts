import express from 'express';
import {get, merge} from 'lodash'

import { getUserBySessionToken } from '../db/users';
import { RingModel } from '../db/rings';

const maxRings = {
  'Elfos': 3,
  'Anões': 7,
  'Homens': 9,
  'Sauron': 1
};

export const countRingsForger = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try{
    const {forgedby} = req.body;

    const existingRingsCount = await RingModel.countDocuments({forgedby});

    if(existingRingsCount >= maxRings[forgedby]) {
      return res.status(400).json({
        message: `O limite de anéis forjados por ${forgedby} já foi atingido!`
      });
    }

    next();

  }catch(error){
    return res.sendStatus(400);
  }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try{
    const {id} = req.params;
    const currentUserId = get(req, 'identity[0]._id') as string;

    if(!currentUserId) {
      return res.sendStatus(403);
    }

    if(currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  }catch(error){
    return res.sendStatus(400);
  }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try{
    const sessionToken = req.cookies['LOTR-AUTH'];

    if(!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if(!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, {identity: existingUser});

    return next()
  }catch(error){
    console.log(error);
    return res.sendStatus(400);
  }
}