import { Sequelize } from "sequelize-typescript";

import { Ring } from "./ring.entity";

describe("Ring Entity", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });
    sequelize.addModels([Ring]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should return the correct URL for the image", async () => {
    // Create a new ring instance
    await Ring.create({
      name: "One Ring",
      power: "Invisibility",
      owner: "Sauron",
      forgedBy: "Sauron",
      image: "one_ring.png",
    });

    // Retrieve the ring instance
    const foundRing = await Ring.findOne({ where: { name: "One Ring" } });

    // Test the URL getter
    const expectedUrl = `${process.env.IMAGES_URL ?? "http://localhost:3000/uploads"}/one_ring.png`;
    expect(foundRing?.url).toBe(expectedUrl);
  });
});
