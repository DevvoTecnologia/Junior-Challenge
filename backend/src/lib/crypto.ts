import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

export function decrypt(
  hash: { iv: string; content: string },
  algorithm: Algorithm["name"],
  secretKey: string,
): string {
  const decipher = createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex"),
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString();
}

export function encrypt(
  text: string,
  algorithm: Algorithm["name"],
  secretKey: string,
  ivSize: number,
): {
  iv: string;
  content: string;
} {
  const iv = randomBytes(ivSize);
  const cipher = createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
}
