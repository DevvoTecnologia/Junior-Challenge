# 🏰 API dos Anéis do Poder

## 📚 Sumário

1. [Introdução](#-introdução)
2. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
3. [Estrutura do Projeto](#-estrutura-do-projeto)
4. [Endpoints da API](#-endpoints-da-api)
5. [Modelos](#-modelos)
6. [Serviços](#-serviços)
7. [Controladores e Rotas](#-controladores-e-rotas)
8. [Middleware](#-middleware)
9. [Tratamento de Erros](#-tratamento-de-erros)
10. [Configuração do Banco de Dados](#-configuração-do-banco-de-dados)
11. [Executando o Projeto](#-executando-o-projeto)

## 🌟 Introdução

Bem-vindo à API dos Anéis do Poder! Este serviço backend gerencia informações sobre anéis do mundo de J.R.R Tolkien. Ele fornece operações CRUD para os anéis e lida automaticamente com o gerenciamento de proprietários.

## 🛠 Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- TypeORM
- PostgreSQL
- class-validator
- CORS

## 📁 Estrutura do Projeto

O projeto segue uma estrutura modular:

- `src/`
  - `config/`: Configurações de banco de dados e seed
  - `controllers/`: Manipuladores de requisições
  - `middleware/`: Funções de middleware personalizadas
  - `models/`: Definições de entidades do banco de dados
  - `routes/`: Definições de rotas da API
  - `services/`: Lógica de negócios
  - `utils/`: Funções utilitárias e classes de erro
  - `app.ts`: Configuração da aplicação Express
  - `server.ts`: Ponto de entrada do servidor

## 🛣 Endpoints da API

### Anéis

| Método | Endpoint       | Descrição                |
| ------ | -------------- | ------------------------ |
| GET    | /rings         | Recuperar todos os anéis |
| POST   | /rings         | Criar um novo anel       |
| PUT    | /rings/:ringId | Atualizar um anel        |
| DELETE | /rings/:ringId | Excluir um anel          |

## 📊 Modelos

### Anel (Ring)

Representa um anel com as seguintes propriedades:

- `id`: Identificador único (gerado automaticamente)
- `name`: Nome do anel
- `power`: Descrição do poder do anel
- `forgedBy`: Quem forjou o anel (Elfos, Anões, Humanos ou Sauron)
- `image`: URL da imagem do anel
- `currentOwner`: Relação com o modelo de Proprietário

### Proprietário (Owner)

Representa um proprietário de um anel com as seguintes propriedades:

- `id`: Identificador único (gerado automaticamente)
- `name`: Nome do proprietário
- `rings`: Relação com o modelo de Anel

## 🔧 Serviços

### RingService

Lida com a lógica de negócios para operações de anéis:

- Criação de um anel com um proprietário
- Listagem de todos os anéis
- Atualização de um anel
- Exclusão de um anel

### OwnerService

Gerencia operações relacionadas aos proprietários:

- Encontrar ou criar um proprietário
- Verificar e excluir um proprietário se ele não tiver mais anéis

## 🎮 Controladores e Rotas

O `RingController` gerencia as requisições HTTP relacionadas aos anéis, enquanto o arquivo `rings.ts` em `routes/` define as rotas da API.

## 🚦 Middleware

Middlewares são utilizados para:

- Validação de dados de anéis e proprietários com class-validator + decorators nas definições de entidades
- Verificação de requisições JSON
- Tratamento global de erros

## ❌ Tratamento de Erros

Classes de erro personalizadas são implementadas para diferentes cenários:

- `AppError`: Classe de erro base
- `NotFoundError`: Para erros 404
- `BadRequestError`: Para erros 400
- `ConflictError`: Para erros 409

Um middleware de tratamento de erros global é usado para capturar e formatar respostas de erro.

## 🗃 Configuração do Banco de Dados

O projeto usa PostgreSQL com TypeORM. A configuração do banco de dados pode ser encontrada em `src/config/database.ts`.

## 🚀 Executando o Projeto

1. Instale as dependências:

   ```
   pnpm install
   ```

2. Crie um banco de dados PostgresSQL e configure as variáveis de ambiente em um arquivo `.env` seguindo o exemplo do arquivo `.env.example`.

3. Utilize o pnpm dev para rodar o projeto com o TSX para habilitar Typescript:
   ```
   pnpm dev
   ```

---

Essa é minha API para os Anéis do Poder 🧙‍♂️, desenvolvida durante o processo seletivo da Devvo.
