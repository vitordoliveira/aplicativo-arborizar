// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<Usuario, 'password'> | null> {
    // --- NOVOS LOGS DE DEPURAÇÃO ---
    console.log('--- DEBUG: AuthService.validateUser ---');
    console.log('Tentando validar o email:', email);

    const user = await this.usuariosService.findByEmail(email);

    // Vamos ver o que o banco retornou
    console.log('Usuário encontrado no banco:', user);

    if (!user) {
      console.log('Resultado: Falha (Usuário não encontrado)');
      console.log('---------------------------------');
      return null;
    }

    // Se o usuário foi encontrado, vamos comparar as senhas
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
}
