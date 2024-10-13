import envSecrets from "../env.secrets";

describe("env.secrets", () => {
  it("should return the environment configuration", () => {
    expect(envSecrets).toBeDefined();
  });

  it("should have a token configuration", () => {
    const config = envSecrets();
    expect(config.token).toBeDefined();
    expect(config.token.secret).toBe(process.env.TOKEN_SECRET);
    expect(config.token.expiration).toBe(process.env.TOKEN_EXPIRATION ?? "1d");
  });
});
