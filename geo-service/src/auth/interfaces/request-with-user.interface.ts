import { Request } from 'express';
import { JwtPayload } from '../jwt-payload.interface'; // SEM .ts

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
