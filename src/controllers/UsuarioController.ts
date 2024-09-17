import { Controller, Get, Post, Route, Tags, Body, Path, Security, Response } from 'tsoa';
import Usuario from '../entities/Usuario';
import dataSource from '../../ormconfig';
import bcrypt from 'bcrypt';
import { GeneralResponse } from '../models/ResponseModel';

const usuarioRepository = dataSource.getRepository(Usuario);

@Security("BearerAuth")
@Route('api/usuarios')
@Tags('Usuarios')
export class UsuarioController extends Controller {


  @Get('/')
  @Response<GeneralResponse<Usuario[]>>(200, 'Usuários encontrados com sucesso')
  public static async listarUsuarios(): Promise<GeneralResponse<Usuario[]>> {
    const usuarios = await usuarioRepository.find();
    return { success: true, status: 'Usuários encontrados com sucesso', data: usuarios };
  }


  @Get('{id}')
  @Response<GeneralResponse<Usuario>>(200, 'Usuário encontrado com sucesso')
  @Response<GeneralResponse<{ message: string }>>(404, 'Usuário não encontrado')
  public static async obterUsuarioPorId(@Path() id: number): Promise<GeneralResponse<Usuario | { message: string }>> {
    const usuario = await usuarioRepository.findOneBy({ id });
    if (!usuario) {
      return { success: false, status: 'Usuário não encontrado', data: { message: 'Usuário não encontrado' } };
    }
    return { success: true, status: 'Usuário encontrado com sucesso', data: usuario };
  }

 
  @Post('/')
  @Response<GeneralResponse<Usuario>>(201, 'Usuário criado com sucesso')
  @Response<GeneralResponse<{ message: string }>>(400, 'Error ao criar usuário')
  public static async criarUsuario(@Body() body: { nome: string, email: string, senha: string }): Promise<GeneralResponse<Usuario | { message: string }>> {
    const { nome, email, senha } = body;
    
    try {
      const hashedPassword = await bcrypt.hash(senha, 10);
      const novoUsuario = usuarioRepository.create({
        nome,
        email,
        senha: hashedPassword,
      });
      const usuarioCriado = await usuarioRepository.save(novoUsuario);
      return { success: true, status: 'Usuário criado com sucesso', data: usuarioCriado };
    } catch (error: any) {
      return { success: false, status: 'Error ao criar usuário', data: { message: error.message } };
    }
  }
}
