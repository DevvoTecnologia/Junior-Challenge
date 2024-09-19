import jwt from "jsonwebtoken";

export default class TokenHelper {
  private static secretKey = "Str0ngS3cr3tK3y";

  static GenerateToken(
    payload: object,
    expiresIn: string | number = "1h"
  ): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  static VerifyToken(token: string) {
    try {
      const sanitizedToken = token.replace("Bearer ", "");

      console.log(sanitizedToken);

      const isValid = jwt.verify(sanitizedToken, this.secretKey);

      return isValid;
    } catch (e) {
      console.log("Invalid token!!", e);
      return null;
    }
  }
}
