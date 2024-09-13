# Junior Challenge Devvo

## Descrição

Este projeto é o Desafio Junior da Devvo. Ele utiliza as seguintes tecnologias:

- **Backend:** Node.js, Express, MongoDB, TypeScript.
- **Frontend:** Vite, React, TypeScript.

## Documentação

### Backend

<details open>
  <summary>
   API
  </summary>
  
#### POST /rings

- **Descrição**: Cria um novo anel.
- **Requisição**:
  - **Body**: JSON contendo os detalhes do anel (nome, poder, portador, forjadoPor, imagem).
- **Exemplo**:

```json
{
  "nome": "O Anel do Poder",
  "poder": "Seu portador ganha o poder de controlar todos os outros anéis",
  "portador": "Sauron",
  "forjadoPor": "Sauron",
  "imagem": "https://ae01.alicdn.com/kf/S3bcce296b2ad45a2a4436085b12bb7aem/LOTR-Elrond-Vilya-Anel-de-Ar-Pedra-Azul-J-ias-da-Moda-Masculina-Presente-do-F.jpg"
}
```

- **Resposta**
  - **201 Criado**: Retorna o anel criado com o ID adicionado.
  - **400 Bad Request**: Retorna um erro caso haja algum problema na requisição, como por exemplo, um limite de anéis para um determinado personagem.

#### GET /rings

- **Descrição**: Obtém todos os anéis.
- **Resposta**
  - **200 OK**: Retorna um array de objetos, cada um representando um anel.

#### PUT /rings/{id}

- **Descrição**: Atualiza um anel específico.
- **Parâmetros**:
  - **id**: O ID do anel a ser atualizado.
- **Requisição**:
  - **Body**: JSON contendo os novos dados do anel.
- **Exemplo**:

```json
{
  "portador": "Devvo"
}
```

- **Resposta**
  - **200 OK**: Retorna o anel atualizado.
  - **404 Not Found**: Retorna um erro caso o anel não seja encontrado.

#### DELETE /rings/{id}

- **Descrição**: Deleta um anel específico.
- **Parâmetros**:

  - **id**: O ID do anel a ser atualizado.

- **Resposta**
  - **204 No Content**: O anel foi deletado com sucesso.
  - **404 Not Found**: Retorna um erro caso o anel não seja encontrado.

#### Códigos de Status

**200 OK**: A requisição foi bem-sucedida.
**201 Created**: Um novo recurso foi criado.
**400 Bad Request**: A requisição contém erros de sintaxe.
**404 Not Found**: O recurso solicitado não foi encontrado.

##### Observações

**Campos:** Os campos `nome, poder, portador, forjadoPor e imagem` são obrigatórios para a criação de um novo anel.
**ID**: O campo `_id` é gerado automaticamente pelo banco de dados e identifica de forma única cada anel.

</details>

### Front-end

<details>
<summary>Frontend</summary>

#### Componentes

- **ListRings**:
  - **Props**:
    - rings: Array de objetos do tipo RingData (a serem listados).
    - onDelete: Função para remover um anel da lista.
  - **Funcionalidades**: - Renderiza uma lista de anéis com informações como nome, poder e portador. - Permite a exclusão de um anel.
    Mostra um indicador de carregamento enquanto os dados estão sendo carregados.
    Exibe uma mensagem de erro caso ocorra algum problema.
- **RingForm**:
  - **Props**:
    - onSubmit: Função para criar um novo anel.
  - **Estado**:
    - formData: Objeto contendo os dados do novo anel.
  - **Funcionalidades**:
    - Permite ao usuário inserir informações sobre um novo anel.
    - Valida os dados antes de enviar para o backend.
    - Exibe mensagens de erro caso os dados sejam inválidos.

#### 2. Serviços

- **api.ts**:
  - **Funções**:
    - **fetchRingsData**: Função assíncrona para buscar todos os anéis do backend.
    - **handleCreateOrUpdate**: Função assíncrona para criar um novo anel ou atualizar um anel já existente.
    - **handleDeleteRing**: Função assíncrona para deletar um anel.

#### 3. Tipos

- **RingData.ts**:
  - **Interface**:
    - Define a interface `RingData` com os campos `_id, nome, poder, portador, forjadoPor e imagem`, para listagem e atualização dos anéis e `RingDataCreate`, com os campos `nome, poder, portador, forjadoPor e imagem`, para criação de um novo anel.

#### 4. Utils

- **Forjador.ts**:
  - **Funções**:
    - Um enum para ser utilizado dentro do select do Forjador.

#### 5. Estilos

- **TailwindCSS:** Toda aplicação foi estilizada com TailwindCSS, afim de ter classes reutilizáveis e tornar o código mais legível.

</details>

## Pré-requisitos

- **Node.js e npm (ou yarn) instalados:** Certifique-se de ter pelo menos a versão 14 do Node.js.
- **MongoDB:** Instale e configure o MongoDB localmente.
- **Editor de código:** Recomenda-se utilizar um editor como Visual Studio Code.

## Instalação

1. **Clone o repositório:**

```bash
   git clone [Desafio Junior - Odair](https://github.com/odaairlopes/Junior-Challenge.git)
```

2. **Navegue até o diretório do backend**
   cd backend
   npm install

3. **Navegue até o diretório do frontend**
   cd ../frontend
   npm install

## Configuração

### Crie um arquivo .env

Backend: Copie o arquivo .env.example e renomeie para .env. Preencha as informações do seu banco de dados.
Frontend: Copie o arquivo .env.example e renomeie para .env. Preencha a URL da sua API.

### Inicie o MongoDB

Siga as instruções da documentação do MongoDB para iniciar o serviço.

## Execução

### Inicie o backend

1. Navegue até o diretório do backend

```
cd backend
npm run dev
```

### Inicie o frontend

1. Navegue até o diretório do backend

```
cd backend
npm run dev
```
