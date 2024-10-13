# Backend - Getting Started

To set up the project, follow these steps:

### 1. Create a `.env` file in the Root Folder

Start by creating a `.env` file with the same variables and values as found in the `.env.example` file.

```IMPORTANT```
Don't forget to configure the same key for the `frontend`, I'm using node crypto to encrypt the url

QUERYPARAMS_OAUTH_PRIVATE_KEY

This setting is only essential for logging in via OAuth using github. As an additional form of security.

### 2. Database Setup

Create a schema in MySQL, and set its name as the `DB_NAME` value in the `.env` file.

### 3. API Documentation

You can find the API documentation in two locations:
- Swagger UI: [http://localhost:3000/api](http://localhost:3000/api)
- Insomnia/Postman: In the root folder, there is an `Insomnia.json` file that can be imported into Insomnia or Postman for easy API testing.

---

## Project Setup

Install the project dependencies by running:

```bash
yarn install
```

---

## Compile and Run the Project

You can run the project in different modes based on your environment:

- **Development Mode** (auto-reload):
    ```bash
    yarn dev
    ```

- **Production Mode** (build first, then start):
    1. Compile the project:
        ```bash
        yarn build
        ```
    2. Run the compiled project:
        ```bash
        yarn start
        ```

Once the server is running, open [http://localhost:3000](http://localhost:3000) in your browser to see a `pong!` message, confirming that the backend is working.

---

## Running Tests

You can run various tests to ensure your application is working as expected:

For e2e testing, remember to check if the information passed exists in the database.

Make sure you have a test user

id: 1
email: admin@admin.com
password: admin
for supertest to work properly, OR add a user and modify the tests

- **Unit Tests**:
    ```bash
    yarn test
    ```

- **End-to-End (e2e) Tests**:
    ```bash
    yarn test:e2e
    ```

- **Test Coverage**:
    ```bash
    yarn test:cov
    ```

- **Run All Tests**:
    ```bash
    yarn test:all
    ```

## 🌐 Demonstração do Projeto

### Documentação da API - Produção
A documentação da API foi construída utilizando Swagger, permitindo uma visualização clara e interativa das rotas disponíveis. Acesse a documentação aqui: [Documentação da API](https://api-junior-challenge.vercel.app/api).

Na documentação, você encontrará detalhes sobre cada endpoint, exemplos de requisições e respostas, além de descrições de erros comuns.

--- 

Created by: Gabriel Logan
