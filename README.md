# Rings of Power

Este projeto é dividido em servidor e cliente, permitindo gerenciar anéis de poder, forjadores, portadores e outros dados relacionados.

## Requisitos

- **Docker** (para uso do Docker Compose) ou **MySQL** instalado localmente, conforme configuração.
- **Node.js** e **npm**

## Instalação

### 1. Configuração do Banco de Dados

- **Opção 1**: Usando Docker Compose  
  Certifique-se de ter o Docker instalado e, na raiz do projeto, execute:

  ```bash
  docker compose up

  ```

- **Opção 2**: MySQL Local

1. Execute um servidor MySQL local.
2. Configure as variáveis de ambiente no arquivo `.env` com as credenciais do banco de dados:

> DB_HOST=localhost
> DB_USER=seu_usuario
> DB_PASSWORD=sua_senha
> DB_DATABASE=nome_do_banco

### 2. Instalação e Execução do Servidor

1. Entre no diretório do servidor:

   ```bash
   cd rings-of-power/server

   ```

2. Instale as dependências:

   ```bash
   npm install

   ```

3. Execute as migrações do banco de dados:
   ```bash
   npm run migration:run
   ```
4. Inicie o servidor (modo de produção) ou em desenvolvimento:
   ```bash
   npm run start:dev
   ```

### 3. Instalação e Execução do Cliente

1.  Em um novo terminal, vá para o diretório do cliente:

    ```bash
    cd rings-of-power/client

    ```

2.  Instale as dependências:

    ```bash
    npm install

    ```

3.  Inicie o cliente:
    ```bash
    npm start
    ```

## Acesso ao Projeto

Após a instalação e execução, o projeto estará disponível localmente em:

- **Cliente**: http://localhost:3000
