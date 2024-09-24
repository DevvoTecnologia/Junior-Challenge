import bcrypt from "bcrypt";
import {SignJWT} from "jose";
import {LoginDTO} from "../dtos/auth.dto";
import {UserRepository} from "../repositories/user.repository";
import {MESSAGES} from "../utils/auth.messages";

const jwtSecret = process.env.JWT_SECRET;
const userRepository = new UserRepository();

export class AuthService {
    async login(credentials: LoginDTO) {
        const user = await userRepository.buscarPorEmail(credentials.email);
        if (!user || !user.senha_hash) {
            throw new Error(MESSAGES.USER_NOT_EXIST.description);
        }
        const authorized = await bcrypt.compare(credentials.senha, user.senha_hash);
        if (!authorized) {
            throw new Error("Não autorizado");
        }
        return await new SignJWT({id: user.id, name: user.nome, email: user.email})
            .setProtectedHeader({alg: "HS256"})
            .setExpirationTime("3h")
            .sign(new TextEncoder().encode(jwtSecret));
    }
}
