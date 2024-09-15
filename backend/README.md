## Project setup

Create a .env file with
```js
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=docker
DB_PASSWORD=docker
DB_NAME=docker
```

Run
```bash
$ yarn install
```

## Compile and run the project

```bash
# watch mode
$ yarn run start:dev
```

## Run tests

```bash
# unit tests
$ yarn run test
```

## Endpoints
### Ring
>Create - Create a new ring

Type: Post

body:
```js
{
   "ring_name": "nome do anel",  //string
   "ring_image": "url da imagem do anel", //string
   "ring_power": "poder do anel", //string
   "forger_id": 1, //number
   "carrier_id": 1 //number
}
```
---
>Update - Update a ring

Type: Patch

body:
```js
{
   "ring_name": "nome novo do anel", //string
   "ring_image": "url da imagem do anel", //string
   "ring_power": "poder do anel", //string
   "forger_id": 1, //number
   "carrier_id": 1 //number
}
```
---
>Deleta - Delete a ring

Type: Delete
```js
// Deve se passar o id do anel como route params ex: http://localhost:3000/rings/29
```
---
>Show - Show a ring

Type: Get
```js
// Deve se passar o id do anel como route params ex: http://localhost:3000/rings/29
```
---
>List - List the rings

Type: Get
```js
// Não precisa passar nada
```
---
### Forger
>Create - Create a new forger

Type: Post

body:
```js
{
  "forger_name": "Elfos", //string
  "forger_max_forge": 2 //number
}
```
---
>Update - Update a forger

Type: Patch

body:
```js
{
  "forger_name": "Anões", //string
  "forger_max_forge": 5 //number
}
```
---
>Deleta - Delete a forger

Type: Delete
```js
// Deve se passar o id do forjador como route params ex: http://localhost:3000/forgers/53
```
---
>Show - Show a forger

Type: Get
```js
// Deve se passar o id do forjador como route params ex: http://localhost:3000/forgers/53
```
---
>List - List the forgers

Type: Get
```js
// Não precisa passar nada
```
---
### Carrier
>Create - Create a new carrier

Type: Post

body:
```js
{
  "carrier_name": "Gandalf" //string
}
```
---
>Update - Update a carrier

Type: Patch

body:
```js
{
  "carrier_name": "Bilbo" //string
}
```
---
>Deleta - Delete a carrier

Type: Delete
```js
// Deve se passar o id do carrier como route params ex: http://localhost:3000/carriers/53
```
---
>Show - Show a carrier

Type: Get
```js
// Deve se passar o id do carrier como route params ex: http://localhost:3000/carriers/53
```
---
>List - List the carriers

Type: Get
```js
// Não precisa passar nada
```
---
