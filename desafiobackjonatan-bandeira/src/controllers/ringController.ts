import { Request, Response } from 'express';
import { createRing, getRingsService, updateRingService, deleteRingService } from '../services/ringService';

import { TForm } from '../models/types';
import multer from 'multer';
import { supabase } from '../config/supabase';

const upload = multer({ storage: multer.memoryStorage() }); // Usar armazenamento em memória para manipular o buffer

const addRing = async (req: any, res: Response) => {
  try {
    // Receber o formulário com a imagem
    const ring: TForm = req.body;
    const file = req.file; // A imagem enviada no campo 'file'
    
    if (!file) {
      return res.status(400).json({ error: 'Imagem é obrigatória.' });
    }
    
    // Enviar a imagem para o Supabase
    const { data, error: uploadError } = await supabase.storage
    .from('Aneis')
    .upload(`aneis/${Date.now()}_${file.originalname}`, file.buffer, {
      cacheControl: '3600',
      upsert: false,
    });
    
    if (uploadError) {
      throw new Error('Erro ao fazer upload da imagem no Supabase.');
    }
    
    // Gerar a URL pública da imagem
    try {
      const { data: publicURL } = supabase.storage
        .from('Aneis')
        .getPublicUrl(data?.path);
        // Salvar o URL da imagem no banco de dados
        ring.imagem = publicURL.publicUrl;
    } catch(e) {
      throw new Error('Erro ao obter a URL pública da imagem.');

    }

    // Criar o anel com os dados do formulário
    const result = await createRing(ring);
    res.status(201).json({ message: 'Anel criado com sucesso', ring: result });
    
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getRings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) {
      const aneis = await getRingsService();
      const anel = aneis.find(a => a.id === parseInt(id));
      if (!anel) {
        return res.status(404).json({ error: 'Anel não encontrado.' });
      }
      return res.status(200).json({ anel });
    } else {
      const aneis = await getRingsService();
      res.status(200).json({ aneis });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Atualiza um anel específico
const updateRing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ringData: TForm = req.body;
    const file = req.file; // A imagem enviada no campo 'file'
    
    if (file) {
      // Enviar a imagem para o Supabase
      const { data, error: uploadError } = await supabase.storage
        .from('Aneis')
        .upload(`aneis/${Date.now()}_${file.originalname}`, file.buffer, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw new Error('Erro ao fazer upload da imagem no Supabase.');
      }

      try{
        const { data: publicURL } = supabase.storage
          .from('Aneis')
          .getPublicUrl(data?.path);
          // Salvar o URL da imagem no banco de dados
          ringData.imagem = publicURL.publicUrl;
      } catch(e) {
        throw new Error('Erro ao obter a URL pública da imagem.');

      }
    }

    const result = await updateRingService(parseInt(id), ringData);
    res.status(200).json({ message: 'Anel atualizado com sucesso', ring: result });
    
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Deleta um anel específico
const deleteRing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteRingService(parseInt(id));
    res.status(200).json({ message: 'Anel deletado com sucesso', ring: result });
    
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Use o middleware multer para lidar com o upload
export { addRing, upload, getRings, updateRing, deleteRing };
