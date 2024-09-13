// src/types.ts

export interface LoggedUser {
  user: User;
  token: string;
}

export interface User {
  id: string; // Identificador único do usuário (UUID)
  username: string; // Nome de usuário
  email: string; // Email do usuário
  password: string; // Senha do usuário
  class?: string; // Classe ou tipo do usuário (opcional)
  ringsWorn?: string[]; // Array de IDs de anéis que o usuário está usando (opcional)
}
