// gamification-service/src/events/events.controller.ts

import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PlantioRegistradoPayload } from './payloads/plantio-registrado.payload';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Controller()
export class EventsController {
  constructor(private readonly httpService: HttpService) {}

  @EventPattern('plantio_registrado')
  async handlePlantioRegistrado(@Payload() data: PlantioRegistradoPayload) {
    console.log('--- Evento Recebido: plantio_registrado ---');
    console.log('Dados do plantio:', data.plantio);

    const recompensa = {
      pontos: 10,
      xp: 20,
    };

    const idAluno = data.plantio.id_aluno;
    const url = `http://localhost:8081/usuarios/${idAluno}/pontos`;

    console.log(`Enviando requisição PATCH para: ${url}`);

    try {
      const response = await firstValueFrom(
        this.httpService.patch(url, recompensa).pipe(
          catchError((error: AxiosError) => {
            console.error(
              'Erro ao chamar o identity-service:',
              error.response?.data,
            );
            throw new Error(
              'Ocorreu um erro ao comunicar com o serviço de identidade.',
            );
          }),
        ),
      );

      console.log('Pontos adicionados com sucesso!', response.data);
    } catch (error) {
      // --- A CORREÇÃO ESTÁ AQUI ---
      // Verificamos se o erro capturado é de fato uma instância de Error
      if (error instanceof Error) {
        // Se for, podemos acessar a propriedade .message com segurança
        console.error(error.message);
      } else {
        // Se não for, logamos o erro desconhecido de forma segura
        console.error('Um erro desconhecido foi capturado', error);
      }
    }
  }
}
