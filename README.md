# Anéis do poder
Este projeto é uma API para gerenciar portadores de anéis (bearers) e anéis mágicos (rings), além de associá-los através de registros históricos de portadores de anéis (ring bearers).

## Requisitos

- Node.js
- React.js
- TypeScript

## Instalação

1. Clone o repositório

Instale as dependências:

```bash
Copiar código
npm install
Inicie o servidor de desenvolvimento:

```bash
Copiar código
npm run dev
O servidor será iniciado em http://localhost:3333.

Rotas da API
Bearers (Portadores)
Listar todos os portadores

GET: /bearers
URL: http://localhost:3333/bearers
Criar um portador

POST: /bearers
URL: http://localhost:3333/bearers
Exemplo de Body:
json
Copiar código
{
  "name": "Aragorn",
  "species": "humano"
}
Atualizar um portador

PUT: /bearers/:id
URL: http://localhost:3333/bearers/:id
Exemplo de Body:
json
Copiar código
{
  "name": "Raul",
  "species": "mago"
}
Deletar um portador

DELETE: /bearers/:id
URL: http://localhost:3333/bearers/:id
Rings (Anéis)
Listar todos os anéis

GET: /rings
URL: http://localhost:3333/rings
Criar um anel

POST: /rings
URL: http://localhost:3333/rings
Exemplo de Body:
json
Copiar código
{
  "name": "Surf",
  "power": "super força",
  "forgedBy": "anões",
  "imageUrl": "http://example.com/hiren.png",
  "bearerId": 6,
  "startDate": "2002-02-02"
}
Atualizar um anel

PUT: /rings/:id
URL: http://localhost:3333/rings/:id
Exemplo de Body:
json
Copiar código
{
  "name": "Vilya",
  "power": "Anel do ar, cura e proteção pura",
  "imageUrl": "http://example.com/hiren.png",
  "forgedBy": "elfos"
}
Deletar um anel

DELETE: /rings/:id
URL: http://localhost:3333/rings/:id
Ring Bearers (Portadores de Anéis)
Criar um portador de anel

POST: /ring-bearers
URL: http://localhost:3333/ring-bearers
Exemplo de Body:
json
Copiar código
{
  "ringId": 18,
  "bearerId": 6,
  "startDate": "2008-02-10",
  "endDate": "2008-02-12"
}
Listar todos os portadores de anéis

GET: /ring-bearers
URL: http://localhost:3333/ring-bearers
Definir data de término para um portador de anel

PATCH: /ring-bearers/set-end-date
URL: http://localhost:3333/ring-bearers/set-end-date
Exemplo de Body:
json
Copiar código
{
  "ringId": 3,
  "bearerId": 4,
  "endDate": "2024-09-14T09:00:00Z"
}
Atualizar informações de um portador de anel

PUT: /ring-bearers
URL: http://localhost:3333/ring-bearers
Exemplo de Body:
json
Copiar código
{
  "ringId": 9,
  "bearerId": 7,
  "data": {
    "startDate": "2018-02-09",
    "endDate": ""
  }
}
Deletar um portador de anel

DELETE: /ring-bearers
URL: http://localhost:3333/ring-bearers
Exemplo de Body:
json
Copiar código
{
  "ringId": 3,
  "bearerId": 4
}
Tecnologias Utilizadas
Node.js
TypeScript
Vitest (para testes)
In-memory repositories (Repositórios em memória)
Testes
Para rodar os testes do projeto, use o comando:

bash
Copiar código
npm run test
Contribuição
Faça um fork do projeto
Crie uma nova branch: git checkout -b minha-feature
Faça suas alterações e commite: git commit -m 'Minha nova feature'
Envie para o repositório remoto: git push origin minha-feature
Abra um Pull Request
