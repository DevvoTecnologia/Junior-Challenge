import * as bcrypt from "bcrypt";
import { Sequelize } from "sequelize-typescript";
import { Ring } from "src/ring/entities/ring.entity";

import { User } from "./user.entity";

describe("User Entity", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });
    sequelize.addModels([User, Ring]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should hash the password before saving", async () => {
    const user = new User();
    user.password = "plainPassword";

    await User.hashPassword(user);

    expect(user.passwordHash).not.toBe("plainPassword");
    expect(bcrypt.compareSync("plainPassword", user.passwordHash)).toBe(true);
  });

  it("should validate the password correctly", async () => {
    const user = new User();
    user.password = "plainPassword";

    await User.hashPassword(user);

    const isValid = await user.passwordIsValid("plainPassword");
    expect(isValid).toBe(true);

    const isInvalid = await user.passwordIsValid("wrongPassword");
    expect(isInvalid).toBe(false);
  });
});
