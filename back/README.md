# Gerenciamento de Anéis API

Este projeto é uma API para gerenciamento de anéis, desenvolvida com Node.js e TypeScript.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento backend.
- **Express**: Framework web utilizado para criar rotas e middlewares.
- **CORS**: Middleware utilizado para habilitar o compartilhamento de recursos entre diferentes origens.
- **MariaDB**: Banco de dados relacional utilizado para persistência de dados.
- **TypeORM**: ORM utilizado para interagir com o banco de dados MariaDB.
- **Docker**: Ferramenta de contêineres para simplificar o ambiente de desenvolvimento e produção.

## Funcionalidades

- Gerenciamento de usuários (Elfos, Anões, Homens, Sauron).
- Controle da quantidade de anéis para cada tipo de usuário.
  - Elfos: 3 anéis
  - Anões: 7 anéis
  - Homens: 9 anéis
  - Sauron: 1 anel

## Instalação e Configuração

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Passos para Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/limonheiro/Junior-Challenge
   cd Junior-Challenge
    ```

4. **Inicie o servidor**

   Utilize o comando para iniciar o servidor:

   ```bash
   docker-compose up
   ```

5. **Acesse a API**

   O servidor será iniciado na porta especificada no arquivo `.env` ou na porta `3001` por padrão. Você pode acessar as rotas da API no endereço `http://localhost:3001/aneis`.

## Rotas da API

### GET `/aneis`

- Retorna todos os anéis cadastrados no banco de dados.

### POST `/aneis`

- Cria um novo anel.
- O corpo da requisição deve conter os seguintes campos:
  ```json
  {
    "name": "Nome do Anel",
    "power": "poder",
    "holder": "Proprietário",
    "forger": "Forjado por",
  }
  ```

### PUT `/aneis/:id`

- Atualiza as informações de um anel existente com base no ID.
- - O corpo da requisição deve conter os seguintes campos:
  ```json
  {
    "name": "Nome do Anel",
    "power": "poder",
    "holder": "Proprietário",
    "forger": "Forjado por",
  }
  ```


## Contribuições

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver alguma sugestão, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

