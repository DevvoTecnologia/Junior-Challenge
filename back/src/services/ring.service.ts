import { CriarAnelDTO, AtualizarAnelDTO, DeletarAnelDTO } from '../dtos/ring.dto';
import { RingRepository } from '../repositories/ring.repository';

export class RingService {
    private ringRepository: RingRepository;

    constructor() {
        this.ringRepository = new RingRepository();
    }

    async criarAnel(dto: CriarAnelDTO) {
        const aneisExistentes = await this.ringRepository.listarAneisPorForjador(dto.forjadoPor);
        if (aneisExistentes.length >= this.getMaxRings(dto.forjadoPor)) {
            throw new Error('LIMIT_EXCEEDED');
        }
        return this.ringRepository.criarAnel(dto);
    }

    async listarAneis(portadorId: string) {
        return this.ringRepository.listarAneis(portadorId);
    }

    async atualizarAnel(id: string, dto: AtualizarAnelDTO) {
        return this.ringRepository.atualizarAnel(id, dto);
    }

    async deletarAnel(dto: DeletarAnelDTO) {
        return this.ringRepository.deletarAnel(dto.id);
    }

    private getMaxRings(forjadoPor: string) {
        switch (forjadoPor) {
            case 'Elfos': return 3;
            case 'Anões': return 7;
            case 'Homens': return 9;
            case 'Sauron': return 1;
            default: return 0;
        }
    }
}
