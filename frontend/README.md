# Frontend - Sistema de Gestão de Anéis

Este é o frontend do projeto **Sistema de Gestão de Anéis**, desenvolvido utilizando **React** e **TypeScript**.

## Funcionalidades

- Cadastro de usuários
- Login e autenticação
- Visualização de anéis cadastrados
- Criação de anéis por meio de modal
- Atualização de anéis por meio de modal e deleção por botão
- Atribuição de portadores aos anéis
- Interface amigável para interação com a API do backend

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática.
- **Axios**: Cliente HTTP para comunicação com o backend.
- **React Router**: Gerenciamento de rotas.
- **React-Slick**: Para carrosel do dashboard.
- **JWT (JSON Web Tokens)**: Gerenciamento de autenticação e autorização.

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. Instale as dependências:
    ```bash
    npm install

2. Configure as variáveis de ambiente: Crie um arquivo **.env.local** na raiz do projeto com base no arquivo _**.env.example.**_


3. Execute o projeto:
   ```bash
   npm run dev
   
O servidor será iniciado em http://localhost:3000

### Estrutura de Pastas
   ```bash
   src/
   ├── app/                            # Componentes reutilizáveis
        ├── api/auth/[...nextauth]     # Autenticacao
        ├── auth/signin and signup     # Páginas de login e cadastro
        ├── components                 # Componentes reutilizáveis
        ├── components                 # Dashboard onde ocorre tudo em relacao ao projeto
   ├── hooks/                          # Hooks customizados
   ├── models/                         # Modelos de dados utilizados na aplicação
   ├── providers/                      # Providers para gerenciamento de estado e contexto
   ├── services/                       # Comunicação com a API (Axios)
   ├── types/                          # Tipos TypeScript utilizados no projeto
   └── utils/                          # Funções utilitárias
   ```

### Rotas Das Paginas:
* **_/auth/signin_**: Página de login do sistema.
* **_/auth/signup_**: Página de cadastro de novos usuários.
* **_/dashboard_**: Página principal para visualização e gerenciamento dos anéis cadastrados.