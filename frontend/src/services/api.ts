import { createRing, Ring, updateRing } from "@/models/RingModel";
import { CreateUser } from "@/models/UserModel";
import axios, { AxiosInstance } from "axios";

export default class Api {
  private api: AxiosInstance;

  constructor(token: string = "") {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }

  async createRing(ringData: createRing) {
    const response = await this.api.post(
      "/anel",
      { ...ringData },
      { withCredentials: false }
    );

    return response;
  }

  async getRing() {
    return await this.api.get("/anel");
  }


  async createUser(userData: CreateUser) {
    const res = await this.api.post("/signup", userData);
    return res;
  }

  async login(credentials: { email: string; senha: string }) {
    return await this.api.post("/auth/login", credentials);
  }

  async updateRing(data: updateRing) {
    return await this.api.put("/anel/" + data.id, data);
  }

  async deleteRing(id: string) {
    const response = await this.api.delete(`/anel/${id}`);
    return response;
  }
}
