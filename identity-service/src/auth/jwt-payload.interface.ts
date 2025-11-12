// src/auth/jwt-payload.interface.ts

// Mudamos de 'interface' para 'class' para resolver o erro TS(1272)
// em assinaturas de decorators, como no LigasController.
export class JwtPayload {
  sub: number;
  email: string;
  tipo: string;
}
