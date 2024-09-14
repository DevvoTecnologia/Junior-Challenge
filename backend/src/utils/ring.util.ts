import { Anel } from '../models/ring.model';

export const findAnelById = async (id: number) => {
  const anel = await Anel.findByPk(id);
  if (!anel) throw new Error('Anel não encontrado');
  return anel;
};

export interface ForjadorStrategy {
  getLimite(): number;
}

export class ElfosStrategy implements ForjadorStrategy {
  getLimite() {
    return 3;
  }
}

export class AnoesStrategy implements ForjadorStrategy {
  getLimite() {
    return 7;
  }
}

export class HomensStrategy implements ForjadorStrategy {
  getLimite() {
    return 9;
  }
}

export class SauronStrategy implements ForjadorStrategy {
  getLimite() {
    return 1;
  }
}

export class ForjadorContext {
  private strategy: ForjadorStrategy;

  constructor(strategy: ForjadorStrategy) {
    this.strategy = strategy;
  }

  getLimite() {
    return this.strategy.getLimite();
  }
}
