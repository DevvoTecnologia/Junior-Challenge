import { CriarAnelDTO, AtualizarAnelDTO, DeletarAnelDTO } from '../dtos/ring.dto';

export class RingService {
    private rings: any[] = [];

    async criarAnel(dto: CriarAnelDTO) {
        if (this.rings.filter(ring => ring.forjadoPor === dto.forjadoPor).length >= this.getMaxRings(dto.forjadoPor)) {
            throw new Error('LIMIT_EXCEEDED');
        }
        const newRing = { id: this.rings.length + 1, ...dto };
        this.rings.push(newRing);
        return newRing;
    }

    async listarAneis() {
        return this.rings;
    }

    async atualizarAnel(id: string, dto: AtualizarAnelDTO) {
        const ringIndex = this.rings.findIndex(ring => ring.id === parseInt(id, 10));
        if (ringIndex === -1) throw new Error('NOT_FOUND');
        this.rings[ringIndex] = { ...this.rings[ringIndex], ...dto };
        return this.rings[ringIndex];
    }

    async deletarAnel(dto: DeletarAnelDTO) {
        const ringIndex = this.rings.findIndex(ring => ring.id === parseInt(dto.id, 10));
        if (ringIndex === -1) throw new Error('NOT_FOUND');
        this.rings.splice(ringIndex, 1);
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
