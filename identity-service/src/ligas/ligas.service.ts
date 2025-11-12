// src/ligas/ligas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLigasDto } from './dto/create-ligas.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Liga } from './entities/liga.entity';
import { Repository } from 'typeorm';
import { Professor } from '../usuarios/entities/professor.entity';
import { Aluno } from '../usuarios/entities/aluno.entity'; // 1. IMPORTAR

@Injectable()
export class LigasService {
  constructor(
    @InjectRepository(Liga)
    private readonly ligaRepository: Repository<Liga>,

    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,

    @InjectRepository(Aluno) // 2. INJETAR O REPOSITÓRIO DO ALUNO
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
      relations: ['lider', 'alunos'], // Agora também inclui os alunos
    });
  }

  // --- MÉTODO NOVO ADICIONADO ---
  /**
   * Adiciona um aluno a uma liga.
   * @param idLiga O ID da liga que o aluno quer entrar.
   * @param idAluno O ID do aluno (vindo do token).
   */
  async adicionarAluno(idLiga: number, idAluno: number): Promise<Liga> {
    // 1. Encontra a liga, garantindo que ela também carregue a lista de alunos
    const liga = await this.ligaRepository.findOne({
      where: { id_liga: idLiga },
      relations: ['alunos'],
    });
    if (!liga) {
      throw new NotFoundException(`Liga com ID #${idLiga} não encontrada.`);
    }

    // 2. Encontra o aluno
    const aluno = await this.alunoRepository.findOneBy({
      id_usuario: idAluno,
    });
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado.');
    }

    // 3. Adiciona o aluno à lista (apenas se ele já não estiver)
    const alunoJaNaLiga = liga.alunos.some(
      (membro) => membro.id_usuario === aluno.id_usuario,
    );
    if (!alunoJaNaLiga) {
      liga.alunos.push(aluno);
      // 4. Salva a liga. O TypeORM magicamente atualizará a tabela de junção 'liga_alunos'.
      return this.ligaRepository.save(liga);
    }

    return liga; // Retorna a liga (com o aluno já nela)
  }
}
