import envGlobal from "../env.global";

describe("env.global", () => {
  it("should return the global environment configuration", () => {
    expect(envGlobal).toBeDefined();
  });

  it("should have a nodeEnv property", () => {
    const config = envGlobal();
    expect(config.nodeEnv).toBeDefined();
    expect(config.nodeEnv).toBe(process.env.NODE_ENV ?? "development");
  });

  it("should return development as default value for nodeEnv", () => {
    delete process.env.NODE_ENV;

    const config = envGlobal();

    expect(config.nodeEnv).toBe("development");
  });

  it("should have an allowedOrigin property", () => {
    const config = envGlobal();
    expect(config.allowedOrigin).toBeDefined();
    expect(config.allowedOrigin).toBe(
      process.env.ALLOWED_ORIGIN ?? "http://localhost:3001",
    );
  });

  it("should have a host and port property", () => {
    const config = envGlobal();
    expect(config.host).toBeDefined();
    expect(config.host).toBe(process.env.HOST ?? "localhost");
    expect(config.port).toBeDefined();
    expect(config.port).toBe(
      process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    );
  });

  it("should return 3000 as default value for port", () => {
    delete process.env.PORT;

    const config = envGlobal();

    expect(config.port).toBe(3000);
  });

  it("should parse the port as an integer", () => {
    process.env.PORT = "3001";

    const config = envGlobal();

    expect(config.port).toBe(3001);
  });

  it("should have imagesUrl property", () => {
    const config = envGlobal();
    expect(config.imagesUrl).toBeDefined();
    expect(config.imagesUrl).toBe(
      process.env.IMAGES_URL ?? "http://localhost:3000/uploads",
    );
  });

  describe("database configuration", () => {
    it("should have a database configuration", () => {
      const config = envGlobal();
      expect(config.database).toBeDefined();
      expect(config.database.dialect).toBe(process.env.DB_DIALECT ?? "mysql");
      expect(config.database.host).toBe(process.env.DB_HOST ?? "localhost");
      expect(config.database.port).toBe(
        process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      );
      expect(config.database.username).toBe(process.env.DB_USERNAME ?? "root");
      expect(config.database.password).toBe(process.env.DB_PASSWORD ?? "toor");
      expect(config.database.name).toBe(process.env.DB_NAME ?? "ringdb");
    });

    it("should return 3306 as default value for database port", () => {
      delete process.env.DB_PORT;

      const config = envGlobal();

      expect(config.database.port).toBe(3306);
    });

    it("should parse the database port as an integer", () => {
      process.env.DB_PORT = "3307";

      const config = envGlobal();

      expect(config.database.port).toBe(3307);
    });
  });

  it("should have a token configuration", () => {
    const config = envGlobal();
    expect(config.token).toBeDefined();
    expect(config.token.secret).toBe(process.env.TOKEN_SECRET);
    expect(config.token.expiration).toBe(process.env.TOKEN_EXPIRATION ?? "1d");
  });
});
