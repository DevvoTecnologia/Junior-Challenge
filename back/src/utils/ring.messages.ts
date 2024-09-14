export const MESSAGES = {
  // Mensagens de erro
  INVALID_DATA: {
    code: "INVALID_DATA",
    description: "Os dados fornecidos no corpo da requisição são inválidos"
  },
  ANEL_NOT_FOUND: {
    code: "ANEL_NOT_FOUND",
    description: "O anel com o ID fornecido não foi encontrado"
  },
  ANEL_EXCEEDED_LIMIT: {
    code: "LIMIT_EXCEEDED",
    description: "A quantidade máxima de anéis desse forjador foi atingida"
  },
  CREATION_ERROR: {
    code: "CREATION_ERROR",
    description: "Erro ao criar anel"
  },
  LIST_ERROR: {
    code: "LIST_ERROR",
    description: "Erro ao listar anéis"
  },
  UPDATE_ERROR: {
    code: "UPDATE_ERROR",
    description: "Erro ao atualizar anel"
  },
  DELETE_ERROR: {
    code: "DELETE_ERROR",
    description: "Erro ao deletar anel"
  },
  // Mensagens de sucesso
  USER_CREATED: {
    message: "Usuario criado com sucesso!"
  },
  ANEL_CREATED: {
    message: "Anel criado com sucesso"
  },
  ANEL_UPDATED: {
    message: "Anel atualizado com sucesso"
  },
  ANEL_DELETED: {
    message: "Anel deletado com sucesso"
  },
  ANEIS_LISTED: {
    message: "Lista de anéis recuperada com sucesso"
  }
};
