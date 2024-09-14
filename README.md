# Desafio Fullstack: Os Anéis de Poder
_One Challenge to rule them all, One Challenge to find them, One Challenge to bring them all, and in the darkness bind them_

## CRUD de Gerenciamento de Anéis

Este projeto é um sistema completo para o gerenciamento de anéis, implementado com uma API back-end usando TypeScript, Express, Sequelize e MySQL, e um frontend em React com TypeScript. O sistema permite criar, atualizar, visualizar e excluir anéis, além de gerenciar anéis com base em regras específicas para diferentes grupos.

## Índice

- [Visão Geral](#visão-geral)
- [Configuração e Execução](#configuração-e-execução)
- [Endpoints da API](#endpoints-da-api)

## Visão Geral

Este projeto é dividido em duas partes principais:

1. **Back-end**: Responsável pela lógica de negócios e interação com o banco de dados. Utiliza TypeScript, Express, Sequelize e MySQL para criar e gerenciar anéis.
2. **Front-end**: Interface de usuário desenvolvida com React e TypeScript, permitindo a visualização e manipulação de anéis. Utiliza Tailwind CSS para estilos e Axios para comunicação com a API.

## Configuração e Execução

### Back-end

1. Navegue para o diretório `backend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o ambiente:
   - Crie um arquivo `.env` na raiz do diretório `backend` e adicione as variáveis necessárias (por exemplo, URL do banco de dados).
4. Inicie o servidor:
   ```bash
   npm run start
   ```

### Front-end

1. Navegue para o diretório `frontend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o ambiente:
   - Crie um arquivo `.env` na raiz do diretório `frontend` e adicione a variável `REACT_APP_API_URL` com a URL da API.
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

## Endpoints da API

- **POST /api/aneis**: Cria um novo anel. Requer campos: `nome`, `poder`, `portador`, `forjadoPor`, `imagem`.
- **GET /api/aneis**: Lista todos os anéis.
- **PUT /api/aneis/:id**: Atualiza um anel existente. Requer campos: `nome`, `poder`, `portador`, `forjadoPor`, `imagem`.
- **DELETE /api/aneis/:id**: Remove um anel existente.

#
<p align=center>Desenvolvido por Nayla Hilana</p>