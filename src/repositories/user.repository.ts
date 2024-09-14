import bcrypt from "bcrypt";
import { CriarUserDTO, BuscarTodosAneisDTO } from "../dtos/user.dto";
import { Repository } from "./Repository";
import { User} from "../entities/user.entity";
import { Anel } from "../entities/anel.entity";

export class UserRepository extends Repository {
    async criar(user: CriarUserDTO): Promise<void> {
        const hashedPassword = await bcrypt.hash(user.senha, 10);
        delete user.senha;
        await this.db.user.create({
            data: {
                ...user,
                senha_hash: hashedPassword,
            },
        });
    }

    async buscarPorEmail(email: string): Promise<User | null> {
        return this.db.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    async buscarTodosAneis(data: BuscarTodosAneisDTO): Promise<Array<Anel>> {
        return (
            await this.db.user.findUnique({
                where: {
                    id: data.userId,
                },
                select: {
                    Anel: {
                        where: {
                            userId: data.userId,
                        },
                    },
                },
            })
        ).Anel as any;
    }
}
