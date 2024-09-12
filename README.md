# API para Gerenciamento de Anéis
Esta API foi desenvolvida para gerenciar anéis com base em regras de negócios específicas. A API permite criar, listar, atualizar e deletar anéis, além de gerenciar autenticação de usuários.

## Funcionalidades

###  1 - Criação de Usuário

**POST - /api/users/** 

Cria um usuário.

Exemplo de Requisição:
```json
{
  "login": "testLogin",
  "senha": "yourPassword"
}
```

###  2 - Autenticação de Usuário

**POST - /api/login**

 Autentica um usuário e retorna um token JWT.

Exemplo de Requisição:
```json
{
  "login": "testLogin",
  "senha": "yourPassword"
}
```

### 3 - Gerenciamento de Anéis

**POST - /api/anel**

Cria um novo anel.

Exemplo de Requisição:
```json
{
  "nome": "Narya, o anel do fogo",
  "poder": "Seu portador ganha resistência ao fogo",
  "portador": "Gandalf",
  "forjadoPor": "Elfos",
  "imagem": "https://exemplo.com/imagem_narya.jpg"
}
```

**GET - /api/anel**

Lista todos os anéis.

**GET - /api/anel/id**

Obtém um anel específico pelo ID.

**PUT - /api/anel/id**

Atualiza as informações de um anel.

**DELETE - /api/anel/id**

Deleta um anel específico pelo ID.


## Configuração do Ambiente

### 1 - Instale as dependências:

```bash
npm install
```

### 2 - Configure o arquivo .env:

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

- DB_TYPE=mysql
- DB_HOST=localhost
- DB_PORT=3306
- DB_USERNAME=root
- DB_PASSWORD=yourpassword
- DB_NAME=DB_TESTE_DEVVO


## Notas:
- DB_TYPE: Tipo de banco de dados (no seu caso, mysql).
- DB_HOST: Endereço do banco de dados.
- DB_PORT: Porta do banco de dados.
- DB_USERNAME: Nome de usuário para o banco de dados.
- DB_PASSWORD: Senha para o banco de dados.
- DB_NAME: Nome do banco de dados.

### 3 - Execute a aplicação:

Inicie o servidor com:

```bash
npm start
```
