# Documentação do Backend - Projeto Anéis de Poder

## Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Configuração e Execução](#configuração-e-execução)
5. [Banco de Dados](#banco-de-dados)
6. [Autenticação](#autenticação)
7. [Testes](#testes)
8. [Documentação da API](#documentação-da-api)

## Visão Geral

O backend do projeto Anéis de Poder é construído com NestJS e TypeScript, oferecendo uma API robusta e escalável para gerenciar os dados dos anéis mágicos e usuários.

## Tecnologias Utilizadas

- **NestJS com TypeScript**:
  NestJS foi escolhido sobre o Express padrão devido às suas vantagens para este projeto:

  - Arquitetura modular que promove organização e manutenibilidade do código.
  - Suporte nativo ao TypeScript, oferecendo tipagem estática e melhor tooling.
  - Injeção de dependência integrada, facilitando testes e desacoplamento.
  - Decorators para criação rápida de endpoints, pipes, guards, etc.
  - Integração fácil com ORMs como TypeORM para PostgreSQL.
  - Suporte robusto para criação de microserviços e aplicações escaláveis.

- **PostgreSQL**: Banco de dados relacional escolhido para armazenamento de dados.
- **Jest**: Framework de testes para realizar testes unitários.
- **Swagger**: Utilizado para documentação automática da API.
- **JWT (JSON Web Tokens)**: Para autenticação e autorização.

## Estrutura do Projeto

BACKEND/
|-- dist/
|-- node_modules/
|-- src/
| |-- aneis/
| | |-- aneis.controller.spec.ts
| | |-- aneis.controller.ts
| | |-- aneis.module.ts
| | |-- aneis.service.spec.ts
| | |-- aneis.service.ts
| | |-- anel.entity.ts
| |-- auth/
| | |-- auth.controller.spec.ts
| | |-- auth.controller.ts
| | |-- auth.module.ts
| | |-- auth.service.ts
| | |-- authenticated-request.interface.ts
| | |-- jwt-auth.guard.ts
| | |-- jwt.strategy.ts
| |-- dto/
| | |-- anel.dto.ts
| | |-- create-user.dto.ts
| | |-- login.dto.ts
| | |-- update-user.dto.ts
| |-- filters/
| | |-- http-exception.filter.ts
| |-- users/
| | |-- user.entity.ts
| | |-- users.controller.spec.ts
| | |-- users.controller.ts
| | |-- users.module.ts
| | |-- users.service.ts
| |-- app.controller.spec.ts
| |-- app.controller.ts
| |-- app.module.ts
| |-- app.service.ts
| |-- main.ts
|-- test/
|-- .env
|-- .gitignore
|-- nest-cli.json
|-- package-lock.json
|-- package.json
|-- tsconfig.build.json
|-- tsconfig.json

## Configuração e Execução

1. Clone o repositório.
2. Instale as dependências:

npm install

3. Configure o banco de dados PostgreSQL.

4. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nome_do_banco_de_dados
JWT_SECRET=sua_chave_secreta

```

5. Execute o projeto:
   npm run start:dev

## Banco de Dados

O projeto utiliza PostgreSQL. Certifique-se de que o banco de dados está configurado e acessível com as credenciais fornecidas no arquivo `.env`.

## Autenticação

A autenticação é realizada usando JWT (JSON Web Tokens). O segredo do JWT é definido no arquivo `.env`.

Para gerar um novo JWT_SECRET, você pode usar o seguinte comando no Node.js:

```javascript
console.log(require('crypto').randomBytes(64).toString('hex'));
```

Execute este comando no terminal para gerar uma nova string segura para o JWT_SECRET.

## Testes

Os testes unitários são realizados com Jest.

Para executar os testes: npm run test

## Documentação da API

A documentação da API é gerada automaticamente usando Swagger. Após iniciar o servidor, acesse:

http://localhost:3000/api
