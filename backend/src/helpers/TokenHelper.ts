import jwt from "jsonwebtoken";

export default class TokenHelper {
  private static secretKey = "Str0ngS3cr3tK3y";

  static GenerateToken(
    payload: object,
    expiresIn: string | number = "1h"
  ): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  static VerifyToken(token: string): object | string {
    try {
      const sanitizedToken = token.replace("Bearer ", "");

      console.log(sanitizedToken);

      return jwt.verify(sanitizedToken, this.secretKey);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
