import {createRing, Ring, updateRing} from "@/models/RingModel";
import {CreateUser} from "@/models/UserModel";
import axios, {AxiosInstance} from "axios";

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

    async createRing(ringData: createRing): Promise<Ring | null> {
        const response = await this.api.post(
            "/anel",
            {
                ...ringData,
            },
            {
                withCredentials: false,
            }
        );

        if (!response.data) throw new Error("Erro ao criar o anel");

        return response.data;
    }

    async getRing() {
        return await this.api.get("/anel");
    }

    async createUser(userData: CreateUser) {
        const res = await this.api.post("/signup", userData);
        if (res.status === 201) {
            return true;
        }
    }


    async login(credentials: { email: string; senha: string }) {
        return await this.api.post('/auth/login', credentials);
    }

    async updateRing(data: updateRing) {
        await this.api.put("/anel/" + data.id, data);
    }

    async deleteRing(id: string) {
        try {
            const { data  } = await this.api.delete(`/anel/${id}`);
            console.log(data .message);
            return data ;
        } catch (error: any) {
            console.error(error.response?.data?.error);
        }
    }
}
