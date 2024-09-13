import { Anel } from "../entities/anel.entity";
import { CriarPortadorDTO, BuscarTodosAneisDTO } from "../dtos/portador.dto";
import { PortadorRepository } from "../repositories/portador.repository";

export class PortadorService {
    private portadorRepository = new PortadorRepository();

    async createCustomer(portador: CriarPortadorDTO): Promise<void> {
        try {
            await this.portadorRepository.criar(portador);
        } catch (error) {
            throw new Error(String(error));
        }
    }

    async buscarTodosAneis(data: BuscarTodosAneisDTO): Promise<Array<Anel>> {
        try {
            return await this.portadorRepository.buscarTodosAneis(data);
        } catch (error) {
            throw new Error(String(error));
        }
    }
}
