import { UserCreateInput } from "../../repositories/user/types-user-repository";
import { UserRepository } from "../../repositories/user/user-repository";
import { UserServices } from "../user-services";

jest.mock("../../repositories/user/user-repository");

describe("RingServices", () => {
  let userServices: UserServices;
  let mockUserRepository: jest.Mocked<UserRepository>;

  const data: UserCreateInput = {
    name: "fulano",
    email: "Qp2XU@example.com",
    password: "123456",
  };

  beforeEach(() => {
    mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
    // mocking create
    mockUserRepository.create.mockResolvedValue({});

    userServices = new UserServices(mockUserRepository);
  });

  it("test should create a user", async () => {
    const result = await userServices.create(data);

    expect(result.message).toBe("Conta criada com sucesso.");
  });

  it("create should missing data", async () => {
    mockUserRepository.create.mockRejectedValue(
      new Error("Todos os campos são obrigatórios"),
    );
    const wrongData = { ...data, name: "" };
    const result = userServices.create(wrongData);

    await expect(result).rejects.toThrow("Todos os campos são obrigatórios");
  });

  it("test shouldnt create a user if it cant find it", async () => {
    mockUserRepository.create.mockRejectedValue(new Error("Database error"));

    const hash = "wiu101ih";
    const user = userServices.create({ ...data, password: hash });

    await expect(user).rejects.toThrow("Database error");
  });
});
