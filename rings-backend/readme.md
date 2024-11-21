# Gerenciamento de Anéis API

Esta aplicação é uma API para o gerenciamento de anéis, construída com Node.js, Express e MongoDB. A API permite criar, listar, atualizar e remover anéis no banco de dados MongoDB, facilitando a gestão dessas entidades de forma eficiente.

## 📑 Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Endpoints](#endpoints)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento backend.
- **Express**: Framework para Node.js utilizado para criar a API.
- **Mongoose**: ODM para MongoDB, facilita o trabalho com o banco de dados.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os anéis.

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/matheus-calixto-silva/Junior-Challenge/tree/desafio-matheus-calixto/
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd rings-backend
   ```
3. Instale as dependências do projeto:
   ```bash
   pnpm install
   ```

## ⚙️ Configuração

1. Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.sample`, e adicione as seguintes variáveis de ambiente:

   ```env
   # String para assinatura dos tokens JWT
   SECRET=

   # Porta na qual a aplicação será executada
   PORT=

   # Tipo de armazenamento, 'local' para desenvolvimento e 's3' para produção
   STORAGE_TYPE=

   # URL de conexão ao MongoDB (local ou Mongo Atlas)
   MONGODB_URI=
   ```

2. Conecte-se ao banco de dados MongoDB. Certifique-se de que a URL está correta no campo `MONGODB_URI` do arquivo `.env`.

## 💻 Uso

Para iniciar a aplicação em ambiente de desenvolvimento, execute o comando:

```bash
pnpm run dev
```

A API estará disponível no endereço e porta definidos em seu arquivo `.env`, por exemplo, `http://localhost:3000`.

## 📂 Estrutura de Pastas

Abaixo está a organização do projeto, facilitando o entendimento e a manutenção do código:

```bash
├── src
│   ├── config                # Configurações gerais do projeto
│   │   └── env.ts
│   ├── controllers           # Controladores que lidam com as requisições
│   │   └── ring.ts
│   ├── libs                  # Bibliotecas e ferramentas auxiliares
│   ├── middlewares           # Middlewares como autenticação
│   │   └── authenticationMiddleware.ts
│   ├── models                # Modelos do Mongoose
│   │   ├── ring.ts
│   │   ├── user.ts
│   ├── useCases              # Casos de uso para as regras de negócio
│   │   ├── rings
│   │   │   ├── createRing.ts
│   │   │   ├── getRingById.ts
│   │   │   ├── listRings.ts
│   │   │   ├── removeRing.ts
│   │   │   └── updateRing.ts
│   └── index.ts              # Arquivo principal que inicializa a API
└── package.json              # Informações do projeto e dependências
```

## 📡 Endpoints

A seguir estão os principais endpoints disponíveis na API:

### Listar Anéis

```
GET /rings
```

Retorna uma lista de todos os anéis.

### Criar Anel

```
POST /rings
```

Cria um novo anel. O corpo da requisição deve conter os detalhes do anel, como nome, descrição, etc.

### Obter Anel por ID

```
GET /rings/:ringId
```

Retorna os detalhes de um anel específico com base no seu ID.

### Atualizar Anel

```
PUT /rings/:ringId
```

Atualiza os dados de um anel existente com base no ID fornecido.

### Remover Anel

```
DELETE /rings/:ringId
```

Remove um anel específico do banco de dados com base no ID.

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Faça um **fork** do projeto.
2. Crie uma nova branch para sua feature ou correção: `git checkout -b minha-feature`.
3. Faça suas modificações e adicione os commits: `git commit -m 'Minha nova feature'`.
4. Envie sua branch para o repositório remoto: `git push origin minha-feature`.
5. Abra um **Pull Request**.
