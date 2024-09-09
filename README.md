# Junior-Challenge
One Challenge to rule them all, One Challenge to find them, One Challenge to bring them all, and in the darkness bind them

# Desafio Fullstack: Os Anéis do Poder

Bem-vindo ao desafio de desenvolvimento fullstack! Aqui você terá a oportunidade de provar suas habilidades como desenvolvedor criando uma aplicação para gerenciar **os Anéis do Poder**, com base no universo de _O Senhor dos Anéis_. Prepare-se para embarcar nessa jornada épica!

## 💍 Contexto do Desafio

O grande mago J.R.R. Tolkien nos deixou a famosa frase:

> **Three Rings for the Elven-kings under the sky,  
> Seven for the Dwarf-lords in their halls of stone,  
> Nine for Mortal Men doomed to die,  
> One for the Dark Lord on his dark throne  
> In the Land of Mordor where the Shadows lie.  
> One Ring to rule them all, One Ring to find them,  
> One Ring to bring them all, and in the darkness bind them  
> In the Land of Mordor where the Shadows lie.**

Sua missão será criar um CRUD para gerenciar esses anéis. Cada anel terá informações específicas, e você deverá ser capaz de realizar operações básicas de criação, leitura, atualização e exclusão de dados sobre eles.

## 🎯 Objetivo

Criar uma API em **Node.js** com **TypeScript** para realizar as seguintes operações:

- **Criar** (POST) um novo anel.
- **Listar** (GET) todos os anéis.
- **Atualizar** (PUT) as informações de um anel.
- **Deletar** (DELETE) um anel existente.

## ⚔️ Requisitos Funcionais

1. **Criar um Anel**  
   - O anel deverá ter as seguintes propriedades:
     - `nome`: Nome do anel (ex: "Anel dos Elfos").
     - `poder`: Uma breve descrição do poder do anel.
     - `portador`: O nome do portador atual (Elfo, Anão, Homem, Sauron, etc.).
     - `forjadoPor`: Quem forjou o anel (ex: "Celebrimbor", "Sauron").
     - `quantidade`: Quantidade de anéis desse tipo (ex: 3 para os Elfos, 7 para os Anões, etc.).

2. **Listar os Anéis**  
   - A API deverá ser capaz de retornar uma lista com todos os anéis e suas propriedades.

3. **Atualizar um Anel**  
   - Deve ser possível atualizar as informações de um anel específico (ex: alterar o portador ou descrição do poder).

4. **Deletar um Anel**  
   - Deve ser possível remover um anel do banco de dados.

## 🚀 Tecnologias

O desafio deve ser desenvolvido utilizando as seguintes tecnologias:

- **Node.js** com **TypeScript**
- **Express** (ou outro framework para criar a API)
- **Banco de Dados**: Utilize um banco de dados relacional ou não-relacional de sua preferência (MySQL, PostgreSQL, MongoDB, etc.)
- **ORM/ODM**: Se preferir, pode utilizar um ORM (como Sequelize ou TypeORM) para gerenciar o banco de dados.

## 🛠️ Instruções

1. Faça o **fork** deste repositório.
2. Crie uma nova branch com o nome do seu desafio: `git checkout -b desafio-seu-nome`.
3. Implemente sua solução, criando a API conforme os requisitos descritos.
4. Faça o **commit** das suas alterações: `git commit -m 'Desafio finalizado'`.
5. Faça o **push** para a branch criada: `git push origin desafio-seu-nome`.
6. Crie um **Pull Request** para o repositório principal.

## 📝 Regras e Critérios de Avaliação

1. **Organização do código**: Estrutura clara e modularidade do código.
2. **Boas práticas**: Uso de boas práticas de desenvolvimento, como SOLID e DRY.
3. **Testes**: Testes unitários e/ou de integração serão um diferencial.
4. **Documentação**: Adicione uma breve documentação da API (pode ser no próprio README ou em uma ferramenta como Swagger).

## 🔥 Desafios Extras (Opcional)

Se quiser ir além, aqui estão algumas sugestões de funcionalidades extras:

- **Autenticação**: Implemente um sistema de autenticação (JWT, OAuth, etc.).
- **Relacionamentos entre entidades**: Adicione relacionamentos entre os anéis e seus portadores (Ex: um portador pode ter mais de um anel, ou um anel pode ter sido passado por diferentes portadores ao longo do tempo).
- **Frontend**: Desenvolva um frontend simples para interagir com a API.

## 🧙‍♂️ Dicas

- Lembre-se de estruturar seu código de maneira clara e reutilizável.
- Divida a lógica em camadas (Controllers, Services, Models).
- Utilize **TypeScript** para garantir tipagem estática, aumentando a segurança e manutenção do código.

## 🧭 Referências

- [Documentação do Node.js](https://nodejs.org/en/docs/)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Express](https://expressjs.com/)

Boa sorte, jovem desenvolvedor(a)! Que seu código seja tão poderoso quanto os Anéis do Poder, mas lembre-se: só há **Um Anel** que pode controlá-los todos.

---

_May the Light of Eärendil guide you in this challenge!_
