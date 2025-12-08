import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id_usuario: number;
    email: string;
    tipo: string;
  };
}
