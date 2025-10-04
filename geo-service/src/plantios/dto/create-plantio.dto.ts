// src/plantios/dto/create-plantio.dto.ts

// Removido o 'IsString' que não estava sendo usado.
import { IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class CreatePlantioDto {
  @IsUrl({}, { message: 'A URL da foto é inválida.' })
  @IsNotEmpty({ message: 'A URL da foto não pode estar vazia.' })
  foto_url: string;

  @IsNumber({}, { message: 'A latitude deve ser um número.' })
  @IsNotEmpty({ message: 'A latitude não pode estar vazia.' })
  latitude: number;

  @IsNumber({}, { message: 'A longitude deve ser um número.' })
  @IsNotEmpty({ message: 'A longitude não pode estar vazia.' })
  longitude: number;

  @IsNumber({}, { message: 'O id_especie deve ser um número.' })
  @IsNotEmpty({ message: 'O id_especie não pode estar vazio.' })
  id_especie: number;
}
