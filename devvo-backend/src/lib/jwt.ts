import { enc } from "crypto-js";
import AES from "crypto-js/aes";
import jwt from "jsonwebtoken";

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET as string;
  private readonly SECRET = process.env.SECRET as string;
  generateToken(id: string) {
    const token = jwt.sign({ id }, this.JWT_SECRET, {
      expiresIn: "1d",
    });

    return token;
  }

  verifyToken(token: string) {
    const decoded = jwt.verify(token, this.JWT_SECRET) as { id: string };
    return decoded ? decoded.id : null;
  }

  generateHash(password: string) {
    const hash = AES.encrypt(password, this.JWT_SECRET).toString();
    return hash;
  }

  decryptHash(hash: string) {
    const bytes = AES.decrypt(hash, this.JWT_SECRET);
    const originalText = bytes.toString(enc.Utf8);

    return originalText;
  }
}
