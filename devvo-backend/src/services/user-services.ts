import { AuthService } from "../lib/jwt";
import { UserCreateInput } from "../repositories/user/types-user-repository";
import { UserRepository } from "../repositories/user/user-repository";

export class UserServices {
  constructor(
    private readonly userRepository = new UserRepository(),
    private readonly authService = new AuthService(),
  ) {}

  async create(data: UserCreateInput): Promise<{ message: string }> {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error("Email já existe");
    }

    const hash = this.authService.generateHash(data.password);
    const user = await this.userRepository.create({ ...data, password: hash });

    if (!user) {
      throw new Error("Database error");
    }

    this.authService.generateToken(user.id);

    return { message: "Conta criada com sucesso." };
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email ou senha inválidos");
    }

    const passwordDecrypted = this.authService.decryptHash(user.password);

    if (passwordDecrypted !== password) {
      throw new Error("Senha inválida");
    }

    const token = this.authService.generateToken(user.id);
    return { token };
  }

  async findByToken(token: string) {
    const id = this.authService.verifyToken(token);

    if (!id) {
      throw new Error("Token inválido");
    }

    const user = await this.userRepository.findById(id);

    return user;
  }
}
