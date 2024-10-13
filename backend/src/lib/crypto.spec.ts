import * as crypto from "crypto";

import { encrypt, decrypt } from "./crypto";
describe("Crypto Library", () => {
  const algorithm = "aes-256-cbc";
  const secretKey = "12345678901234567890123456789012"; // 32 bytes key for aes-256-cbc
  const ivSize = 16; // 16 bytes for aes-256-cbc

  it("should encrypt and decrypt text correctly", () => {
    const text = "Hello, World!";
    const encrypted = encrypt(text, algorithm, secretKey, ivSize);
    const decrypted = decrypt(encrypted, algorithm, secretKey);

    expect(decrypted).toBe(text);
  });

  it("should return different encrypted content for the same text with different IVs", () => {
    const text = "Hello, World!";
    const encrypted1 = encrypt(text, algorithm, secretKey, ivSize);
    const encrypted2 = encrypt(text, algorithm, secretKey, ivSize);

    expect(encrypted1.content).not.toBe(encrypted2.content);
    expect(encrypted1.iv).not.toBe(encrypted2.iv);
  });

  it("should throw a decryption error if the content is not valid hex", () => {
    const text = "Hello, World!";
    const encrypted = encrypt(text, algorithm, secretKey, ivSize);

    encrypted.content = "not-hex";

    expect(() => decrypt(encrypted, algorithm, secretKey)).toThrow(
      "Data integrity check failed! Data has been tampered with.",
    );
  });

  it("should throw an error if decryption is attempted with the wrong key", () => {
    const text = "Hello, World!";
    const encrypted = encrypt(text, algorithm, secretKey, ivSize);
    const wrongKey = "wrongkeywrongkeywrongkeywrongkey";

    expect(() => decrypt(encrypted, algorithm, wrongKey)).toThrow();
  });

  it("should throw an error if decryption is attempted with the wrong algorithm", () => {
    const text = "Hello, World!";
    const encrypted = encrypt(text, algorithm, secretKey, ivSize);
    const wrongAlgorithm = "aes-192-cbc";

    expect(() => decrypt(encrypted, wrongAlgorithm, secretKey)).toThrow();
  });

  it("should throw an unknown error if a non-Error is thrown", () => {
    jest.spyOn(crypto, "createDecipheriv").mockImplementation(() => {
      throw new Error("Some error occurred");
    });

    const text = "Hello, World!";
    const encrypted = encrypt(text, algorithm, secretKey, ivSize);

    expect(() => decrypt(encrypted, algorithm, secretKey)).toThrow(
      "Decryption failed: Some error occurred",
    );

    jest.restoreAllMocks();
  });

  it("should throw an unknown error if a non-Error is thrown", () => {
    jest.spyOn(crypto, "createDecipheriv").mockImplementation(() => {
      throw "Non-error object"; // nosonar
    });

    const text = "Hello, World!";
    const encrypted = encrypt(text, algorithm, secretKey, ivSize);

    expect(() => decrypt(encrypted, algorithm, secretKey)).toThrow(
      "Decryption failed: Unknown error",
    );

    jest.restoreAllMocks();
  });
});
