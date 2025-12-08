import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { AddPontosDto } from './dto/add-pontos.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly httpService: HttpService,
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

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    if (updateUsuarioDto.password) {
      const saltRounds = 10;
      updateUsuarioDto.password = await bcrypt.hash(
        updateUsuarioDto.password,
        saltRounds,
      );
    }
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

  async getRankingGlobal(authToken: string) {
    const alunos = await this.usuarioRepository.find({
      where: { tipo: Role.Aluno },
      order: { pontos_totais: 'DESC' },
      take: 50,
    });

    const alunoIds = alunos.map((aluno) => aluno.id_usuario);
    if (alunoIds.length === 0) {
      return [];
    }

    const urlGeo = 'http://localhost:8082/plantios/stats/batch';
    const headers = { Authorization: authToken };

    let countsMap: Record<number, number> = {};
    try {
      const responseGeo = await firstValueFrom(
        this.httpService
          .post<Record<number, number>>(urlGeo, { alunoIds }, { headers })
          .pipe(
            catchError((err: AxiosError) => {
              console.error(
                'Erro ao chamar o geo-service (getRankingGlobal):',
                err.response?.data || err.message,
              );
              throw new Error(
                'Erro ao buscar contagem de plantios do geo-service',
              );
            }),
          ),
      );
      countsMap = responseGeo.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Erro desconhecido no getRankingGlobal', error);
      }
    }

    const ranking = alunos.map((aluno) => ({
      id_usuario: aluno.id_usuario,
      nome: aluno.nome,
      avatar: aluno.nome[0].toUpperCase(),
      pontos: aluno.pontos_totais,
      titulo: 'Protetor da Mata',
      arvores: countsMap[aluno.id_usuario] || 0,
    }));

    return ranking;
  }

  async getRankingPosition(idUsuario: number): Promise<number> {
    const rankingCompleto = await this.usuarioRepository.find({
      where: { tipo: Role.Aluno },
      order: { pontos_totais: 'DESC' },
      select: ['id_usuario'],
    });

    const posicao = rankingCompleto.findIndex(
      (user) => user.id_usuario === idUsuario,
    );

    if (posicao === -1) {
      return 0;
    }
    return posicao + 1;
  }
}
