# Rings API

Este projeto é uma API para gerenciar anéis no universo da Terra Média. Ele foi desenvolvido utilizando Express.js como framework de backend e MongoDB como banco de dados, junto com Mongoose para modelagem dos dados.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript para construir o servidor.
- **Express.js**: Framework minimalista para Node.js utilizado para gerenciar as rotas e middlewares.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados.
- **Mongoose**: Biblioteca para modelagem de dados em MongoDB.
- **Cors**: Middleware para permitir que outros domínios acessem a API.
- **Dotenv**: Para gerenciar variáveis de ambiente.
- **JavaScript/TypeScript**: Linguagem utilizada no desenvolvimento.

## Requisitos

- Node.js instalado (v14 ou superior).
- MongoDB Atlas configurado (ou uma instância local de MongoDB).
- Conta no MongoDB Atlas (opcional, se usar instância remota).

## Configuração do Projeto

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as dependências**

   Utilize o `npm` ou `yarn` para instalar todas as dependências:

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

3. **Crie um arquivo `.env`**

   No diretório raiz, crie um arquivo `.env` com o seguinte conteúdo:

   ```bash
   PORT=5000
   MONGODB_URI=mongodb+srv://<seu-usuario>:<sua-senha>@cluster0.mongodb.net/rings?retryWrites=true&w=majority
   ```

   obs:  já deixei no projeto a MONGODB_URI, por se tratar de um projeto de challeger.

4. **Inicie o servidor**

   Utilize o comando para iniciar o servidor:

   ```bash
   npm run dev
   ```

   ou

   ```bash
   yarn dev
   ```

5. **Acesse a API**

   O servidor será iniciado na porta especificada no arquivo `.env` ou na porta `5000` por padrão. Você pode acessar as rotas da API no endereço `http://localhost:5000/api/rings`.

## Rotas da API

### GET `/api/rings`

- Retorna todos os anéis cadastrados no banco de dados.

### POST `/api/rings`

- Cria um novo anel.
- O corpo da requisição deve conter os seguintes campos:
  ```json
  {
    "name": "Nome do Anel",
    "power": "poder",
    "holder": "Proprietário",
    "forgedBy": "Forjado por",
    "image": "Imagem do anel"
  }
  ```

### PUT `/api/rings/:id`

- Atualiza as informações de um anel existente com base no ID.
- - O corpo da requisição deve conter os seguintes campos:
  ```json
  {
    "name": "Nome do Anel",
    "power": "poder",
    "holder": "Proprietário",
    "forgedBy": "Forjado por",
    "image": "Imagem do anel"
  }
  ```

### DELETE `/api/rings/:id`

- Remove um anel do banco de dados com base no ID.

## Contribuições

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver alguma sugestão, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

