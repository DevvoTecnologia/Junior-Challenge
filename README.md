# Desafio Fullstack: Os Anéis de Poder
_One Challenge to rule them all, One Challenge to find them, One Challenge to bring them all, and in the darkness bind them_

## Introdução
Este projeto é uma aplicação fullstack que permite o gerenciamento dos anéis de poder, com base na obra de J.R.R. Tolkien. Ele inclui a criação, listagem, atualização e exclusão de anéis, além de uma interface visual para interação com os dados, utilizando um carrossel.

## Tecnologias Utilizadas
Backend:
Next.js API (Node.js)
TypeScript
TypeORM (PostgreSQL)

## Frontend:
React (via Next.js)
CSS Modules
React-Slick

## Instalação e Configuração
- 1: Copie o repositório na máquina local via git clone _git@github.com:gusholz/Junior-Challenge.git_
- 2: Instale as dependências do projeto via: cd desafio/gusholz && npm i
- 3: Crie e configure as variáveis do banco de dados no arquivo `.env`
- 4: Inicie a aplicação via: `npm run dev`

# API ENDPOINTS
## GET /api
Retorna todos os anéis criados

## POST /api
Cria um novo anel, necessário body nesse formato:
### Exemplo de Requisição:
{
  "nome": "Vilya",
  "poder": "Controle sobre o ar",
  "portador": "Elrond",
  "forjadoPor": "Elfos",
  "imagem": "ring-artwork-1.jpg" // as imagens devem seguir esse formato, indo de 1 até 4
}

### Exemplo de Resposta:
{
  "id": 3,
  "nome": "Vilya",
  "poder": "Controle sobre o ar",
  "portador": "Elrond",
  "forjadoPor": "Elfos",
  "imagem": "https://imagem-do-anel.com/vilya.jpg"
}

##  PUT /api/{id}
Atualiza um anel, com base no seu id
### Exemplo de Requisição:
{
  "nome": "Vilya",
  "poder": "Controle sobre o fogo",
}

### Exemplo de Resposta:
{
  "id": 3,
  "nome": "Vilya",
  "poder": "Controle sobre o fogo",
  "portador": "Elrond",
  "forjadoPor": "Elfos",
  "imagem": "https://imagem-do-anel.com/vilya.jpg"
}

## DELETE /api/{id}
Deleta um anel existente, com base no seu id

### Exemplo de resposta:
{
  status: 200,
  msg: "Anel deletado com sucesso!"
}

# Regras de Negócio
## A API aplica as seguintes restrições:
Elfos: Máximo de 3 anéis.
Anões: Máximo de 7 anéis.
Homens: Máximo de 9 anéis.
Sauron: Apenas 1 anel.


