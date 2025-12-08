export class PlantioRegistradoPayload {
  plantio: {
    id_plantio: number;
    data_hora: string;
    foto_url: string;
    latitude: number;
    longitude: number;
    id_aluno: number;
  };
  authToken: string;
}
