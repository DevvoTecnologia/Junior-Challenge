import { AnelAtualizarDto, AnelCriarDto, AnelDto } from "../types/anel.type";
import api from "./api.service";

export default class AnelService {
	static async listar(): Promise<AnelDto[]> {
		return api.get<AnelDto[]>("/anel").then(({ data }) => data);
	}

	static async buscarPorId(id: string): Promise<AnelDto> {
		return api.get<AnelDto>(`/anel/${id}`).then(({ data }) => data);
	}

	static async criar(body: AnelCriarDto): Promise<AnelDto> {
		return api.post<AnelDto>("/anel", body).then(({ data }) => data);
	}

	static async atualizar(id: string, body: AnelAtualizarDto): Promise<AnelDto> {
		return api.put<AnelDto>(`/anel/${id}`, body).then(({ data }) => data);
	}

	static async deletar(id: string): Promise<void> {
		return api.delete(`/anel/${id}`).then(() => undefined);
	}
}
