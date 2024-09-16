import express from 'express';

import {createRing, deleteRingById, getRingById, getRings, updateRingById} from '../db/rings';

export const saveRing = async (req: express.Request, res: express.Response) => {
  try {
    const {ringname, description, carrier, forgedby, image} = req.body;

    if(!ringname || !description || !carrier || !forgedby || !image) {
      return res.sendStatus(400);
    }

    const ring = await createRing({
      ringname,
      description,
      carrier,
      forgedby,
      image
    })

    return res.status(200).json(ring).end();
  }catch(error){
    return res.sendStatus(400);
  }
}

export const getRing = async (req: express.Request, res: express.Response) => {
  try{
    const {id} = req.params;

    const ring = await getRingById(id);

    return res.status(200).json(ring);
  }catch(error){
    return res.sendStatus(400);
  }
}

export const getAllRings = async (req: express.Request, res: express.Response) => {
  try{
    const rings = await getRings();

    return res.status(200).json(rings);
  }catch(error){
    return res.sendStatus(400);
  }
}

export const updateRing = async (req: express.Request, res: express.Response) => {
  try{  
    const {id} = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID do anel é obrigatório.' });
    }
    const updatedRing = await updateRingById(id, updates);

    if (!updatedRing) {
      return res.status(404).json({ message: 'Anel não encontrado.' });
    }

    const ring = await getRingById(id);

    return res.status(200).json(ring);
  }catch(error){
    return res.sendStatus(400);
  }
}

export const deleteRing = async (req: express.Request, res: express.Response) => {
  try{  
    const {id} = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID do anel é obrigatório.' });
    }

    const deletedRing = await deleteRingById(id);

    return res.json(deletedRing);
  }catch(error){
    return res.sendStatus(400);
  }
}