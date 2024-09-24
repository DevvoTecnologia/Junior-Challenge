# Backend - Os Anéis de Poder

1. Instale as dependências:
   ```bash
   npm install

2. Configure as variáveis de ambiente: Crie um arquivo **.env** na raiz do projeto com base no arquivo _**.env.example.**_


3. Banco de dados: Verifique se o **PostgreSQL** está rodando e com as credenciais configuradas corretamente no arquivo .env.


4. Gere o Prisma Client:
    ```bash
    npx prisma generate

5. Rodar as migrações do banco de dados:
    ```bash
    npx prisma migrate dev

6. Inicie o servidor:
    ```bash
    npm run dev

O servidor será iniciado em http://localhost:3333.

## Rotas

### Autenticação

- **POST /auth/login**
    - Descrição: Realiza login e retorna o token JWT.
    - Exemplo de requisição:
      ```json
      {
        "email": "example@email.com",
        "password": "password123"
      }
      ```

### Usuários

- **POST /signup**
    - Descrição: Cria um novo usuário.
    - Exemplo de requisição:
      ```json
      {
        "name": "John Doe",
        "email": "example@email.com",
        "password": "password123"
      }
      ```

- **GET /auth/login**
    - Descrição: Forma de como o usuario faz o login.
    - Exemplo de requisição:
      ```json
      {
      "name": "John Doe",
      "email": "example@email.com",
      "password": "password123"
      }
      ```
    - **Middleware**: Tem autenticação via token JWT.

### Anéis

- **POST /anel**
    - Descrição: Cria um novo anel.
    - **Middleware**: Requer autenticação via token JWT.
    - Exemplo de requisição:
      ```json
      {
        "nome": "Anel da Escuridão",
        "poder": "Controle sobre as sombras e invisibilidade",
        "portador": "Umbra",
        "forjadoPor": "Sauron",
        "imagem": "https://example.com/aneldaescuridao.png",
        "userId": " " => userId do usuariologado.
      }
      ```

- **GET /anel**
    - Descrição: Lista todos os anéis cadastrados.
    - **Middleware**: Requer autenticação via token JWT.
    - Exemplo de resposta:
        ```json
        {
          "message": "Lista de anéis recuperada com sucesso",
          "data": [
            {
              "id": "4bff0539-601d-4eaa-ac3d-c265c9e60867",
              "nome": "Anel da Luz Radiante",
              "poder": "Emissão de luz intensa e cura de ferimentos",
              "portador": "Aurora",
              "forjadoPor": "Anões",
              "imagem": "https://example.com/aneldaluzradiante.png",
              "userId": " " => userId do usuariologado.
              "HistoricoPortador": []
            },
            {
              "id": "9b2c9d02-c626-4eb2-82c7-2dc0df29adc3",
              "nome": "Anel da Mente Sábia",
              "poder": "Aumento da inteligência e controle mental",
              "portador": "Edigar",
              "forjadoPor": "Homens",
              "imagem": "https://example.com/aneldamente.png",
              "userId": " " => userId do usuariologado.
              "HistoricoPortador": [
                {
                  "id": "934c4759-6e0d-4bd5-a5c8-abaf555e2eb1",
                  "portador": "Edigar",
                  "data": "2024-09-14T08:47:28.329Z",
                  "anelId": "9b2c9d02-c626-4eb2-82c7-2dc0df29adc3"
                }
              ]
            },
            {
              "id": "6ef531d5-42ab-4acd-a551-cb316e3affd1",
              "nome": "Anel da Visão Perfeita",
              "poder": "Visão aprimorada e percepção aumentada",
              "portador": "Zekrom",
              "forjadoPor": "Homens",
              "imagem": "https://example.com/aneldavisao.png",
              "userId": " " => userId do usuariologado.
              "HistoricoPortador": [
                {
                  "id": "00cf99f2-0a45-486b-a0bf-5a934733728f",
                  "portador": "Optis",
                  "data": "2024-09-14T08:56:46.766Z",
                  "anelId": "6ef531d5-42ab-4acd-a551-cb316e3affd1"
                },
                {
                  "id": "fe3df56f-d4c8-4717-8390-c3e0549072de",
                  "portador": "Zekrom",
                  "data": "2024-09-14T08:56:58.960Z",
                  "anelId": "6ef531d5-42ab-4acd-a551-cb316e3affd1"
                }
              ]
            },
            {
              "id": "aaf1a6fb-281e-4b09-9ad6-8e1a9ccdc785",
              "nome": "Anel da Visão Perfeita",
              "poder": "Visão aprimorada e percepção aumentada",
              "portador": "Optis",
              "forjadoPor": "Homens",
              "imagem": "https://example.com/aneldavisao.png",
              "userId": " " => userId do usuariologado.
              "HistoricoPortador": [
                {
                  "id": "71f1abba-3f2a-4ba4-9708-922312457833",
                  "portador": "Smairs",
                  "data": "2024-09-14T08:48:04.905Z",
                  "anelId": "aaf1a6fb-281e-4b09-9ad6-8e1a9ccdc785"
                },
                {
                  "id": "9c9f305b-1633-4792-b979-7e4c0bd3d953",
                  "portador": "Optis",
                  "data": "2024-09-14T16:51:57.086Z",
                  "anelId": "aaf1a6fb-281e-4b09-9ad6-8e1a9ccdc785"
                }
              ]
            }
          ]
        }
        ```

- **PUT /anel/:id**
    - Descrição: Atualiza os dados de um anel existente pelo ID.
    - **Middleware**: Requer autenticação via token JWT.
    - Exemplo de requisição:
        ```json
        {
          "nome": "#######",
          "poder": "#######",
          "portador": "#######",
          "forjadoPor": "Sauron",
          "imagem": "#######",
        }
        ```
    - Exemplo de resposta:
      ```json
      {
        "message": "Anel atualizado com sucesso",
        "data": {
        "id": "5d2250b0-a24d-4da1-b956-ab468228e05d",
        "nome": "Inacio",
        "poder": "sssaaaa22ss com plantas e animais",
        "portador": "Dina",
        "forjadoPor": "Anões",
        "imagem": "https://example.com/coracaodafloresta.png",
        "userId": " " => userId do usuariologado.
      }
      ```  

- **DELETE /anel/:id**
    - Descrição: Remove um anel pelo ID.
    - **Middleware**: Requer autenticação via token JWT.
    - Exemplo de Resposta:
      ```json
      {
      "message": "Anel deletado com sucesso"
      }
      ```
