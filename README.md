# Projeto Full Stack - Desafio Técnico

Este é um projeto full stack desenvolvido como parte de um desafio técnico. O front-end foi construído com **React**, **TypeScript**, e diversas bibliotecas, enquanto o back-end foi implementado utilizando **NestJS** e **MongoDB**.

## Tecnologias Utilizadas

### Front-end

- **React** com **Vite** para construção e otimização do projeto.
- **TypeScript** para tipagem estática.
- **React Query** para gerenciamento de dados assíncronos.
- **Ant Design** e **Chadcn UI** para componentes de UI.
- **React Slick** para carrosséis de imagens.
- **Tailwind CSS** para estilização baseada em utilitários.
- **React Toastify** para notificações de feedback ao usuário.

### Back-end

- **NestJS** como framework backend.
- **MongoDB** como banco de dados.
- **Swagger** para documentação automática das rotas.
- **Jest** para testes unitários.

---

## Como Executar o Projeto

### Front-end

Navegue até a pasta do front-end e execute o comando abaixo para instalar as dependências:

```bash
npm install
```

Em seguida, execute o seguinte comando para rodar o projeto:

```bash
npm run dev
```

A aplicação estará disponível no endereço `http://localhost:3000`.

### Back-end

Navegue até a pasta do back-end e execute o comando abaixo para instalar as dependências:

```bash
npm install
```

#### Modos de Execução

- **Modo de desenvolvimento:**

  ```bash
  npm run start:dev
  ```

- **Modo de produção:**

  ```bash
  npm run start:prod
  ```

- **Modo padrão de desenvolvimento:**

  ```bash
  npm run start
  ```

---

## Testes

Para executar os testes no back-end, utilize os comandos abaixo:

- **Testes unitários:**

  ```bash
  npm run test
  ```

- **Testes e2e (end-to-end):**

  ```bash
  npm run test:e2e
  ```

- **Cobertura de testes:**

  ```bash
  npm run test:cov
  ```

---

## Estrutura de Pastas

- `/frontend` - Código-fonte do front-end (React).
- `/backend` - Código-fonte do back-end (NestJS).

---

## Funcionalidades

### Front-end

- Exibição de dados e interação com a API.
- Interface amigável e responsiva.
- Carrosséis de imagens e feedbacks através de notificações.

### Back-end

- CRUD completo com banco de dados MongoDB.
- Documentação automática via Swagger.
- Testes unitários e e2e para garantir a integridade da API.
