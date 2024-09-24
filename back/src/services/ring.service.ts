import { CriarAnelDTO, AtualizarAnelDTO, DeletarAnelDTO } from '../dtos/ring.dto';
import { RingRepository } from '../repositories/ring.repository';
import {MESSAGES} from "../utils/ring.messages";

export class RingService {
    private ringRepository: RingRepository;

    constructor() {
        this.ringRepository = new RingRepository();
    }

    async criarAnel(dto: CriarAnelDTO) {
        const aneisExistentes = await this.ringRepository.listarAneisPorForjador(dto.forjadoPor, dto.userId);
        if (aneisExistentes.length >= this.getMaxRings(dto.forjadoPor)) {
            throw new Error(MESSAGES.ANEL_EXCEEDED_LIMIT.description);
        }
        return this.ringRepository.criarAnel(dto);
    }

    async listarAneis(portadorId: string) {
        return this.ringRepository.listarAneis(portadorId);
    }
    async listarAneisPorForjador(forjadoPor: string, userId: string) {
        return this.ringRepository.listarAneisPorForjador(forjadoPor, userId);
    }
    async atualizarAnel(id: string, dto: AtualizarAnelDTO) {
        return this.ringRepository.atualizarAnel(id, dto);
    }

    async deletarAnel(dto: DeletarAnelDTO) {
        return this.ringRepository.deletarAnel(dto.id);
    }

    getMaxRings(forjadoPor: string) {
        switch (forjadoPor) {
            case 'Elfos': return 3;
            case 'Anões': return 7;
            case 'Homens': return 9;
            case 'Sauron': return 1;
            default: return 0;
        }
    }
}
