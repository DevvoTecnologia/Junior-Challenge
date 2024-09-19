# Os aneis do poder - API

## Tecnologias

- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker e Docker Compose](https://www.docker.com/): imagem de [node-20:alpine] e [postgre-alpine].
- [Vitest](https://vitest.dev/): para testes unitários e integrados.
- [Nodemon](https://nodemon.io/): para hot reload.

## Inicializando o servidor

Com o terminal *bash* aberto na pasta `server/`, execute os seguintes comandos para construir a imagem e iniciá-la.

```bash
docker compose up --build
```

O banco de dados postgresql `database_rings` e o servidor `rings-api` serão construídos e subirão.

```bash
docker build -t rings-api .
docker run -p 3333:3333 -d rings-api
```

O terminal irá retornar uma cadeia grandes de caracteres, que é o identificador da imagem (seu servidor) que está executando.

## Anotações

### Migrations do TypeORM

Precisa-se fazer as alterações no banco de dados para a tabela Ring, de acordo com a entidade `Ring` com as anotações do TypeORM:

```typescript
// src/modules/rings/domain/Rings.ts
import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity("rings")
export class Ring {
  @PrimaryColumn({ type: "string" })
  id: string;

  @Column({ type: "string" })
  nome: string;

  @Column({ type: "string" })
  poder: string;

  @Column({ type: "string" })
  portador: string;

  @Column({ type: "string" })
  forjadoPor: string;

  @Column({ type: "string" })
  imagem: string;

  // ...
}
```

Para realizar as migrações do banco de dados usando o TypeORM, é executado o seguinte comando:

```bash
npx typeorm migration:create ./src/shared/infra/typeorm/migrations/CreateRing
```

Será criado um arquivo `{timestamp}-CreateRing`, o qual será preenchido de acordo com a entidade `Ring`:

```typescript
// ./src/shared/infra/typeorm/migrations/{timestamp}-CreateRing.ts
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRing1726527833221 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "nome",
            type: "varchar",
          },
          {
            name: "poder",
            type: "varchar",
          },
          {
            name: "portador",
            type: "varchar",
          },
          {
            name: "forjadoPor",
            type: "varchar",
          },
          {
            name: "imagem",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("rings");
  }
}
```

É necessário executar essa migration para fazer as alterações no banco de dados. Para isso, é executado o comando abaixo:

```bash
npx typeorm-ts-node-commonjs migration:run -d ./src/shared/infra/typeorm/index.ts
```
