# 🛠️ Desafio Anéis do Poder - Full Stack Application

Esta é a conclusão do **Desafio Anéis do Poder**, uma aplicação Full Stack desenvolvida com **React (Vite)** no frontend, **Node.js (TypeScript)** no backend e **PostgreSQL** como banco de dados. Este projeto é encapsulado e pode ser executado localmente com **Docker Compose** ou na nuvem.

---

## 🚀 Funcionalidades

1. **CRUD de Anéis**:
   - Criação, leitura, edição e exclusão de anéis do poder.
   - Restrições específicas para criação baseadas no "forjador".
2. **Frontend**:
   - Interface moderna desenvolvida com React e Bootstrap.
   - Design responsivo e interativo.
3. **Backend**:
   - API REST desenvolvida com Node.js e TypeORM.
   - Documentação Swagger integrada.
4. **Banco de Dados**:
   - Configuração com PostgreSQL, utilizando Docker para fácil replicação.

---

## 📦 Estrutura do Projeto

```plaintext
.
├── backend/
│   ├── src/
│   │   ├── controllers/      # Controladores para lógica de negócios
│   │   ├── entities/         # Definições das entidades do banco
│   │   ├── routes/           # Rotas da API
│   │   ├── data-source.ts    # Configuração do TypeORM
│   │   └── index.ts          # Ponto de entrada do servidor
│   ├── Dockerfile            # Configuração do Docker para o backend
│   └── package.json          # Dependências e scripts do backend
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React reutilizáveis
│   │   ├── pages/            # Páginas principais da aplicação
│   │   ├── service/          # Configuração do Axios para chamadas API
│   │   └── App.tsx           # Configuração principal do React
│   ├── Dockerfile            # Configuração do Docker para o frontend
│   └── package.json          # Dependências e scripts do frontend
├── docker-compose.yml        # Orquestração de containers Docker
└── README.md                 # Documentação do projeto

```
## 🖥️ Tecnologias Utilizadas
### Frontend
- React(vite)
- Bootstrap
- Axios
### Backend
- Node.js
- TypeScript
- TypeORM
- Express
- Swagger
### Banco de Dados
- PostgreSQL
### Containerização
- Docker
- Docker-compose
## 🖥️ Pré-requisitos
1. Instalar o Docker e Docker Compose

2. Clone o Repositório
```plaintext
git clone https://github.com/Alvarezpro87/Junior-Challenge.git
cd desafio-aneis

```
## 🛠️ Como Executar o Projeto Localmente

1. Subir os containers

```plaintext
docker-compose up --build

```
2. Acessar os serviços

- Frontend: http://localhost:5173
- Backend (API): http://localhost:3000/api 
- Documentação Swagger: Documentação Swagger: http://localhost:3000/api-docs 

## 🌐 Acessando o Serviço na Nuvem

Este projeto foi hospedado utilizando **Render** (para o backend e banco de dados) e **Vercel** (para o frontend). Por se tratar de serviços gratuitos, é possível que haja certa latência ao acessar o aplicativo, principalmente no backend, devido ao "cold start" dos servidores.

⚠️ **Nota importante**: Tenha paciência ao acessar o serviço. Pode levar até **1 minuto** para o backend responder, especialmente se ele estiver em estado "adormecido".

### **Links para acessar o projeto**

- **Frontend (Interface do Usuário)**: [https://desafio-aneis-do-poder.vercel.app](https://desafio-aneis-do-poder.vercel.app)
- **Backend (API)**: [https://desafio-aneis-do-poder.onrender.com/api](https://desafio-aneis-do-poder.onrender.com/api)
- **Documentação Swagger**: [https://desafio-aneis-do-poder.onrender.com/api-docs](https://desafio-aneis-do-poder.onrender.com/api-docs)

### **Dicas ao acessar**
1. **Primeiro Acesso**: Pode haver demora no carregamento inicial devido ao serviço gratuito de backend.
2. **Recarregar**: Se a página parecer travada ou não carregar, tente atualizar após alguns segundos.
3. **Erro de Tempo de Resposta**: Se a API retornar erro inicialmente, aguarde e tente novamente após alguns segundos.

Obrigado pela paciência e por testar este projeto!
## 🧪 Testes
1. Teste manual de criação, edição e remoção de anéis.
2. Teste de conectividade entre os containers usando docker-compose.
   
