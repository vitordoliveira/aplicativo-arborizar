import { Controller, Injectable, NotFoundException } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PlantioRegistradoPayload } from './payloads/plantio-registrado.payload';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { MissoesService } from '../missoes/missoes.service';
import { MissoesConcluidasService } from '../missoes-concluidas/missoes-concluidas.service';
import { Missao } from '../missoes/entities/missao.entity';

@Injectable()
@Controller()
export class EventsController {
  private readonly ID_MISSAO_PRIMEIRO_PLANTIO = 1;

  constructor(
    private readonly httpService: HttpService,
    private readonly missoesService: MissoesService,
    private readonly missoesConcluidasService: MissoesConcluidasService,
  ) {}

  @EventPattern('plantio_registrado')
  async handlePlantioRegistrado(@Payload() data: PlantioRegistradoPayload) {
    console.log('--- Evento Recebido: plantio_registrado ---');
    const idAluno = data.plantio.id_aluno;
    const authToken = data.authToken;

    if (!authToken) {
      console.error('Erro: Evento recebido sem authToken. Abortando.');
      return;
    }

    const jaCompletou = await this.missoesConcluidasService.jaCompletou(
      idAluno,
      this.ID_MISSAO_PRIMEIRO_PLANTIO,
    );

    if (jaCompletou) {
      console.log(`Aluno ${idAluno} já completou a Missão 1.`);
      return;
    }

    let missao: Missao;
    try {
      missao = await this.missoesService.findOne(
        this.ID_MISSAO_PRIMEIRO_PLANTIO,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error(
          `ERRO: A Missão #${this.ID_MISSAO_PRIMEIRO_PLANTIO} não existe!`,
        );
        return;
      }
      throw error;
    }

    const recompensa = {
      pontos: missao.pontos_recompensa,
      xp: missao.xp_recompensa,
    };

    const url = `http://localhost:8081/usuarios/${idAluno}/pontos`;
    console.log(`Enviando ${recompensa.pontos} pontos para ${url}`);

    try {
      await firstValueFrom(
        this.httpService
          .patch(url, recompensa, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
          .pipe(
            catchError((error: AxiosError) => {
              console.error('Erro ao chamar identity:', error.response?.data);
              throw new Error('Erro de comunicação com identity-service.');
            }),
          ),
      );

      await this.missoesConcluidasService.registrarConclusao(idAluno, missao);
      console.log(`Missão #${missao.id_missao} registrada com sucesso!`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Um erro desconhecido foi capturado', error);
      }
    }
  }
}
