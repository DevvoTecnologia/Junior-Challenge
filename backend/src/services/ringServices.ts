import { RingModel } from '../models/ringModel'
import { RingTypes } from '../types/ringTypes'

export class RingService {
  // Verificar o limite de anéis criados por forjador
  private async verifyRingLimit(forgedBy: string): Promise<boolean> {
    let limit: number

    // Definir o limite baseado em quem forjou o anel
    switch (forgedBy.toLowerCase()) {
      case 'elfos':
        limit = 3
        break
      case 'anões':
        limit = 7
        break
      case 'homens':
        limit = 9
        break
      case 'sauron':
        limit = 1
        break
      default:
        return true  // Caso o forjador não seja restrito, não há limite
    }

    // Contar quantos anéis já foram forjados por este forjador
    const count = await RingModel.countDocuments({ forgedBy })
    return count < limit
  }

  // Criar um novo anel
  public async createRing(ringData: RingTypes) {
    const { forgedBy } = ringData

    // Validar a regra de limite de anéis por forjador
    if (!(await this.verifyRingLimit(forgedBy))) {
      throw new Error(`O limite de anéis forjados por ${forgedBy} foi atingido.`)
    }

    const novoAnel = new RingModel(ringData)
    return await novoAnel.save()
  }

  // Listar todos os anéis
  public async listRings() {
    return await RingModel.find()
  }

  // Atualizar um anel
  public async updateRing(id: string, updatedRingData: RingTypes) {
    const updatedRing = await RingModel.findByIdAndUpdate(id, updatedRingData, { new: true })
    if (!updatedRing) {
      throw new Error('Anel não encontrado')
    }
    return updatedRing
  }

  // Deletar um anel
  public async deleteRing(id: string) {
    const deletedRing = await RingModel.findByIdAndDelete(id)
    if (!deletedRing) {
      throw new Error('Anel não encontrado')
    }
    return deletedRing
  }
}
