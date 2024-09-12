import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { LoginDTO } from "../dtos/auth.dto";
import { PortadorRepository } from "../repositories/portador.repository";

const jwtSecret = process.env.JWT_SECRET;
const portadorRepository = new PortadorRepository();

export class AuthService {
    async login(credentials: LoginDTO) {
        const portador = await portadorRepository.buscarPorEmail(credentials.email);
        if (!portador || !portador.senha_hash) {
            throw new Error("Portador não encontrado");
        }

        const authorized = bcrypt.compare(credentials.password, portador.senha_hash);
        if (!authorized) {
            throw new Error("Não autorizado");
        }

        const jwt = await new SignJWT({ id: portador.id, name: portador.nome, email: portador.email })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("1h")
            .sign(new TextEncoder().encode(jwtSecret));

        return jwt;
    }
}
