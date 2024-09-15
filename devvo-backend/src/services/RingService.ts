import { AppDataSource } from "../config/database";
import { Ring } from "../domain/entities/Ring";
import { Forjador } from "../domain/entities/Forjador";
import { Portador } from "../domain/entities/Portador";
import { AppError } from "../shared/errors/AppError";
import { Repository } from "typeorm";
const ringRepository = AppDataSource.getRepository(Ring);
const forjadorRepository = AppDataSource.getRepository(Forjador);
const portadorRepository = AppDataSource.getRepository(Portador);

export class RingService {
    private ringRepository: Repository<Ring>;
    private forjadorRepository: Repository<Forjador>;
    private portadorRepository: Repository<Portador>;
  
    constructor() {

      this.ringRepository = AppDataSource.getRepository(Ring);
      this.forjadorRepository = AppDataSource.getRepository(Forjador);
      this.portadorRepository = AppDataSource.getRepository(Portador);
    }
  
    async createRing(data: { nome: string; poder: string; imagem: string; portadorNome: string; forjadoPorId: number }): Promise<Ring> {
        const { nome, forjadoPorId, portadorNome } = data;
    
        // Verificar se o nome do anel já existe
        const existingRingByName = await this.ringRepository.findOne({ where: { nome } });
        if (existingRingByName) {
          throw new AppError("Já existe um anel com esse nome", 400);
        }
    
        // Buscar o forjador e verificar se ele existe
        const forjador = await this.forjadorRepository.findOne({ where: { id: forjadoPorId } });
        if (!forjador) {
          throw new AppError("Forjador não encontrado", 404);
        }
    
        // Buscar ou criar o portador pelo nome
        let portador = await this.portadorRepository.findOne({ where: { nome: portadorNome } });
        if (!portador) {
          // Criar o portador se ele não existir
          portador = this.portadorRepository.create({ nome: portadorNome });
          await this.portadorRepository.save(portador);
        }
    
        // Verificar o limite de anéis
        const existingRings = await this.ringRepository.find({ where: { forjadoPor: { id: forjadoPorId } } });
        if (existingRings.length >= forjador.limite_aneis) {
          throw new AppError(`Limite de anéis excedido para o forjador ${forjador.nome}`, 400);
        }
    
        // Criar o novo anel
        const newRing = this.ringRepository.create({ ...data, portador, forjadoPor: forjador });
        await this.ringRepository.save(newRing);
    
        // Carregar o anel com as relações completas (portador e forjador)
        const savedRing = await this.ringRepository.findOne({
          where: { id: newRing.id },
          relations: ["forjadoPor", "portador"], 
        });
    
        if (!savedRing) {
          throw new AppError("Erro ao salvar o anel", 500);
        }
    
        return savedRing;
      }
    
      // Função para listar todos os anéis
      async getRings(): Promise<Ring[]> {
        return this.ringRepository.find({ relations: ["forjadoPor", "portador"] }); // Retornando anéis com seus portadores e forjadores
      }

  async updateRing(id: number, updateData: Partial<Ring>): Promise<Ring> {
    const ring = await ringRepository.findOneBy({ id });
    if (!ring) {
      throw new AppError("Anel não encontrado", 404);
    }

    Object.assign(ring, updateData);
    return ringRepository.save(ring);
  }

  async deleteRing(id: number): Promise<void> {
    const ring = await ringRepository.findOneBy({ id });
    if (!ring) {
      throw new AppError("Anel não encontrado", 404);
    }

    await ringRepository.remove(ring);
  }
}
