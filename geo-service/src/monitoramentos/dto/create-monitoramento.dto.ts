// src/monitoramentos/dto/create-monitoramento.dto.ts

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateMonitoramentoDto {
  @IsUrl({}, { message: 'A URL da foto é inválida.' })
  @IsNotEmpty({ message: 'A URL da foto não pode estar vazia.' })
  foto_url: string;

  @IsString()
  @IsOptional() // As observações são opcionais
  observacoes?: string;

  // Precisamos saber a qual plantio este monitoramento pertence.
  @IsNumber({}, { message: 'O id_plantio deve ser um número.' })
  @IsNotEmpty({ message: 'O id_plantio não pode estar vazio.' })
  id_plantio: number;
}
