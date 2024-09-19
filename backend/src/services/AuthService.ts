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
}
