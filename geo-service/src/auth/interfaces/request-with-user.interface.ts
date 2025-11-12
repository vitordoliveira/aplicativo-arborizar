// src/auth/interfaces/request-with-user.interface.ts

import { Request } from 'express';
// Não precisamos mais do Role enum aqui

export interface RequestWithUser extends Request {
  user: {
    id_usuario: number;
    email: string;
    tipo: string; // O tipo é uma 'string', não um 'Role'.
  };
}
