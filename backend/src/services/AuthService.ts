import ApiResponse from "../helpers/ApiResponseType";
import UserModel, { User } from "../schemas/UsersModel";

export default class AuthService {
  static async Authenticate({ email, password }: User) {
    const userExists = await UserModel.exists({ email, password });

    if (!userExists) {
      return new ApiResponse({
        message: "Wrong credentials",
        success: false,
      });
    }

    return new ApiResponse({
      message: "User authenticated",
      success: true,
    });
  }
}
