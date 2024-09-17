import { Controller, Post, Route, Security, Tags, Body, Response } from 'tsoa';
import Usuario from '../entities/Usuario';
import dataSource from '../../ormconfig';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { GeneralResponse } from '../models/ResponseModel';

const usuarioRepository = dataSource.getRepository(Usuario);

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
    @Post('/login')
    @Response<GeneralResponse<{ token: string; user: Partial<Usuario> }>>(200, 'Login realizado com sucesso')
    @Response<GeneralResponse<{ message: string }>>(400, 'Email ou senha inválidos, por favor verifique suas credenciais.')
    @Response<GeneralResponse<{ message: string }>>(500, 'Internal Server Error')
    public static async login(@Body() body: { email: string; senha: string }): Promise<GeneralResponse<{ token?: string; user?: Partial<Usuario>; message?: string }>> {
        const { email, senha } = body;

        try {
            
            const usuario = await usuarioRepository.findOneBy({ email });
            console.log('User from DB:', usuario);

            if (!usuario) {
                return { success: false, status: 'Este email não esta cadastrado,  por favor verifique suas credenciais.' };
            }

           
            const match = await bcrypt.compare(senha, usuario.senha);

            if (!match) {
                return { success: false, status: 'Email ou senha inválidos, por favor verifique suas credenciais.' };
            }

         
            const token = generateToken(usuario.id);
            console.log('Generated Token:', token);

            const userData = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                race:usuario.race
       
            };

            return { success: true, status: 'Login realizado com sucesso', data: { token, user: userData } };
        } catch (error: any) {
            console.error('Login Error:', error.message);
            return { success: false, status: 'Internal Server Error', data: { message: error.message } };
        }
    }
}
