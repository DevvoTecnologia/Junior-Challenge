# Os aneis do poder - API

## Tecnologias

- Typescript
- Express
- Vitest: para testes unitários e integrados
- Nodemon: para hot reload

## Rodando o Docker

Com o terminal *bash* aberto na pasta `server/`, execute os seguintes comandos para construir a imagem e iniciá-la.

```bash
docker build -t rings-api .
docker run -p 3000:3000 -d rings-api
```

O terminal irá retornar uma cadeia grandes de caracteres, que é o identificador da imagem (seu servidor) que está executando.