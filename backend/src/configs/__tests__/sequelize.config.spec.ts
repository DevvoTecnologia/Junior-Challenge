import sequelizeAsyncConfig from "../sequelize.config";

describe("sequelize.config", () => {
  it("should return the sequelize configuration", () => {
    expect(sequelizeAsyncConfig).toBeDefined();
  });
});
