# Desafio Fullstack: Os Anéis de Poder

_One Challenge to rule them all, One Challenge to find them, One Challenge to bring them all, and in the darkness bind them_

## Instalação

1. Faça o clone do projeto
2. Na pasta `back`, crie um arquivo para armazenar as variáveis de ambiente do projeto com o nome `.env`
3. Configure as variáveis de ambiente de acordo com o postgres e JWT e utilizando o arquivo `.env.exemple` como exemplo
4. Na pasta `back`, crie um arquivo para armazenar as variáveis de ambiente do projeto com o nome `.testing.env`
5. Configure as variáveis de ambiente de acordo com o postgres e JWT e utilizando o arquivo `.testing.env.exemple` como exemplo
6. Logo após, crie o banco de dados com docker-compose up

```
$ docker-compose up --build
```

6. Após a configuração das variáveis de ambiente, execute:

```
$ npm install
$ npm run dev
```

8. Na pasta `front`, crie um arquivo para armazenar as variáveis de ambiente do projeto com o nome `.env.local`
9. Configure as variáveis de ambiente de acordo com a porta do API e utilizando o arquivo `.env.local.exemple` como exemplo
10. Após a configuração das variáveis de ambiente, execute:

```
$ npm install
$ npm run dev
```
- Acesse a rota /docs para a documentação com Swagger.


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

Sua missão será criar um CRUD (Create, Read, Update, Delete) para gerenciar os anéis e desenvolver um frontend para visualizar e manipular essas informações.

## 🎯 Objetivo

### Backend

Criar uma API em **Node.js** com **TypeScript** para realizar as seguintes operações:

- **Criar** (POST) um novo anel.
- **Listar** (GET) todos os anéis.
- **Atualizar** (PUT) as informações de um anel.
- **Deletar** (DELETE) um anel existente.

### Frontend

Desenvolver uma interface simples em **React** com as seguintes telas:

- **Tela de Criação/Atualização**: Formulário para criar um novo anel ou atualizar um anel existente.
- **Tela de Visualização**: Exibição dos anéis criados em um **carrossel**, mostrando as informações de cada anel (nome, poder, portador, forjadoPor e imagem).

## ⚔️ Requisitos Funcionais

### Backend

1. **Criar um Anel**  
   O anel deverá ter as seguintes propriedades:

   - `nome`: Nome do anel (ex: "Narya, o anel do fogo").
   - `poder`: Uma breve descrição do poder do anel (ex: "Seu portador ganha resistência ao fogo").
   - `portador`: O nome do portador atual (Ex: Gandalf).
   - `forjadoPor`: Quem forjou o anel (ex: Elfos).
   - `imagem`: URL de uma imagem genérica do anel.

2. **Regras de Negócio para Criação de Anéis**  
   A API deverá garantir que a quantidade máxima de anéis criados respeite as seguintes regras:

   - **Elfos**: No máximo 3 anéis.
   - **Anões**: No máximo 7 anéis.
   - **Homens**: No máximo 9 anéis.
   - **Sauron**: Apenas 1 anel.

   Caso o limite seja excedido, a criação deve ser rejeitada com uma mensagem de erro adequada.

3. **Listar os Anéis**  
   A API deverá retornar uma lista com todos os anéis e suas propriedades.

4. **Atualizar um Anel**  
   Deve ser possível atualizar as informações de um anel específico (ex: alterar o portador ou a descrição do poder).

5. **Deletar um Anel**  
   Deve ser possível remover um anel do banco de dados.

### Frontend

1. **Tela de Criação/Atualização de Anel**

   - Um formulário com os seguintes campos:
     - `nome`: Campo de texto para o nome do anel.
     - `poder`: Campo de texto para a descrição do poder do anel.
     - `portador`: Campo de texto para o nome do portador.
     - `forjadoPor`: Campo de texto para indicar quem forjou o anel.
     - `imagem`: Como a imagem vai ser genérica você pode tanto deixar o uauário escolher entre as imagens que o próprio sistema fornece ou remover esse campo e deixar uma imagem default.
   - Botões para:
     - **Criar**: Submeter o formulário para criar um novo anel.
     - **Atualizar**: Alterar as informações de um anel existente.

2. **Tela de Visualização dos Anéis**
   - Exibir todos os anéis em um **carrossel** (ou grid), mostrando:
     - Nome, poder, portador, forjadoPor, e a imagem do anel.
   - O carrossel deve ser responsivo e permitir rolar entre os anéis cadastrados.
   - Adicionar a possibilidade de **excluir** ou **editar** um anel diretamente dessa tela.

## 🚀 Tecnologias

- **Backend**:

  - **Node.js** com **TypeScript**
  - **Express** (ou outro framework para criar a API)
  - **Banco de Dados**: MySQL, PostgreSQL, MongoDB, etc.
  - **ORM/ODM**: Sequelize, TypeORM ou Mongoose.

- **Frontend**:
  - **React**
  - **Biblioteca para Carrossel**: Você pode utilizar bibliotecas como `react-slick` ou outra para implementar o carrossel.

## 🛠️ Instruções

1. Faça o **fork** deste repositório.
2. Crie uma nova branch com o nome do seu desafio: `git checkout -b desafio-seu-nome`.
3. Implemente sua solução backend e frontend conforme os requisitos descritos.
4. Faça o **commit** das suas alterações: `git commit -m 'Desafio finalizado'`.
5. Faça o **push** para a branch criada: `git push origin desafio-seu-nome`.
6. Crie um **Pull Request** para o repositório principal.
7. Envie um email para "contato@devvo.com.br" falando que finalizou seu desafio e encaminhando o link do Pull Request

## 📝 Regras e Critérios de Avaliação

1. **Organização do código**: Estrutura clara e modularidade do código.
2. **Boas práticas**: Uso de boas práticas de desenvolvimento, como SOLID e DRY.
3. **Frontend**: Interface limpa, funcional e interativa (carrossel funcionando corretamente).
4. **Validação da Regra de Negócio**: Implementação correta da validação do limite de anéis por portador.
5. **Testes**: Testes unitários e/ou de integração serão um diferencial.
6. **Documentação**: Adicione uma breve documentação da API e do frontend (pode ser no próprio README ou em uma ferramenta como Swagger).

## 🔥 Desafios Extras (Opcional)

Se quiser ir além, aqui estão algumas sugestões de funcionalidades extras:

- **Autenticação**: Implemente um sistema de autenticação (JWT, OAuth, etc.).
- **Relacionamentos entre entidades**: Adicione relacionamentos entre os anéis e seus portadores (Ex: um portador pode ter mais de um anel, ou um anel pode ter sido passado por diferentes portadores ao longo do tempo).
- **Animações no Frontend**: Adicione animações ao carrossel ou à interface de criação de anéis.
- **Responsividade Avançada**: Certifique-se de que o carrossel e todas as funcionalidades são totalmente responsivas em diferentes dispositivos.

## 🧙‍♂️ Dicas

- Divida a lógica do backend em camadas (Controllers, Services, Models).
- Utilize hooks e componentes funcionais no frontend para um código mais limpo.
- Utilize **TypeScript** tanto no backend quanto no frontend para garantir tipagem estática.
- Planeje a interface para ser intuitiva e simples de usar.

## 🧭 Referências

- [Documentação do Node.js](https://nodejs.org/en/docs/)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do React](https://reactjs.org/docs/getting-started.html)

---

_May the Light of Eärendil guide you in this challenge!_
