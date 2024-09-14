# Frontend para Gerenciamento de Anéis

Este frontend é uma aplicação React desenvolvida para interagir com a API de gerenciamento de anéis. Os usuários podem se cadastrar, autenticar-se e gerenciar anéis com base em regras específicas.

## Funcionalidades

### 1 - Tela de Login e Cadastro

- **Cadastro de Usuário**

  Permite que os usuários se registrem com um login e senha.

- **Login**

  Após o cadastro, os usuários podem fazer login para acessar a aplicação.

### 2 - Página de Anéis

Após o login, os usuários são direcionados para a página principal que lista todos os anéis disponíveis. A página oferece:

- **Adição de Anel**

  Usuários podem adicionar novos anéis.

- **Detalhes do Anel**

  Visualize os detalhes dos anéis em um carrossel.

- **Edição de Anel**

  Modifique as informações de um anel.

- **Exclusão de Anel**

  Remova anéis existentes.

### 3 - Regras de Negócio

Os anéis são gerenciados com base nas seguintes limitações:

- **Elfos**: No máximo 3 anéis.
- **Anões**: No máximo 7 anéis.
- **Homens**: No máximo 9 anéis.
- **Sauron**: Apenas 1 anel.

## Configuração do Ambiente

### 1 - Instale as dependências:

Navegue até o diretório do projeto e execute:

```bash
npm install
```

### 2 - Configure o arquivo `.env`:

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
VITE_BASE_URL=http://localhost:3000/
```

### 3 - Execute a aplicação:
Inicie o servidor de desenvolvimento com:

```bash
npm start
```
A aplicação estará disponível em http://localhost:3000

## Estrutura do Projeto

### Componentes Principais

- **Tela de Login e Cadastro**: Componentes para login e registro de usuários.
- **Página de Anéis**: Exibe a lista de anéis e opções para adicionar, editar e excluir anéis.
- **Componente Carrossel**: Exibe detalhes dos anéis em um carrossel interativo.

### Rotas

- **' / '**: Tela de login.
- **/register**: Tela de cadastro.
- **/aneis**: Página principal de anéis.
- **/aneis/add**: Página para adicionar um novo anel.
- **/aneis/editar/:id**: Página para editar um anel específico.
