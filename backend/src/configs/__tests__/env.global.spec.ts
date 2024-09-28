import envGlobal from "../env.global";

describe("env.global", () => {
  it("should return the global environment configuration", () => {
    expect(envGlobal).toBeDefined();
  });
});
