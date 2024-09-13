# API de Anéis Mágicos

Este é o backend para o projeto de gerenciamento de anéis mágicos. Ele fornece uma API RESTful para criar, ler, atualizar e deletar informações sobre anéis mágicos, além de autenticação de usuários.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web para Node.js
- **TypeScript**: Superset tipado de JavaScript
- **Sequelize**: ORM (Object-Relational Mapping) para Node.js
- **PostgreSQL**: Banco de dados relacional
- **JSON Web Token (JWT)**: Para autenticação de usuários
- **Bcrypt**: Para hash de senhas
- **Zod**: Biblioteca de validação de esquemas
- **Dotenv**: Para gerenciamento de variáveis de ambiente
- **CORS**: Middleware para habilitar CORS (Cross-Origin Resource Sharing)

## Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- npm

## Configuração

1. Clone o repositório:
    ```
    git clone https://github.com/MateusJSouza/Junior-Challenge
    ```
2. Navegue até o diretório do projeto:
    ```
    cd server
    ```

3. Instale as dependências:
    ```
    npm install
    ```

4. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:
    ```
    JWT_SECRET=sua_chave_secreta_muito_segura_aqui
    DATABASE_URL=postgres://user:password@localhost:5432/juniorchallenge
    PORT=3000
    ```

5. Configure o banco de dados:
    - Crie um banco de dados PostgreSQL
    - Atualize o arquivo `src/config/config.json` com as credenciais do seu banco de dados

6. Execute as migrações do banco de dados:
      ```
      npx sequelize-cli db:migrate
      ```

## Executando o Projeto

Para iniciar o servidor em modo de desenvolvimento:
```
npm run dev
```


O servidor estará rodando em `http://localhost:3000` (ou na porta especificada no arquivo `.env`).

## Estrutura do Projeto

- `src/`: Código fonte do projeto
  - `config/`: Configurações do Sequelize
  - `controllers/`: Controladores da aplicação
  - `middleware/`: Middlewares Express
  - `models/`: Modelos Sequelize
  - `migrations/`: Migrações do banco de dados
  - `server.ts`: Ponto de entrada da aplicação
  - `database.ts`: Configuração da conexão com o banco de dados
  - `env.ts`: Configuração das variáveis de ambiente

## Rotas da API

- POST `/register`: Registra um novo usuário
- POST `/login`: Autentica um usuário
- POST `/create-ring`: Cria um novo anel (requer autenticação)
- GET `/rings`: Lista todos os anéis (requer autenticação)
- PUT `/update-ring/:id`: Atualiza um anel específico (requer autenticação)
- DELETE `/delete-ring/:id`: Deleta um anel específico (requer autenticação)

----------------------------------------

<p align="center">
  Desenvolvido por <a href="https://github.com/MateusJSouza">Mateus Jesus</a>
</p>