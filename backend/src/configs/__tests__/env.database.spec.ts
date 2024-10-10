import envDatabase from "../env.database";

describe("env.global", () => {
  it("should return the global environment configuration", () => {
    expect(envDatabase).toBeDefined();
  });

  describe("mysql database configuration", () => {
    it("should have a database configuration", () => {
      const config = envDatabase();
      expect(config.database).toBeDefined();
      expect(config.database.mysql.dialect).toBe(
        process.env.DB_DIALECT ?? "mysql",
      );
      expect(config.database.mysql.host).toBe(
        process.env.DB_HOST ?? "localhost",
      );
      expect(config.database.mysql.port).toBe(
        process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      );
      expect(config.database.mysql.username).toBe(
        process.env.DB_USERNAME ?? "root",
      );
      expect(config.database.mysql.password).toBe(
        process.env.DB_PASSWORD ?? "toor",
      );
      expect(config.database.mysql.name).toBe(process.env.DB_NAME ?? "ringdb");
    });

    it("should return 3306 as default value for database port", () => {
      delete process.env.DB_PORT;

      const config = envDatabase();

      expect(config.database.mysql.port).toBe(3306);
    });

    it("should parse the database port as an integer", () => {
      process.env.DB_PORT = "3307";

      const config = envDatabase();

      expect(config.database.mysql.port).toBe(3307);
    });
  });
});
