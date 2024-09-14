# RingsVault

Bem-vindo ao RingsVault! Este projeto é uma aplicação para gerenciar anéis mágicos, onde você pode visualizar, criar, atualizar e excluir registros de anéis. A aplicação utiliza Node.js, TypeScript e TypeORM para o backend e é testada com Jest, além de user Typescript, React, React Router no frontend.

## Funcionalidades

- Visualizar os anéis cadastrados.
- Cadastrar um novo anel.
- Editar um anel já criado.
- Excluir um anel permanentemente.

## Principais Tecnologias

- TypeScript
- Node.js (versão 21.7.3)
- TypeORM
- Jest
- React
- Slick Carousel
- Axios

## Rotas do Backend

Aqui estão as rotas disponíveis na API:

- `GET /rings` - buscar todos os aneis
- `GET /rings/:id` - buscar um anel especifico
- `POST /rings` - cadastrar um novo anel ao banco de dados.
- `PUT /rings/:id` - atualizar um anel previamente cadastrado.
- `DELETE /rings/:id` - excluir um anel

## Telas do Frontend
- `Inicial` - tela de abertura, nela você encontra as funcionalidades principais onde possui o carressel de aneis ja cadastrados, o botão para exclusão e edição de cada anel além do botão para criação de um novo anel
- `Criar` - tela para criação de um novo anel
- `Editar` - tela de edição onde vai carregar os dados de um anel previamente no formulario para que seja possivel alterar os dados preenchidos e salvar.


## Como Rodar o Projeto 

1. Clone o repositório:
   ```bash
   git clone https://github.com/eduardosdl/fullstack-jr-challenge-devvo.git
   ```

### Iniciando o backend

2. Instale as dependências:
   ```bash
   cd ./fullstack-jr-challenge-devvo/server
   npm install
   ```

3. Configure seu ambiente no arquivo `.env`:
   ```bash
   cp .env.exemple .env
   ```

4. Execute as migrations:
   ```bash
   npm run typeorm migration:run
   ```

5. Inicie o servidor:
   ```bash
   npm run start
   ```

- Testando o backend
    ```bash
    npm run test
    ```

### Iniciando o Frontend

7. Volte a raiz do projeto:
   ```bash
   cd ..
   ```

7. Instale as dependências:
   ```bash
   cd ./fullstack-jr-challenge-devvo/web
   npm install
   ```

8. Inicie o projeto:
   ```bash
   npm run dev
   ```

## Explicações

### Framework css
Optei por não usar nenhum framework css, o projeto foi muito bem detalhado e fazia menção a varias tecnologias e framework css não estava entre nenhuma das citações.

### Escolha da arquitetura
Minha opção foi usar a arquitetura MVC com mais algumas camadas como repository e service nas comunicações, devida a complexidade do projeto não seria necessário aplicar clean archtecture por exemplo.

### Testes
Me atentei a testar apenas a parte principal da aplicação, onde está localizada a regra de negocio, para que fosse possível entregar dentro do prazo solicitado.