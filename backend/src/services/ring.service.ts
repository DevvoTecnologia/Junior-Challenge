import { AnelRepository } from '../repositories/ring.repository';
import { ElfosStrategy, AnoesStrategy, HomensStrategy, SauronStrategy, ForjadorContext } from '../utils/ring.util';

export class AnelService {
  private anelRepository: AnelRepository;

  constructor(anelRepository: AnelRepository) {
    this.anelRepository = anelRepository;
  }

  async createAnel(data: any) {
    const { forjadoPor } = data;

    let forjadorContext: ForjadorContext;
    switch (forjadoPor) {
      case 'Elfos':
        forjadorContext = new ForjadorContext(new ElfosStrategy());
        break;
      case 'Anões':
        forjadorContext = new ForjadorContext(new AnoesStrategy());
        break;
      case 'Homens':
        forjadorContext = new ForjadorContext(new HomensStrategy());
        break;
      case 'Sauron':
        forjadorContext = new ForjadorContext(new SauronStrategy());
        break;
      default:
        throw new Error('Forjador inválido');
    }

    const limite = forjadorContext.getLimite();
    const anelCount = await this.anelRepository.countAnelByForjador(forjadoPor);

    if (anelCount >= limite) {
      throw new Error(`${forjadoPor} não pode criar mais que ${limite} anéis`);
    }

    return await this.anelRepository.create(data);
  }

  async listAllAnel() {
    return await this.anelRepository.findAll();
  }

  async updateAnel(id: number, data: any) {
    const anel = await this.anelRepository.findById(id);
    if (!anel) throw new Error('Anel não encontrado');
    return await anel.update(data);
  }

  async deleteAnel(id: number) {
    const anel = await this.anelRepository.findById(id);
    if (!anel) throw new Error('Anel não encontrado');
    await anel.destroy();
  }
}
