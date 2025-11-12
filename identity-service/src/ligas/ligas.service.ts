// src/ligas/ligas.service.ts

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateLigasDto } from './dto/create-ligas.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Liga } from './entities/liga.entity';
import { Repository } from 'typeorm';
import { Professor } from '../usuarios/entities/professor.entity';
import { Aluno } from '../usuarios/entities/aluno.entity';
import { UpdateLigasDto } from './dto/update-ligas.dto'; // 1. IMPORTAR

@Injectable()
export class LigasService {
  constructor(
    @InjectRepository(Liga)
    private readonly ligaRepository: Repository<Liga>,

    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,

    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
  ) {}

  async create(
    createLigasDto: CreateLigasDto,
    idProfessorLider: number,
  ): Promise<Liga> {
    const professor = await this.professorRepository.findOneBy({
      id_usuario: idProfessorLider,
    });
    if (!professor) {
      throw new NotFoundException('Professor não encontrado.');
    }
    const novaLiga = this.ligaRepository.create({
      ...createLigasDto,
      lider: professor,
    });
    return this.ligaRepository.save(novaLiga);
  }

  findAll() {
    return this.ligaRepository.find({
      relations: ['lider', 'alunos'],
    });
  }

  async adicionarAluno(idLiga: number, idAluno: number): Promise<Liga> {
    const liga = await this.ligaRepository.findOne({
      where: { id_liga: idLiga },
      relations: ['alunos'],
    });
    if (!liga) {
      throw new NotFoundException(`Liga com ID #${idLiga} não encontrada.`);
    }
    const aluno = await this.alunoRepository.findOneBy({
      id_usuario: idAluno,
    });
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado.');
    }
    const alunoJaNaLiga = liga.alunos.some(
      (membro) => membro.id_usuario === aluno.id_usuario,
    );
    if (!alunoJaNaLiga) {
      liga.alunos.push(aluno);
      return this.ligaRepository.save(liga);
    }
    return liga;
  }

  // --- MÉTODOS NOVOS ADICIONADOS ---

  async update(
    idLiga: number,
    updateLigasDto: UpdateLigasDto,
    idUsuarioLogado: number,
  ): Promise<Liga> {
    // 1. Busca a liga e quem é o líder
    const liga = await this.ligaRepository.findOne({
      where: { id_liga: idLiga },
      relations: ['lider'],
    });
    if (!liga) {
      throw new NotFoundException(`Liga com ID #${idLiga} não encontrada.`);
    }

    // 2. REGRA DE NEGÓCIO: Só o professor que criou a liga pode editá-la
    if (liga.lider.id_usuario !== idUsuarioLogado) {
      throw new UnauthorizedException(
        'Você não tem permissão para editar esta liga.',
      );
    }

    // 3. Aplica as mudanças e salva
    const ligaAtualizada = this.ligaRepository.merge(liga, updateLigasDto);
    return this.ligaRepository.save(ligaAtualizada);
  }

  async remove(idLiga: number, idUsuarioLogado: number): Promise<void> {
    // 1. Busca a liga e quem é o líder
    const liga = await this.ligaRepository.findOne({
      where: { id_liga: idLiga },
      relations: ['lider'],
    });
    if (!liga) {
      throw new NotFoundException(`Liga com ID #${idLiga} não encontrada.`);
    }

    // 2. REGRA DE NEGÓCIO: Só o professor que criou a liga pode apagá-la
    if (liga.lider.id_usuario !== idUsuarioLogado) {
      throw new UnauthorizedException(
        'Você não tem permissão para apagar esta liga.',
      );
    }

    // 3. Apaga a liga
    await this.ligaRepository.remove(liga);
  }
}
