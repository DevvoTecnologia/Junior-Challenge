import { IGetRingsController, IGetRingsRepository } from "./protocols";

export class GetRingsController implements IGetRingsController {

    constructor(private readonly getRingsRepository: IGetRingsRepository){}
        
    async handle() {
        try {
            // validar requisicao
            // redirecionar 
            const rings = await this.getRingsRepository.getRings();
    
            return {
                statusCode: 200,
                body: rings,
            };
        } catch (error) {
            console.error('Error occurred:', error);
    
            return {
                statusCode: 500,
                body: "Something Went Wrong.",
            };
        }
    }       
}