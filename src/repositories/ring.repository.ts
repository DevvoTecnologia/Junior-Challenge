import { CriarAnelDTO, AtualizarAnelDTO, DeletarAnelDTO } from '../dtos/ring.dto';
import { Repository } from './Repository';
import { Anel } from '../entities/anel.entity';

export class RingRepository extends Repository {

    // Criar um novo anel
    async criarAnel(dto: CriarAnelDTO): Promise<Anel> {
        // Lógica para verificar a quantidade de anéis
        const anelExistente = await this.db.anel.findMany({
            where: { forjadoPor: dto.forjadoPor },
        });
        if (anelExistente.length >= this.getMaxRings(dto.forjadoPor)) {
            throw new Error('LIMIT_EXCEEDED');
        }

        return this.db.anel.create({
            data: dto,
        });
    }

    // Listar todos os anéis
    async listarAneis(): Promise<Array<Anel>> {
        return this.db.anel.findMany();
    }

    // Atualizar um anel existente
    async atualizarAnel(id: string, dto: AtualizarAnelDTO): Promise<Anel | null> {
        return this.db.anel.update({
            where: {id: id},
            data: dto,
        });
    }

    // Deletar um anel
    async deletarAnel(dto: DeletarAnelDTO): Promise<void> {
        await this.db.anel.delete({
            where: { id: dto.id },
        });
    }

    private getMaxRings(forjadoPor: string): number {
        switch (forjadoPor) {
            case 'Elfos': return 3;
            case 'Anões': return 7;
            case 'Homens': return 9;
            case 'Sauron': return 1;
            default: return 0;
        }
    }
}
