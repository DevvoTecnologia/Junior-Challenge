# Projeto Anéis de Poder 💍

Bem-vindo ao projeto Anéis de Poder! Este é um sistema para gerenciar e visualizar anéis, com funcionalidades de autenticação, CRUD de usuários e anéis, e uma interface interativa com um carrossel de anéis.

## 📁 Estrutura do Projeto

O projeto é dividido em duas partes principais:

1. **Frontend**: Implementado com Vite, React, TypeScript, TailwindCSS e ShadCN UI.
2. **Backend**: Implementado com Node.js, Express, Mongoose e MongoDB.

---

## 🚀 Executando o Backend

1. Navegue até o diretório do backend:
    ```bash
    cd backend
    ```

2. Crie um arquivo `.env` na raiz do diretório `backend` e adicione as variáveis de ambiente necessárias:
    ```env
    MONGO_DB_CLUSTER=your_mongodb_connection_string
    CRYPTO_SECRET=your_secret_key
    ```

    - `MONGO_DB_CLUSTER`: Sua string de conexão com o MongoDB.
    - `CRYPTO_SECRET`: Chave secreta para criptografia de senhas.

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Inicie o servidor:
    ```bash
    npm start
    ```

5. Acesse o backend em [http://localhost:8080](http://localhost:8080). Certifique-se de que a porta esteja livre.

---

## 🚀 Executando o Frontend

1. Navegue até o diretório do frontend:
    ```bash
    cd frontend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

4. Acesse o frontend em [http://localhost:5173](http://localhost:5173).

5. Crie um registro para acessar o carrossel de anéis.

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Vite**: Ferramenta de build para projetos frontend.
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Axios**: Cliente HTTP para fazer requisições ao backend.
- **Zod**: Biblioteca para validação de esquemas.
- **ShadCN UI**: Conjunto de componentes de UI.
- **TailwindCSS**: Framework para estilização e design responsivo.

### Backend

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para construção de APIs.
- **Mongoose**: Biblioteca de modelagem de dados para MongoDB.
- **MongoDB**: Banco de dados NoSQL.

---

## 🧩 Features Criadas

- **Autenticação**: Sistema de login e registro para acessar o carrossel de anéis.
- **MongoDB**: Armazenamento de dados dos usuários e anéis.
- **Carrossel de Anéis**: Interface interativa para visualizar os anéis.
- **CRUD de Usuários**: Funcionalidades para criar, ler, atualizar e deletar usuários.
- **CRUD de Anéis**: Funcionalidades para criar, ler, atualizar e deletar anéis.

---
