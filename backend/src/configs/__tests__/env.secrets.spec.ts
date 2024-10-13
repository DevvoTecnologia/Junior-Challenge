import envSecrets from "../env.secrets";

describe("env.secrets", () => {
  it("should return the environment configuration", () => {
    expect(envSecrets).toBeDefined();
  });

  describe("token", () => {
    it("should have a token configuration", () => {
      const config = envSecrets();
      expect(config.token).toBeDefined();
      expect(config.token.secret).toBe(process.env.TOKEN_SECRET);
      expect(config.token.expiration).toBe(
        process.env.TOKEN_EXPIRATION ?? "1d",
      );
    });
  });

  describe("queryParams", () => {
    it("should have a query params configuration", () => {
      const config = envSecrets();
      expect(config.queryParams).toBeDefined();
      expect(config.queryParams.secret).toBe(
        process.env.QUERYPARAMS_OAUTH_PRIVATE_KEY,
      );
    });
  });
});
