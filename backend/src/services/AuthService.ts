import ApiResponse from "../helpers/ApiResponseType";
import UserModel, { User } from "../schemas/UsersModel";

export default class AuthService {
  static async Authenticate({ email, password }: User) {
    const userExists = await UserModel.exists({ email, password });

    if (!userExists) {
      return new ApiResponse({
        message:
          "Credenciais incorretas, viajante. Parece que esta chave não se encaixa nas portas deste reino.",
        success: false,
      });
    }

    return new ApiResponse({
      message:
        "Usuário autenticado com sucesso, viajante. As portas do reino estão agora abertas para você.",
      success: true,
    });
  }

  static async CreateAccount({ email, password }: User) {
    const userExists = await UserModel.exists({ email });

    if (userExists) {
      return new ApiResponse({
        message:
          "Este email já está sendo utilizado por outro viajante. Por favor, escolha outro.",
        success: false,
      });
    }

    await UserModel.create({ email, password });

    return new ApiResponse({
      message:
        "Usuário criado com sucesso, viajante. As portas do reino estão agora abertas para você.",
      success: true,
    });
  }
}
