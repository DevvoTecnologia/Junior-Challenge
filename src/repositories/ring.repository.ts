import { CriarAnelDTO, AtualizarAnelDTO } from '../dtos/ring.dto';
import { Repository } from './Repository';
import { Anel } from '../entities/anel.entity';

export class RingRepository extends Repository {
    async criarAnel(dto: CriarAnelDTO): Promise<Anel> {
        return this.db.anel.create({
            data: dto as any,
        });
    }

    async listarAneis(userId: string): Promise<Array<Anel>> {
        return this.db.anel.findMany({ where: { userId } , include: {HistoricoPortador: true } },);
    }

    async listarAneisPorForjador(forjadoPor: string): Promise<Array<Anel>> {
        return this.db.anel.findMany({ where: { forjadoPor } });
    }

    async atualizarAnel(id: string, dto: AtualizarAnelDTO): Promise<Anel | null> {
        const anel = await this.db.anel.findUnique({
            where: {id: id},
        })
        if (anel?.portador != dto.portador)
            await this.db.historicoPortador.create({
                data: {
                    anelId: id,
                    portador: dto.portador,
                    data: new Date().toISOString(),
                }
            })
        return this.db.anel.update({
            where: { id: id },
            data: dto,
        });
    }

    async deletarAnel(id: string): Promise<void> {
        await this.db.anel.delete({
            where: { id: id },
        });
    }
}
