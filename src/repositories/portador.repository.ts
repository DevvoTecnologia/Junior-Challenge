import bcrypt from "bcrypt";
import { CriarPortadorDTO, BuscarTodosAneisDTO } from "../dtos/portador.dto";
import { Repository } from "./Repository";
import { Portador } from "../entities/portador.entity";
import { Anel } from "../entities/anel.entity";

export class PortadorRepository extends Repository {
    async criar(portador: CriarPortadorDTO): Promise<void> {
        const hashedPassword = await bcrypt.hash(portador.senha, 10);
        delete portador.senha;

        await this.db.portador.create({
            data: {
                ...portador,
                senha_hash: hashedPassword,
            },
        });
    }

    async buscarPorEmail(email: string): Promise<Portador | null> {
        return this.db.portador.findUnique({
            where: {
                email: email,
            },
        });
    }

    async buscarTodosAneis(data: BuscarTodosAneisDTO): Promise<Array<Anel>> {
        return (
            await this.db.portador.findUnique({
                where: {
                    id: data.portadorId,
                },
                select: {
                    Anel: {
                        where: {
                            portadorId: data.portadorId,
                        },
                    },
                },
            })
        ).Anel as any;
    }
}
