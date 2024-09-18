## Tecnologias utilizadas
- Nodejs
- Typescript
- Express
- TypeORM
- Zod
- Postgres
- MongoDB
- Nodemailer
- JWT
- Crypto
- CORS
- Docker

## Versão do Node
v20.17.0 (npm v10.8.2)

## Como rodar o projeto

Clone o repositório:
```bash
git clone https://github.com/azevedomarcelo/Junior-Challenge.git
cd Junior-Challenge/backend
```
Instale as dependências:
```bash
npm install
# ou
yarn install
```
Rode o comando do docker para o funcionamento do banco de dados
```bash
docker compose up -d
```

Para iniciar o servidor de desenvolvimento, use:
```bash
npm run dev
# ou
yarn dev
```

Acesse o aplicativo no seu navegador em http://localhost:3333

## Rotas da API

### 1. Autenticação

#### POST /login
- **Descrição**: Faz login de um usuário através de um link mágico enviado no email.
- **Request Body**:
    ```json
    {
        "email": "user@example.com",
    }
    ```
- **Response**:
    - **200 OK**:
        ```json
        {}
        ```
---

### 2. Usuários

#### GET /authenticate
- **Descrição**: Rota para validação de email.
- **Parâmetros de Consulta**:
    - `token`: token para validar o email do usuário.
- **Response**:
    - **200 OK**:
        ```json
        {}
        ```
    - **400 Bad Request**:
      ```json
      {
      	"message": "Invalid or expired token"
      }
      ```
---

### 3. Aneis

#### GET /
- **Descrição**: Retorna uma lista de aneis.
- **Response**:
    - **200 OK**:
        ```json
        [
        	{
        		"id": "8e88379a-55a2-44c2-91d0-ec25f4a1f7a9",
        		"name": "Anel de fogo",
        		"power": "Seu portador ganha fogo",
        		"carrier": "Gandalf",
        		"forged": "Elfos",
        		"image": "https://cinepop.com.br/wp-content/uploads/2022/10/narya-aneis-de-poder.jpeg",
        		"createdAt": "2024-09-16T14:27:18.498Z"
        	},
        	{
        		"id": "59896df7-d45c-4d70-9ea5-ecb83318919f",
        		"name": "Anel de fogo",
        		"power": "Seu portador ganha fogo",
        		"carrier": "Gandalf",
        		"forged": "Elfos",
        		"image": "https://cinepop.com.br/wp-content/uploads/2022/10/narya-aneis-de-poder.jpeg",
        		"createdAt": "2024-09-16T14:28:36.584Z"
        	}
        ]
        ```
#### GET /{id}
- **Descrição**: Retorna um anel.
- **Parâmetros de Consulta**:
    - `id`: id do anel.
- **Response**:
    - **200 OK**:
        ```json
        	{
        		"id": "8e88379a-55a2-44c2-91d0-ec25f4a1f7a9",
        		"name": "Anel de fogo",
        		"power": "Seu portador ganha fogo",
        		"carrier": "Gandalf",
        		"forged": "Elfos",
        		"image": "https://cinepop.com.br/wp-content/uploads/2022/10/narya-aneis-de-poder.jpeg",
        		"createdAt": "2024-09-16T14:27:18.498Z"
        	}
        ```



#### POST /ring
- **Descrição**: Cria um novo anel.
- **Request Body**:
    ```json
     {
    	"name": "Anel de fogo",
    	"power": "Seu portador ganha fogo",
    	"carrier": "Gandalf",
    	"forged": "Homens",
    	"image": "https://cinepop.com.br/wp-content/uploads/2022/10/narya-aneis-de-poder.jpeg"
    }
    ```
- **Response**:
    - **201 Created**:
        ```json
        {
        	"id": "e1dec553-d894-4cf9-8494-40bc48004586",
        	"name": "Anel de fogo",
        	"power": "Seu portador ganha fogo",
        	"carrier": "Gandalf",
        	"forged": "Homens",
        	"image": "https://cinepop.com.br/wp-content/uploads/2022/10/narya-aneis-de-poder.jpeg",
        	"createdAt": "2024-09-18T13:28:39.077Z"
        }
        ```

#### PUT /ring/{id}
- **Descrição**: Atualiza um anel.
- **Parâmetros de Consulta**:
    - `id`: id do anel.
- **Request Body**:
    ```json
     {
    	"name": "Anel de fogo",
    	"power": "Seu portador ganha resistência ao fogo",
    	"carrier": "Gandalf",
    	"forged": "Anões",
    	"image": "https://cinepop.com.br/wp-content/uploads/2022/10/narya-aneis-de-poder.jpeg"
    }
    ```
- **Response**:
    - **200 Ok**:
        ```json
        {
        	"id": "e1dec553-d894-4cf9-8494-40bc48004586",
        	"name": "Anel de fogo",
        	"power": "Seu portador ganha resistência ao fogo",
        	"carrier": "Gandalf",
        	"forged": "Anões",
        	"image": "https://cinepop.com.br/wp-content/uploads/2022/10/narya-aneis-de-poder.jpeg",
        	"createdAt": "2024-09-18T13:28:39.077Z"
        }
        ```

#### DELETE /ring/{id}
- **Descrição**: Deleta um anel.
- **Parâmetros de Consulta**:
    - `id`: id do anel.
- **Response**:
    - **200 Ok**:
        ```json
        {
        	"message": "Deletado com sucesso!"
        }
        ```


---



