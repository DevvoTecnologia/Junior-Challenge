
# Backend - Anéis do Poder

Este é o backend do projeto "Anéis do Poder", responsável por gerenciar a API e a persistência dos dados em um banco de dados PostgreSQL. Ele foi desenvolvido utilizando Node.js e TypeORM.

## Tecnologias Utilizadas
- Node.js
- Express
- TypeORM
- PostgreSQL
- Docker (opcional)

## Funcionalidades
- API REST para criar, visualizar, editar e excluir anéis
- Regras de negócio para limitar a quantidade de anéis por forjador
- Integração com banco de dados PostgreSQL

## Como Rodar o Projeto

1. Clone o repositório
   ```bash
   git clone <link-do-repositorio>
   ```
2. Acesse o diretório do backend
   ```bash
   cd backend
   ```
3. Instale as dependências
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente no arquivo `.env`
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=seu-usuario
   DB_PASSWORD=sua-senha
   DB_NAME=aneis
   ```
5. Execute as migrações para criar as tabelas no banco de dados
   ```bash
   npm run migration:run
   ```
6. Execute o projeto
   ```bash
   npm run dev
   ```

O backend estará disponível em `http://localhost:4000`.

## Estrutura de Pastas
```bash
backend/
├── src/
│   ├── controllers/
│   ├── entities/
│   ├── migrations/
│   ├── repositories/
│   ├── routes/
│   ├── services/
├── ormconfig.json
├── package.json
├── tsconfig.json
├── .env
├── README.md
```

---

Feito com 💙 por Pedro Ribeiro
