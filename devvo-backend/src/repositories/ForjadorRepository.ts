import { AppDataSource } from '../config/database';
import { Forjador } from "../domain/entities/Forjador";

export class ForjadorRepository {
  private repository = AppDataSource.getRepository(Forjador);

  public getAllForjadores() {
    console.log("Buscando forjadores no banco..."); 
    return this.repository.find(); 
  }
  
}
