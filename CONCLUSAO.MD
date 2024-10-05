# Desafio Fullstack: Os Anéis de Poder

## Visão Geral

Este projeto é uma aplicação fullstack que gerencia os Anéis de Poder do universo de J.R.R. Tolkien. Ele permite aos usuários criar, visualizar, atualizar e deletar anéis, respeitando as regras de negócio específicas para cada tipo de forjador.

## Tecnologias Utilizadas

### Backend
- NestJS com TypeScript
- PostgreSQL para banco de dados
- TypeORM como ORM
- JWT para autenticação
- Swagger para documentação da API

### Frontend
- React com TypeScript
- Vite como build tool
- Zustand para gerenciamento de estado
- React Hook Form para gerenciamento de formulários
- Zod para validação de esquemas
- Axios para requisições HTTP
- Tailwind CSS e shadcn/ui para estilização


## Funcionalidades Principais

### Backend

1. **CRUD de Anéis**
   - Criar, Ler, Atualizar e Deletar anéis
   - Validação de regras de negócio (limite de anéis por forjador)

2. **Autenticação**
   - Registro de usuários
   - Login com geração de token JWT
   - Proteção de rotas

3. **Documentação da API**
   - Swagger UI para documentação interativa

### Frontend

1. **Gerenciamento de Anéis**
   - Formulário para criação e edição de anéis
   - Visualização de anéis em formato de cards e tabela
   - Funcionalidades de edição e exclusão

2. **Autenticação de Usuários**
   - Tela de login e registro
   - Gerenciamento de sessão do usuário

3. **Dashboard**
   - Gráficos mostrando estatísticas dos anéis (por forjador e disponibilidade)

4. **Responsividade**
   - Interface adaptável para diferentes tamanhos de tela

## Como o Projeto Atende aos Requisitos do Desafio

1. **CRUD Completo**: Implementação de operações Create, Read, Update e Delete para os anéis.
2. **Regras de Negócio**: Validação do limite de anéis por forjador (Elfos: 3, Anões: 7, Homens: 9, Sauron: 1).
3. **Frontend Responsivo**: Interface adaptável com visualização em cards e tabela.
4. **Carrossel**: Implementação de um carrossel para exibição dos anéis em dispositivos móveis.
5. **Autenticação**: Sistema completo de registro e login de usuários.
6. **Typescript**: Utilizado tanto no backend quanto no frontend.
7. **Testes**: Implementação de testes unitários no backend e frontend.
8. **Documentação**: Swagger para o backend e README detalhado para o projeto como um todo.

## Funcionalidades Extras Implementadas

1. **Dashboard com Gráficos**: Visualização estatística dos anéis.
2. **Gerenciamento de Estado Avançado**: Utilização do Zustand para um gerenciamento de estado eficiente.
3. **Validação de Formulários**: Uso do Zod para validação robusta de dados.
4. **UI Moderna**: Implementação de uma interface de usuário moderna e responsiva usando Tailwind e shadcn/ui.

## Como Executar o Projeto

### Backend
1. Navegue até a pasta `backend`
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente no arquivo `.env`
4. Configure um banco de dados postgres
5. Inicie o servidor: `npm run start:dev` ou `npm run start`

### Frontend
1. Navegue até a pasta `frontend`
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`

## Testes

- Backend: `npm run test`


## Documentação Detalhada

Para informações mais detalhadas sobre a estrutura e implementação específica de cada parte do projeto, consulte:

- `backend/README.md` para documentação do backend
- `frontend/README.md` para documentação do frontend
