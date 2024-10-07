import { Ring } from '../models/Ring';

export class RingService {
  async createRing(data: any) {
    const { ring_forged_by } = data;
    
    const ringCount = await Ring.count({ where: { ring_forged_by } });

    if (
      (ring_forged_by === 'Elfos' && ringCount >= 3) ||
      (ring_forged_by === 'Anões' && ringCount >= 7) ||
      (ring_forged_by === 'Homens' && ringCount >= 9) ||
      (ring_forged_by === 'Sauron' && ringCount >= 1)
    ) {
      throw new Error(`Não é possível inserir mais anéis forjados por ${ring_forged_by}`);
    }

    return await Ring.create(data);
  }

  async getAllRings() {
    return await Ring.findAll();
  }

  async updateRing(id: number, data: any) {
    const ring = await Ring.findByPk(id);
    if (!ring) throw new Error('Anel não encontrado');
    
    return await ring.update(data);
  }

  async deleteRing(id: number) {
    const ring = await Ring.findByPk(id);
    if (!ring) throw new Error('Anel não encontrado');
    
    return await ring.destroy();
  }
}