## Documentação da API

#### Criar um Anel

```http
POST /api/rings
```

| Parâmetro   | Tipo     | Descrição                              |
| :---------- | :------- | :------------------------------------- |
| `name`      | `string` | **Obrigatório**. Nome do anel          |
| `power`     | `string` | **Obrigatório**. Poder do anel         |
| `carrier`   | `string` | **Obrigatório**. Transportador do anel |
| `forgedBy`  | `string` | **Obrigatório**. Forjador do anel      |
| `image_url` | `file`   | **Obrigatório**. Imagem do anel        |

Respostas:

- 201 Created: Anel criado com sucesso.
- 400 Bad Request: Campos obrigatórios faltando ou forjador inválido.
- 500 Internal Server Error: Erro ao adicionar um novo anel.

```json
[
  {
    "id": "string",
    "name": "string",
    "power": "string",
    "carrier": "string",
    "forgedBy": "string",
    "image_url": "http://example.com/uploads/image.jpg"
  }
]
```

#### Retornar Todos os Anéis

```http
GET /api/rings
```

Respostas:

- 200 OK: Lista de todos os anéis.
- 500 Internal Server Error: Erro ao buscar anéis.

```json
[
  {
    "id": "string",
    "name": "string",
    "power": "string",
    "carrier": "string",
    "forgedBy": "string",
    "image_url": "http://example.com/uploads/image.jpg"
  }
]
```

#### Retornar um Anel

```http
GET /api/rings/${id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do anel que você deseja |

Respostas:

- 200 OK: Anel encontrado.
- 400 Bad Request: ID inválido.
- 404 Not Found: Anel não encontrado.
- 500 Internal Server Error: Erro ao buscar o anel.

#### Atualizar um Anel

```http
PUT /api/rings/${id}
```

| Parâmetro   | Tipo     | Descrição                              |
| :---------- | :------- | :------------------------------------- |
| `name`      | `string` | **Obrigatório**. Nome do anel          |
| `power`     | `string` | **Obrigatório**. Poder do anel         |
| `carrier`   | `string` | **Obrigatório**. Transportador do anel |
| `forgedBy`  | `string` | **Obrigatório**. Forjador do anel      |
| `image_url` | `file`   | **Obrigatório**. Imagem do anel        |

Respostas:

- 200 OK: Anel atualizado com sucesso.
- 400 Bad Request: ID inválido ou forjador inválido.
- 404 Not Found: Anel não encontrado.
- 500 Internal Server Error: Erro ao atualizar o anel.

```json
[
  {
    "id": "string",
    "name": "string",
    "power": "string",
    "carrier": "string",
    "forgedBy": "string",
    "image_url": "http://example.com/uploads/image.jpg"
  }
]
```

#### Deletar um Anel

```http
  DELETE /api/rings/${id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do anel que você deseja |

Respostas:

- 200 OK: Anel deletado com sucesso.
- 400 Bad Request: ID inválido.
- 404 Not Found: Anel não encontrado.
- 500 Internal Server Error: Erro ao deletar o anel.
