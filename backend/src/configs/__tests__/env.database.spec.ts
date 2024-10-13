import envDatabase from "../env.database";

describe("env.database", () => {
  it("should return the databases environment configuration", () => {
    expect(envDatabase).toBeDefined();
  });

  describe("mysql database configuration", () => {
    it("should have a database configuration", () => {
      const config = envDatabase();
      expect(config.database).toBeDefined();
      expect(config.database.mysql.dialect).toBe(process.env.DB_DIALECT);
      expect(config.database.mysql.host).toBe(process.env.DB_HOST);
      expect(config.database.mysql.port).toBe(
        parseInt(process.env.DB_PORT!, 10),
      );
      expect(config.database.mysql.username).toBe(process.env.DB_USERNAME);
      expect(config.database.mysql.password).toBe(process.env.DB_PASSWORD);
      expect(config.database.mysql.name).toBe(process.env.DB_NAME);
    });

    it("should parse the database port as an integer", () => {
      process.env.DB_PORT = "3307";

      const config = envDatabase();

      expect(config.database.mysql.port).toBe(3307);
    });
  });
});
