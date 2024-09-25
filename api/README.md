# Node.js - Mongoose - Mongodb - Express

# Como rodar

- Criar um .env na raiz da /api com:
  - MONGODB_URI
  - PORT
  - JWT_SECRET
- npm install
- npm run dev

# Teste unitario

- npm run test

# API DOC

## Anel

### Listar Anéis

Descrição: Retorna uma lista de todos os anéis.

Endpoint: GET /anel

Retorno: Anel[]

Status: 200

### Buscar Anel por ID

Descrição: Retorna um anel específico pelo ID.

Endpoint: GET /anel/:id

Retorno: Anel

Status: 200

### Criar Novo Anel

Descrição: Cria um novo anel com base nos dados fornecidos.

Endpoint: POST /anel

Body: AnelCriarDto

Retorno: Anel

Status: 201

### Atualizar Anel

Descrição: Atualiza um anel específico pelo ID com os dados fornecidos

Endpoint: PUT /anel/:id

Body: AnelAtualizarDto

Retorno: Anel

Status: 200

### Deletar Anel

Descrição: Deleta um anel específico pelo ID.

Endpoint: DELETE /anel/:id

Status: 200

## Auth

# Registrar Novo Usuário

Descrição: Cria um novo usuário com base nos dados fornecidos.

Endpoint: POST /usuario/registrar

Body: RegistrarDTO

Retorno: Usuario

Status: 201

# Entrar

Descrição: Realiza o login de um usuário e retorna um token de acesso.

Endpoint: POST /usuario/entrar

Body: EntrarDTO

Retorno: Usuario

Status: 200

# Buscar Usuário

Descrição: Retorna os detalhes do usuário autenticado.

Endpoint: GET /usuario

Retorno: Usuario

Status: 200
