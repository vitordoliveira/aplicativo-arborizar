import { Request } from 'express';
import { JwtPayload } from '../jwt-payload.interface'; // 1. IMPORTAR

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
