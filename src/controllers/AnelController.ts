import { Controller, Get, Post, Route, Tags, Body, Path, Security, Response, UploadedFile, Delete, Put } from 'tsoa';
import Anel from '../entities/Anel';
import Usuario from '../entities/Usuario';
import dataSource from '../../ormconfig';
import { GeneralResponse } from '../models/ResponseModel';
import path from 'path';
import fs from 'fs';

const anelRepository = dataSource.getRepository(Anel);
const usuarioRepository = dataSource.getRepository(Usuario);


@Security("BearerAuth")
@Route('api/aneis')
@Tags('Anéis')
export class AnelController extends Controller {

  @Get('/')
  @Response<GeneralResponse<Anel[]>>(200, 'List of Rings retrieved successfully')
  @Response<GeneralResponse<{ message: string }>>(500, 'Internal Server Error')
  public static async listarAneis(): Promise<GeneralResponse<Anel[] | { message: string }>> {
    try {
      const aneis = await anelRepository.find({ relations: ['portador', 'forjadoPor'] });
  
      const result:any = aneis.map(anel => {
        return {
          ...anel,
          imagem: anel.imagem ? `http://localhost:3000/images/${anel.imagem}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEB37ulCdi_AB8YLY5x98uk-s1uUxUTcL6kg&s'
        };
      });
  
      return { success: true, status: 'Rings retrieved successfully', data: result };
    } catch (error: any) {
      return { success: false, status: 'Internal Server Error', data: { message: error.message } };
    }
  }

  @Get('{id}')
  @Response<GeneralResponse<Anel>>(200, 'Ring retrieved successfully')
  @Response<GeneralResponse<{ message: string }>>(404, 'Anel não encontrado')
  @Response<GeneralResponse<{ message: string }>>(500, 'Internal Server Error')
  public static async obterAnelPorId(@Path() id: number): Promise<GeneralResponse<Anel | { message: string }>> {
    try {
      const anel = await anelRepository.findOne({ where: { id }, relations: ['portador', 'forjadoPor'] });
      if (!anel) {
        return { success: false, status: 'Anel não encontrado', data: { message: 'Anel não encontrado' } };
      }
      return { success: true, status: 'Ring retrieved successfully', data: anel };
    } catch (error: any) {
      return { success: false, status: 'Internal Server Error', data: { message: error.message } };
    }
  }

  @Post('/')
  @Response<GeneralResponse<Anel>>(201, 'Anel criado com sucesso')
  @Response<GeneralResponse<{ message: string }>>(400, 'Erro de validação')
  @Response<GeneralResponse<{ message: string }>>(500, 'Internal Server Error')
  public static async criarAnel(@Body() body: { nome: string, poder: string, descricao: string; portadorId: number, forjadoPorId: number, imagem: string }): Promise<GeneralResponse<Anel | { message: string }>> {
    const { nome, poder, portadorId, forjadoPorId, imagem, descricao } = body;
  
    try {
      const portador = await usuarioRepository.findOne({
        where: { id: portadorId },
        relations: ['portadorAneis'],
      });
      if (!portador) {
        return { success: false, status: 'Erro de validação', data: { message: 'Portador não encontrado' } };
      }
  
      const currentRingsCount = portador.portadorAneis ? portador.portadorAneis.length : 0;
  
      let maxRings: number;
      switch (portador.race) {
        case 'elfos':
          maxRings = 3;
          break;
        case 'anoes':
          maxRings = 7;
          break;
        case 'homens':
          maxRings = 9;
          break;
        case 'sauron':
          maxRings = 1;
          break;
        default:
          return { success: false, status: 'Erro de validação', data: { message: 'Raça do portador inválida' } };
      }
  
      console.log(currentRingsCount)
      console.log(maxRings)
      
      if (currentRingsCount >= maxRings) {
        return { success: false, status: 'Erro de validação', data: { message: `Portador já possui o número máximo de anéis para sua raça` } };
      }
  
      const forjador = await usuarioRepository.findOneBy({ id: forjadoPorId });
      if (!forjador) {
        return { success: false, status: 'Erro de validação', data: { message: 'Forjador não encontrado' } };
      }
  
      const novoAnel = anelRepository.create({
        nome,
        poder,
        portador,
        descricao,
        forjadoPor: forjador,
        imagem
      });
  
      const savedAnel = await anelRepository.save(novoAnel);
      return { success: true, status: 'Anel criado com sucesso', data: savedAnel };
    } catch (error: any) {
      return { success: false, status: 'Internal Server Error', data: { message: error.message } };
    }
  }
  

  

  @Put('/')
  @Response<GeneralResponse<Anel>>(200, 'Anel editado com sucesso')
  @Response<GeneralResponse<{ message: string }>>(400, 'Erro de validação')
  @Response<GeneralResponse<{ message: string }>>(404, 'Anel não encontrado')
  @Response<GeneralResponse<{ message: string }>>(500, 'Internal Server Error')
  public static async atualizarAnel(
    @Body() body: { id: number; nome?: string; poder?: string; descricao?: string; portadorId?: number; forjadoPorId?: number; imagem?: string }
  ): Promise<GeneralResponse<Anel | { message: string }>> {
    try {
      const { id, nome, poder, descricao, portadorId, forjadoPorId, imagem } = body;
  
      const anel = await anelRepository.findOne({ where: { id }, relations: ['portador', 'forjadoPor'] });
      if (!anel) {
        return { success: false, status: 'Anel não encontrado', data: { message: 'Anel não encontrado' } };
      }
  
      if (nome !== undefined) anel.nome = nome;
      if (poder !== undefined) anel.poder = poder;
      if (descricao !== undefined) anel.descricao = descricao;
  
    
  
      if (forjadoPorId !== undefined) {
        const forjador = await usuarioRepository.findOneBy({ id: forjadoPorId });
        if (!forjador) {
          return { success: false, status: 'Erro de validação', data: { message: 'Forjador não encontrado' } };
        }
        anel.forjadoPor = forjador;
        anel.portador = forjador;
      }
  
      if (imagem !== undefined && imagem !== '') {
        anel.imagem = imagem;
      }
  
      const updatedAnel = await anelRepository.save(anel);
      return { success: true, status: 'Anel editado com sucesso', data: updatedAnel };
    } catch (error: any) {
      return { success: false, status: 'Internal Server Error', data: { message: error.message } };
    }
  }
  


  @Post('/upload-image')
  @Response<GeneralResponse<{ ringId: number; imageName: string } | { message: string }>>(200, 'Imagem do anel recebida com sucesso')
  @Response<GeneralResponse<{ message: string }>>(400, 'Erro de validação')
  @Response<GeneralResponse<{ message: string }>>(500, 'Internal Server Error')
  public static async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() body: { id: number }): Promise<GeneralResponse<{ ringId: number; imageName: string } | { message: string }>> {
   
  
    const { id } = body;
  
    try {
      const portador = await usuarioRepository.findOne({
        where: { id: id },
        relations: ['portadorAneis'],
      });
      if (!portador) {
        return { success: false, status: 'Erro de validação', data: { message: 'Portador não encontrado' } };
      }
  
      const currentRingsCount = portador.portadorAneis ? portador.portadorAneis.length : 0;
  
      console.log("Portador: "+id)
      console.log("Portador: "+JSON.stringify(portador))
      console.log("Portador: "+portador.race)
      let maxRings: number;
      switch (portador.race) {
        case 'elfos':
          maxRings = 3;
          break;
        case 'anoes':
          maxRings = 7;
          break;
        case 'homens':
          maxRings = 9;
          break;
        case 'sauron':
          maxRings = 1;
          break;
        default:
          return { success: false, status: 'Erro de validação', data: { message: 'Raça do portador inválida' } };
      }
      console.log(currentRingsCount)
      console.log(maxRings)
      if (currentRingsCount >= maxRings) {
        return { success: false, status: 'Erro de validação', data: { message: `Portador já possui o número máximo de anéis para sua raça` } };
      }
  
      const placeholderRing = anelRepository.create({
        imagem: 'placeholder.png', 
        portador,  
      });
      const savedRing = await anelRepository.save(placeholderRing);
  
      const ringId = savedRing.id;
  
      const imageName = file.originalname || 'default.png'; 
      const imagePath = `/${ringId}_${imageName}`;
  
      const baseDir = path.resolve(__dirname, '..', '..', 'api', 'imgs');
      const uploadPath = path.join(baseDir, imagePath);
  
      const dir = path.dirname(uploadPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
  
    
      fs.writeFileSync(uploadPath, file.buffer);
  
      savedRing.imagem = imagePath;
      await anelRepository.save(savedRing);
  
      
      return { success: true, status: 'Imagem do anel recebida com sucesso', data: { ringId, imageName } };
    } catch (error: any) {
      console.error('Error:', error);
      return { success: false, status: 'Internal Server Error', data: { message: error.message } };
    }
  }
  

@Post('/edit-image')
@Response<GeneralResponse<{ ringId: number; imageName: string } | { message: string }>>(200, 'Imagem do anel recebida com sucesso')
@Response<GeneralResponse<{ message: string }>>(400, 'Erro de validação')
@Response<GeneralResponse<{ message: string }>>(404, 'Anel não encontrado')
@Response<GeneralResponse<{ message: string }>>(500, 'Internal Server Error')
public static async updateImage(
  @Body() body: { id: number },
  @UploadedFile() file: Express.Multer.File
): Promise<GeneralResponse<{ ringId: number; imageName: string } | { message: string }>> {
  if (!file || !file.buffer) {
    return { success: false, status: 'Erro de validação', data: { message: 'Image file buffer is missing' } };
  }

  const { id } = body;

  try {

    const anel = await anelRepository.findOne({ where: { id } });
    if (!anel) {
      return { success: false, status: 'Anel não encontrado', data: { message: 'Anel não encontrado' } };
    }

    const imageName = file.originalname || 'default.png'; 
    const imagePath = `/${id}_${imageName}`;

    const baseDir = path.resolve(__dirname, '..', '..', 'api', 'imgs');
    const uploadPath = path.join(baseDir, imagePath);

 
    const dir = path.dirname(uploadPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }


    fs.writeFileSync(uploadPath, file.buffer);

 
    if (anel.imagem && fs.existsSync(path.join(baseDir, anel.imagem))) {
      fs.unlinkSync(path.join(baseDir, anel.imagem));
    }


    anel.imagem = imagePath;
    const updatedAnel = await anelRepository.save(anel);

  
    return { success: true, status: 'Imagem do anel recebida com sucesso', data: { ringId: updatedAnel.id, imageName } };
  } catch (error: any) {
    console.error('Error:', error);
    return { success: false, status: 'Internal Server Error', data: { message: error.message } };
  }
}


  @Delete('{id}')
  @Response<GeneralResponse<null>>(200, 'Anel deletado com sucesso')
  @Response<GeneralResponse<{ message: string }>>(404, 'Anel não encontrado')
  @Response<GeneralResponse<{ message: string }>>(500, 'Internal Server Error')
  public static async deletarAnel(@Path() id: number): Promise<GeneralResponse<null | { message: string }>> {
    console.log("id:"+ id)
    try {
  
      const anel = await anelRepository.findOne({
        where: { id },
      });

      if (!anel) {
        return { success: false, status: 'Anel não encontrado', data: { message: 'Anel não encontrado' } };
      }

      if (anel.imagem) {
        const imagePath = path.resolve(__dirname, '..', '..', 'api', 'imgs', anel.imagem);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); 
        }
      }


      await anelRepository.remove(anel);

      return { success: true, status: 'Anel deletado com sucesso', data: null };
    } catch (error: any) {
      console.error('Error:', error); 
      return { success: false, status: 'Internal Server Error', data: { message: error.message } };
    }
  }

}
