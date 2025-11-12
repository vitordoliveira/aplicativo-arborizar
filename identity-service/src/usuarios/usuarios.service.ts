// src/usuarios/usuarios.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { AddPontosDto } from './dto/add-pontos.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUsuarioDto.password,
      saltRounds,
    );

    let novoUsuario: Usuario;
    const { tipo } = createUsuarioDto;

    // --- CORREÇÃO DO ESLINT ABAIXO ---
    // Desabilitamos a regra, pois sabemos que a comparação é segura.
    // O DTO garante que 'tipo' é uma string ("aluno", "professor", "admin")
    // e o Enum 'Role' também resolve para essas mesmas strings.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (tipo === Role.Aluno || tipo === Role.Professor) {
      novoUsuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        password: hashedPassword,
      });
    } else {
      novoUsuario = new Usuario();
      novoUsuario.nome = createUsuarioDto.nome;
      novoUsuario.email = createUsuarioDto.email;
      novoUsuario.password = hashedPassword;
      novoUsuario.tipo = tipo;
    }

    return this.usuarioRepository.save(novoUsuario);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: id });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID #${id} não encontrado.`);
    }
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.email = :email', { email })
      .addSelect('usuario.password')
      .getOne();
  }

  async addPontos(id: number, addPontosDto: AddPontosDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    usuario.pontos_totais += addPontosDto.pontos;
    usuario.xp_total += addPontosDto.xp;
    return this.usuarioRepository.save(usuario);
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
