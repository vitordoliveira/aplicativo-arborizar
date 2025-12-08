import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<Usuario, 'password'> | null> {
    console.log('--- DEBUG: AuthService.validateUser ---');
    console.log('Tentando validar o email:', email);
    const user = await this.usuariosService.findByEmail(email);
    console.log('Usuário encontrado no banco:', user);
    if (!user) {
      console.log('Resultado: Falha (Usuário não encontrado)');
      console.log('---------------------------------');
      return null;
    }
    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    console.log('Resultado da comparação de senha:', isPasswordMatch);
    if (isPasswordMatch) {
      console.log('Resultado: Sucesso (Senha correta)');
      console.log('---------------------------------');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } else {
      console.log('Resultado: Falha (Senha incorreta)');
      console.log('---------------------------------');
      return null;
    }
  }

  login(user: Omit<Usuario, 'password'>) {
    console.log('--- DEBUG: AuthService.login ---');
    console.log('Criando token para o usuário:', user.email);
    console.log('---------------------------------');
    const payload = {
      sub: user.id_usuario,
      email: user.email,
      tipo: String(user.tipo),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getDashboardData(idAluno: number, authToken: string) {
    const usuario = await this.usuariosService.findOne(idAluno);

    const headers = { Authorization: `Bearer ${authToken}` };

    let contagemArvores = 0;
    try {
      const responseGeo = await firstValueFrom(
        this.httpService
          .get<number>('http://localhost:8082/plantios/stats/me', { headers })
          .pipe(
            catchError((error: AxiosError) => {
              console.error('!!!!!! ERRO NA CHAMADA PARA O GEO-SERVICE !!!!!');
              console.error(
                'Erro real:',
                error.response?.status,
                error.response?.data,
              );
              console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
              throw new Error('Erro ao buscar estatísticas do geo-service');
            }),
          ),
      );
      contagemArvores = responseGeo.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Erro desconhecido ao buscar estatísticas', error);
      }
    }

    const contagemMedalhas = 8;
    const ranking = '43º';

    return {
      usuario: usuario,
      stats: {
        arvoresPlantadas: contagemArvores,
        medalhas: contagemMedalhas,
        ranking: ranking,
      },
    };
  }
}
