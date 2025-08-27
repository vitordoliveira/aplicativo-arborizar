// src/usuarios/usuarios.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // A mágica acontece aqui: o repositório sabe criar a entidade correta (Aluno/Professor)
    // baseado no campo 'tipo' que vem no DTO.
    const novoUsuario = this.usuarioRepository.create(createUsuarioDto);
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

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
