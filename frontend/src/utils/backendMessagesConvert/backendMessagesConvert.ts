export const backendMessagesConvert = (translateMessage: string) => {
  const possibleMessages = [
    {
      enUs: 'Unauthorized',
      ptBr: 'Não autorizado!'
    },
    {
      enUs: 'Forger has reached the maximum number of rings',
      ptBr: 'O forjador atingiu o número maximo de aneis'
    },
    {
      enUs: 'Internal Server Error',
      ptBr: 'Erro no servidor'
    },
    {
      enUs: 'Forger not found',
      ptBr: 'Forjador não encontrado'
    },
    {
      enUs: 'The ID entered is invalid',
      ptBr: 'Objeto informado é inválido!'
    }
  ]

  const messageInPtBr = possibleMessages.find(
    (item: { enUs: string; ptBr: string }) => item.enUs === translateMessage
  )
  return messageInPtBr?.ptBr ?? translateMessage
}
