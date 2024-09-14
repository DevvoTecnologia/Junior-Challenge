import { Repository } from 'typeorm';
import { Ring, ForjadoPor } from '../models/Ring';
import AppDataSource from '../database/index';

export class RingService {
    private ringRepository: Repository<Ring>;

    constructor() {
        this.ringRepository = AppDataSource.getRepository(Ring);
    }
    private async validateRingLimits(forjadoPor: ForjadoPor): Promise<string | null> {
        const ringsByForjador = await this.ringRepository.count({ where: { forjadoPor } });

        if (
            (forjadoPor === ForjadoPor.ELFOS && ringsByForjador >= 3) ||
            (forjadoPor === ForjadoPor.ANOES && ringsByForjador >= 7) ||
            (forjadoPor === ForjadoPor.HOMENS && ringsByForjador >= 9) ||
            (forjadoPor === ForjadoPor.SAURON && ringsByForjador >= 1)
        ) {
            return `O máximo de anéis permitidos para ${forjadoPor} já foi atingido.`;
        }

        return null;
    }

    async createRing(nome: string, poder: string, portador: string, forjadoPor: ForjadoPor, imagem: string): Promise<Ring | string> {
        const validationError = await this.validateRingLimits(forjadoPor);
        if (validationError) {
            return validationError;
        }

        const ring = this.ringRepository.create({ nome, poder, portador, forjadoPor, imagem });
        return await this.ringRepository.save(ring);
    }

    async getAllRings(): Promise<Ring[]> {
        return await this.ringRepository.find(); 
    }

    async getRingById(id: number): Promise<Ring | null> {
        return await this.ringRepository.findOneBy({ id });
    }

    async updateRing(id: number, nome: string, poder: string, portador: string, forjadoPor: ForjadoPor, imagem: string): Promise<Ring | string> {
        const ring = await this.ringRepository.findOneBy({ id });
        
        if (!ring) {
            return 'Anel não encontrado';
        }

        if (ring.forjadoPor !== forjadoPor) {
            const validationError = await this.validateRingLimits(forjadoPor);
            if (validationError) {
                return validationError;
            }
        }

        ring.nome = nome;
        ring.poder = poder;
        ring.portador = portador;
        ring.forjadoPor = forjadoPor;
        ring.imagem = imagem;

        return this.ringRepository.save(ring);
    }

    async deleteRing(id: number): Promise<string> {
        const result = await this.ringRepository.delete(id);

        if (result.affected === 0) {
            return 'Anel não encontrado';
        }

        return 'Anel deletado com sucesso';
    }
 
}
