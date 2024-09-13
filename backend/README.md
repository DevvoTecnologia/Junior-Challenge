# API DO DESAFIO FULLSTACK: OS ANÉIS DE PODER

API responsável por gerenciar as funções propostas no desafio um CRUD (Create, Read, Update e Delete)

## Documentação

## Endpoints

### POST /register

Essa rota é responsável por realizar o cadastro de um usuário

#### Parametros

email: E-mail para cadastro do usuário no sistema.
password: A senha para cadastro do usuário no sistema.

Exemplo:

```
{
	"email": "otavio@teste.com",
	"password": "@123"
}

```

#### Respostas

##### 201 - OK

A api irá retornar esse status quando todos os dados forem informados e não possuir nenhum outro usuário cadastrado com o email informado.

Exemplo de resposta

```

```

##### 400 - Bad Request

A api irá retornar esse status quando receber a solicitação faltando algum dos campos necessários ou quando o e-mail informado já estiver cadastrado na base.

Exemplo de resposta

```
{
	"error": {
		"status": 400,
		"message": "Bad Request"
	}
}

```

### POST /login

Essa rota é responsável por realizar o processo de login de um usuário.

#### Parametros

email: E-mail do usuário cadastrado no sistema.
password: A senha do usuário cadastrada no sistema.

Exemplo:

```
{
	"email": "otavio@teste.com",
	"password": "@123"
}

```

#### Respostas

##### 201 - OK

A api irá retornar esse status quando todos os dados forem informados e estiverem corretos.

Exemplo de resposta

```
  {
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YXZpb0B0ZXN0ZS5jb20iLCJpYXQiOjE3MjYxMjE3MDksImV4cCI6MTcyNjE1MDUwOX0.3Qb1jvTD23FKF8uMcW3LiQoqepCrKTZwOxNRD8P9CC8"
	}
}

```

##### 401 - Unauthorized

A api irá retornar esse status quando não encontrar no banco um usuário com o email informado ou quando a senha informada for inválida.

Exemplo de resposta

```
{
	"error": {
		"status": 401,
		"message": "Unauthorized"
	}
}

```

### GET /rings

Essa rota é responsável por listar todos os aneis cadastrados.

#### Parametros

Nenhum

Exemplo:

```

```

#### Respostas

##### 201 - OK

A api irá retornar esse status quando realizar com sucesso a operação de consulta.

Exemplo de resposta

```
{
	"data": {
		"rings": [
			{
				"id": 1,
				"name": "Narya",
				"power": "Seu portador ganha resistência ao fogo",
				"owner": "Gandalf",
				"imagem": "https://i.pinimg.com/originals/a8/df/a2/a8dfa2ee82e4e653df79431b957df07e.jpg",
				"createdAt": "2024-09-12T07:13:52.000Z",
				"updatedAt": "2024-09-12T07:13:52.000Z",
				"ForgerId": 1
			}
		]
	}
}

```

##### 403 - Token inválido

A api irá retornar esse status quando o token recebido for inválido.

Exemplo de resposta

```
{
	"error": {
		"status": 403,
		"message": "Token inválido"
	}
}

```

### POST /ring

Essa rota é responsável por cadastrar novos aneis.

#### Parametros

name: O nome do anel .
power: Uma breve descrição do poder do anel.
owner: O nome do portador atual.
forgedBy: Quem forjou o anel.
imagem: URL de uma imagem genérica do anel.

Exemplo:

```
{
	"name": "Narya",
	"power": "Seu portador ganha resistência ao fogo",
	"owner": "Gandalf",
	"forgedBy": "1",
	"imagem": "https://i.pinimg.com/originals/a8/df/a2/a8dfa2ee82e4e653df79431b957df07e.jpg"
}

```

#### Respostas

##### 201 - OK

A api irá retornar esse status quando realizar com sucesso a operação de cadastro.

Exemplo de resposta

```
{
	"data": {
		"rings": {
			"id": 1,
			"name": "Narya",
			"power": "Seu portador ganha resistência ao fogo",
			"owner": "Gandalf",
			"imagem": "https://i.pinimg.com/originals/a8/df/a2/a8dfa2ee82e4e653df79431b957df07e.jpg",
			"ForgerId": "1",
			"updatedAt": "2024-09-12T07:13:52.625Z",
			"createdAt": "2024-09-12T07:13:52.625Z"
		}
	}
}

```

##### 403 - Token inválido

A api irá retornar esse status quando o token recebido for inválido.

Exemplo de resposta

```
{
	"error": {
		"status": 403,
		"message": "Token inválido"
	}
}

```

##### 400 - Forger has reached the maximum number of rings

A api irá retornar esse status quando o forjador informado já tiver atingido seu número máximo aneis

Exemplo de resposta

```
{
	"error": {
		"status": 400,
		"message": "Forger has reached the maximum number of rings"
	}
}

```

##### 404 - Forger not found

A api irá retornar esse status quando o forjador informado não for encontrado

Exemplo de resposta

```
{
	"error": {
		"status": 404,
		"message": "Forger not found"
	}
}

```

### PUT /ring

Essa rota é responsável por atualizar as informações de um aneis.

#### Parametros

id: o id do anel que deseja atualizar.
name: O nome do anel .
power: Uma breve descrição do poder do anel.
owner: O nome do portador atual.
forgedBy: Quem forjou o anel.
imagem: URL de uma imagem genérica do anel.

Exemplo:

```
{
	"id": 1,
	"name": "Narya 15",
	"power": "Seu portador ganha resistência ao fogo",
	"owner": "Gandalf",
	"forgedBy": 2
}

```

#### Respostas

##### 201 - OK

A api irá retornar esse status quando realizar com sucesso a operação de atualização.

##### 403 - Token inválido

A api irá retornar esse status quando o token recebido for inválido.

Exemplo de resposta

```
{
	"error": {
		"status": 403,
		"message": "Token inválido"
	}
}

```

##### 400 - Forger has reached the maximum number of rings

A api irá retornar esse status quando o forjador informado já tiver atingido seu número máximo aneis

Exemplo de resposta

```
{
	"error": {
		"status": 400,
		"message": "Forger has reached the maximum number of rings"
	}
}

```

##### 404 - Forger not found

A api irá retornar esse status quando o forjador informado não for encontrado

Exemplo de resposta

```
{
	"error": {
		"status": 404,
		"message": "Forger not found"
	}
}

```

### DELETE /ring/:id

Essa rota é responsável por deletar um aneis.

#### Parametros

id: o id do anel que deseja deletar.

#### Respostas

##### 201 - OK

A api irá retornar esse status quando realizar com sucesso a operação de exclusão.

##### 403 - Token inválido

A api irá retornar esse status quando o token recebido for inválido.

Exemplo de resposta

```
{
	"error": {
		"status": 403,
		"message": "Token inválido"
	}
}

```

##### 400 - The ID entered is invalid

A api irá retornar esse status quando não receber um id

Exemplo de resposta

```
{
	"error": {
		"status": 400,
		"message": "The ID entered is invalid"
	}
}

```

##### 404 - Forger not found

A api irá retornar esse status quando o forjador informado não for encontrado

Exemplo de resposta

```
{
	"error": {
		"status": 404,
		"message": "Forger not found"
	}
}

```

### GET /forgers

Essa rota é responsável por listar todos os aneis cadastrados.

#### Parametros

Nenhum

#### Respostas

##### 201 - OK

A api irá retornar esse status quando realizar com sucesso a operação de consulta.

##### 403 - Token inválido

A api irá retornar esse status quando o token recebido for inválido.

Exemplo de resposta

```
{
	"error": {
		"status": 403,
		"message": "Token inválido"
	}
}

```
