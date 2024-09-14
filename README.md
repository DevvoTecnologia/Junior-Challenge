
# Gerenciamento de Anéis - Teste Técnico Devvo

## Descrição do Projeto

O **Gerenciamento de Anéis** é uma aplicação web desenvolvida como parte do teste técnico para a empresa **Devvo**. O objetivo é gerenciar anéis mágicos com funcionalidades de **CRUD** (Create, Read, Update, Delete), além de autenticação de usuários. O backend foi implementado em **Node.js com TypeScript** e o frontend em **React**, utilizando **MySQL** para o armazenamento de dados.

## Funcionalidades

- **Cadastro de Anéis:** Permite que o usuário adicione novos anéis ao sistema.
- **Edição de Anéis:** Permite que o usuário edite as informações de anéis existentes.
- **Deleção de Anéis:** O usuário pode remover anéis do sistema.
- **Listagem de Anéis:** Exibe os anéis em um carrossel, com informações detalhadas.
- **Autenticação de Usuários:** Sistema de login e cadastro de usuários, utilizando **JWT** para autenticação.

## Requisitos Técnicos

- **Docker** e **Docker Compose** para rodar o banco de dados.
- **Node.js** com **TypeScript** para o backend.
- **React** para o frontend.
- **MySQL** para o armazenamento de dados.

## Configuração do Projeto

### 1. Configuração do Banco de Dados

Suba o banco de dados MySQL utilizando o Docker. Navegue até a pasta `backend` e execute o seguinte comando:

```bash
docker-compose up -d
```

Isso criará e inicializará o container do MySQL.

### 2. Configuração do Backend

Instale as dependências do backend e rode o servidor:

```bash
cd backend
npm install
npm run dev
```

O backend estará disponível em `http://localhost:3001`.

### 3. Configuração do Frontend

Em uma nova aba do terminal, navegue até a pasta `frontend`, instale as dependências e inicie o servidor do frontend:

```bash
cd ../frontend
npm install
npm start
```

O frontend estará disponível em `http://localhost:3000`.

### 4. Testando a Aplicação

1. Acesse `http://localhost:3000` no navegador.
2. Faça login ou cadastre-se.
3. Utilize as funcionalidades de criar, editar, deletar e visualizar anéis.

## Estrutura do Projeto

O projeto segue o padrão de arquitetura **MSC** (Model-Service-Controller) e está organizado da seguinte forma:

```
/
├── backend/              # Código-fonte do backend (Node.js, TypeScript)
│   ├── src/              # Contém os arquivos principais do backend
│   │   ├── controllers/  # Controladores responsáveis por receber as requisições
│   │   ├── models/       # Modelos que representam as entidades e o banco de dados
│   │   ├── services/     # Lógica de negócio aplicada entre o Controller e o Model
│   │   └── routes/       # Rotas que mapeiam os endpoints da API
│   ├── .env              # Arquivo de configuração das variáveis de ambiente
│   └── docker-compose.yml  # Arquivo de configuração para o banco de dados MySQL
├── frontend/             # Código-fonte do frontend (React, TypeScript)
│   ├── src/              # Código principal do frontend
│   └── public/           # Arquivos estáticos e index.html
└── README.md             # Documentação do projeto
```

## Rodando Testes no Backend

Para rodar os testes no backend, use o comando abaixo:

1. Navegue até o diretório do backend:

```bash
cd backend
```

2. Rode os testes com o comando:

```bash
npm test
```

Os testes utilizam **Jest** e cobrem as funcionalidades principais do projeto, incluindo a criação, listagem, atualização e exclusão de anéis.

## Conclusão

Esse projeto foi estruturado para facilitar a execução, utilizando **Docker** para o banco de dados e uma instalação simples de dependências para o frontend e backend. Com as instruções acima, você poderá rodar a aplicação de maneira rápida e eficiente.
