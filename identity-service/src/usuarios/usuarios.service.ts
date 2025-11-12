// src/usuarios/usuarios.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { AddPontosDto } from './dto/add-pontos.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';
import { UpdateUsuarioDto } from './dto/update-usuario.dto'; // 1. IMPORTAR

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

  // --- MÉTODO NOVO ADICIONADO ---
  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    // Se uma nova senha foi enviada, criptografa ela
    if (updateUsuarioDto.password) {
      const saltRounds = 10;
      updateUsuarioDto.password = await bcrypt.hash(
        updateUsuarioDto.password,
        saltRounds,
      );
    }

    // Carrega o usuário e aplica as mudanças
    const usuario = await this.usuarioRepository.preload({
      id_usuario: id,
      ...updateUsuarioDto,
    });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID #${id} não encontrado.`);
    }
    return this.usuarioRepository.save(usuario);
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
