import type { CipherKey } from "crypto";
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHmac,
} from "crypto";

// Helper function to generate the HMAC of a message
function generateHmac(secretKey: CipherKey, data: string): string {
  return createHmac("sha256", secretKey).update(data).digest("hex");
}

export function decrypt(
  hash: { iv: string; content: string; hmac: string }, // Now includes the HMAC
  algorithm: Algorithm["name"],
  secretKey: CipherKey,
): string {
  // Check data integrity
  const computedHmac = generateHmac(secretKey, hash.iv + hash.content);

  if (computedHmac !== hash.hmac) {
    throw new Error(
      "Data integrity check failed! Data has been tampered with.",
    );
  }

  try {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error("Decryption failed: " + err.message);
  }
}

export function encrypt(
  text: string,
  algorithm: Algorithm["name"],
  secretKey: CipherKey,
  ivSize: number,
): {
  iv: string;
  content: string;
  hmac: string;
} {
  const iv = randomBytes(ivSize);
  const cipher = createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  // Generate HMAC to ensure integrity
  const hmac = generateHmac(
    secretKey,
    iv.toString("hex") + encrypted.toString("hex"),
  );

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
    hmac, // Return HMAC to be verified during decryption
  };
}
