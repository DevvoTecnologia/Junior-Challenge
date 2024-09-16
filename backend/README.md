# Documentação do Projeto - Back-end

## Sumário
1. [Introdução](#1-introdução)
2. [Arquitetura do Projeto](#2-arquitetura-do-projeto)
   - [Princípios Seguidos](#21-princípios-seguidos)
3. [Tecnologias Utilizadas](#3-tecnologias-utilizadas)
4. [Design do Código](#4-design-do-código)
   - [Use Cases](#41-use-cases)
   - [Testes Unitários](#42-testes-unitários)
5. [Como Executar o Projeto](#5-como-executar-o-projeto)
   - [Pré-requisitos](#51-pré-requisitos)
   - [Instalação](#52-instalação)
   - [Execução de Testes](#53-execução-de-testes)
6. [Script para Criar Forjadores](#6-script-para-criar-forjadores)
7. [Rotas da API](#7-rotas-da-api)
8. [Erros Comuns](#8-erros-comuns)
9. [Considerações Finais](#9-considerações-finais)

## 1. **Introdução**
Este projeto foi desenvolvido como parte de um desafio técnico para uma vaga de desenvolvedor full-stack. A seguir, detalho as decisões técnicas, tecnologias utilizadas e o processo de desenvolvimento, destacando como as práticas de engenharia de software e padrões arquiteturais foram seguidos.

## 2. **Arquitetura do Projeto**
A estrutura do projeto segue a **Clean Architecture**, separando claramente as camadas de domínio, aplicação, infraestrutura e interfaces externas. Também utilizamos **Ports and Adapters (Hexagonal Architecture)** em alguns casos, garantindo flexibilidade e independência do banco de dados.

### 2.1 **Princípios Seguidos**
- **SOLID**: Aplicamos os cinco princípios para garantir a escalabilidade e manutenção do código.
- **KISS**: Mantivemos o código simples e fácil de entender.
- **DRY**: Evitamos repetição de lógica e código.
- **Clean Code**: Foco em legibilidade e simplicidade de compreensão.

## 3. **Tecnologias Utilizadas**
O projeto back-end foi desenvolvido utilizando as seguintes tecnologias:
- **Node.js**: Ambiente de execução JavaScript para o back-end.
- **TypeScript**: Adotamos TypeScript para garantir tipagem estática e maior segurança durante o desenvolvimento.
- **TypeORM**: Usado para a manipulação de banco de dados e mapeamento objeto-relacional (ORM).
- **PostgreSQL**: Banco de dados relacional utilizado no projeto.
- **Vitest**: Framework de testes utilizado para testes unitários.
- **Express**: Framework para criar a API RESTful.
- **Docker**: Utilizado para facilitar o setup do ambiente.

## 4. **Design do Código**
### 4.1 **Use Cases**
Implementamos os **casos de uso** seguindo os princípios da Clean Architecture. Os casos de uso são independentes de detalhes de infraestrutura, facilitando o teste e a manutenção. Cada caso de uso é testado com **testes unitários**, onde utilizamos **repositórios em memória** para simular interações com o banco de dados.

### 4.2 **Testes Unitários**
- Os testes unitários foram implementados utilizando **Vitest**. O padrão de testes **spy** foi usado para monitorar interações e garantir o funcionamento correto dos casos de uso.
- Os repositórios em memória permitiram que os testes fossem executados de forma independente do banco de dados, aumentando a velocidade e confiabilidade dos testes.

## 5. **Como Executar o Projeto**

### 5.1 **Pré-requisitos**
Certifique-se de ter instalado:
- Docker
- Node.js

Para a seção de **Instalação**, você já tem uma boa estrutura. Aqui está uma sugestão com ajustes para melhorar a clareza e fluxo:

---

### 5.2 **Instalação**

1. Clone o repositório:
   ```bash
   git clone https://github.com/devgmarques/Junior-Challenge
   cd Junior-Challenge
   ```

2. Altere para a branch do desafio:
   ```bash
   git checkout desafio-guilherme-marques
   cd backend
   ```

3. Instale as dependências do projeto:
   ```bash
   npm install
   ```

4. Configure o arquivo de ambiente:
   - Crie um arquivo `.env` com base no `.env.example` e preencha os valores necessários, como a URL do banco de dados e outras variáveis de configuração.

5. Suba o banco de dados PostgreSQL utilizando Docker:
   ```bash
   docker-compose up -d
   ```

6. Inicie a aplicação:
   ```bash
   npm run start
   ```

### 5.3 **Execução de Testes**
Para rodar os testes unitários:
```bash
npm run test
```

## 6. **Script para Criar Forjadores**
Além disso, criamos um script para criar os forjadores na base de dados. Para realizar a criação, execute o comando abaixo: Aqui está um exemplo de como utilizar o **TypeORM** para inserir um novo forjador no banco de dados:

```bash
npm run seed
```

Aqui está uma seção detalhando as rotas da API:

---

## 7. **Rotas da API**

A aplicação foi construída utilizando **Express** para gerenciar as rotas da API. Todas as rotas seguem o padrão RESTful, com endpoints organizados por recursos. A seguir, estão os principais endpoints expostos pela API:

- **GET /forgers**
  **Descrição**: Retorna todos os portadores cadastrados.  
  **Exemplo de Resposta**:
  ```json
  [
    {
        "forgerId": "e042f50a-ed13-4738-9930-ba8d72080cbe",
        "name": "Elfos",
        "maxRings": 3,
        "createdAt": "2024-09-15T22:52:14.375Z",
        "updatedAt": "2024-09-15T22:52:14.375Z"
    },
    {
        "forgerId": "b2db115c-a998-42a1-95c9-500381f78d35",
        "name": "Anões",
        "maxRings": 7,
        "createdAt": "2024-09-15T22:52:14.446Z",
        "updatedAt": "2024-09-15T22:52:14.446Z"
    },
    {
        "forgerId": "88011db4-e558-4344-8a4b-047033fab542",
        "name": "Homens",
        "maxRings": 9,
        "createdAt": "2024-09-15T22:52:14.499Z",
        "updatedAt": "2024-09-15T22:52:14.499Z"
    },
    {
        "forgerId": "b8e435a0-d027-4fd2-88e6-de2e54813cbc",
        "name": "Sauron",
        "maxRings": 1,
        "createdAt": "2024-09-15T22:52:14.560Z",
        "updatedAt": "2024-09-15T22:52:14.560Z"
    }
  ]
  ```

- **GET /rings**  
  **Descrição**: Retorna todos os anéis cadastrados.  
  **Exemplo de Resposta**:
  ```json
  [
    {
      "ringId": "6c76fd42-154e-4e44-bbfa-21e37f107ca8",
      "name": "Nome do Anel",
      "power": "Poder do Anel",
      "proprietor": "Portador",
      "image": "URL_DA_IMAGEM",
      "forgerId": "01602b8d-830a-4fd3-826f-6b19582e9fae",
      "createdAt": "2024-09-15T22:04:26.753Z",
      "updatedAt": "2024-09-15T22:04:26.753Z"
    },
    {
      "ringId": "6279d42a-49a1-4a89-a26f-c56cba999731",
      "name": "Nome do Anel",
      "power": "Poder do Anel",
      "proprietor": "Portador",
      "image": "URL_DA_IMAGEM",
      "forgerId": "f56f9d00-2b6b-4423-860c-6c13c8650f7e",
      "createdAt": "2024-09-15T22:06:45.770Z",
      "updatedAt": "2024-09-15T22:06:45.770Z"
    }
  ]
  ```

- **POST /rings**  
  **Descrição**: Cria um novo anel associado a um forjador.  
  **Corpo da Requisição**:
  ```json
  {
    "name": "Nome do Anel",
    "power": "Poder",
    "proprietor": "Portador",
    "image": "URL_DA_IMAGEM",
    "forgerId": "f56f9d00-2b6b-4423-860c-6c13c8650f7e"
  }
  ```  
  **Exemplo de Resposta**:
  ```json
  {
    "ringId": "6279d42a-49a1-4a89-a26f-c56cba999731",
    "name": "Nome do Anel",
    "power": "Poder",
    "proprietor": "Portador",
    "image": "URL_DA_IMAGEM",
    "forgerId": "f56f9d00-2b6b-4423-860c-6c13c8650f7e",
    "createdAt": "2024-09-15T22:06:45.770Z",
    "updatedAt": "2024-09-15T22:06:45.770Z"
  }
  ```

- **DELETE /rings/{ringId}**  
  **Descrição**: Exclui um anel do sistema.

- **PUT /rings/{ringId}**  
  **Descrição**: Atualiza um anel do sistema.
  **Corpo da Requisição**:
  ```json
  {
    "name": "Novo Nome para o Anel"
  }
  ```  
  **Exemplo de Resposta**:
  ```json
  {
    "ringId": "77977891-87ca-4788-b607-acd9f0e2a43f",
    "name": "Novo Nome para o Anel",
    "power": "Poder",
    "proprietor": "Portador",
    "image": "URL_DA_IMAGEM",
    "forgerId": "1f018135-af23-44b9-b8df-02037884c398",
    "createdAt": "2024-09-15T21:50:02.045Z",
    "updatedAt": "2024-09-15T18:50:19.452Z"
  }
  ```

## 8. **Erros Comuns**
- **404 Not Found**: Retornado quando um recurso específico (forjador ou anel) não é encontrado.
- **422 Unprocessable Entity**: Retornado quando o forjador tem a quantidade máxima de aneis permitidos.
- **500 Internal Server Error**: Quando ocorre algum erro inesperado no servidor.

## 9. **Considerações Finais**
O projeto foi desenvolvido seguindo os bons padrões de arquitetura e design de código, garantindo escalabilidade, facilidade de manutenção e testes robustos. Todas as decisões foram tomadas visando uma aplicação de alta qualidade, seguindo fielmente os requisitos propostos.
Além dos requisitos principais, implementamos com sucesso desafios extras, como a **criação de testes unitários**, o estabelecimento de **relacionamentos entre entidades** e **responsividade avançada**.

Feito por Guilherme Henrique Marques.