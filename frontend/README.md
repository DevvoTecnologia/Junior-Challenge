# Frontend - Sistema de Gestão de Anéis

Este é o frontend do projeto **Sistema de Gestão de Anéis**, desenvolvido utilizando **React** e **TypeScript**.

## 📸 Imagens e Vídeos

<div style="display: flex; justify-content: center; align-items: center; text-align: center;">
  <table>
    <tr>
      <td><img src="/media/LoginPage.png" alt="Login" width="350"/></td>
      <td><img src="/media/RegisterPage.png" alt="Cadastro" width="350"/></td>
    </tr>
    <tr>
      <td><strong>Login</strong></td>
      <td><strong>Cadastro</strong></td>
    </tr>
    <tr>
      <td><img src="/media/DashBoardPage.png" alt="Dashboard" width="350"/></td>
      <td>https://github.com/user-attachments/assets/c74d24d5-d090-4df3-a9a6-2c9d018f20de</td>
    </tr>
    <tr>
      <td><strong>Dashboard</strong></td>
      <td><strong>Evento de Criação</strong></td>
    </tr>
    <tr>
    <td>https://github.com/user-attachments/assets/30320a38-72d7-458d-a0b0-8d7c15f00440</td>
    <td>https://github.com/user-attachments/assets/f1a46b27-fd2e-41a1-946c-a6a1dcee1908</td>
    </tr>
    <tr>
      <td><strong>Eventode Editar com Listagem de Ex-Donos do Anel</strong></td>
      <td><strong>Evento de Deletar Anel</strong></td>
    </tr>
  </table>
</div>

## Funcionalidades

- Cadastro de usuários
- Login e autenticação
- Visualização de anéis cadastrados
- Criação de anéis por meio de modal
- Atualização de anéis por meio de modal e deleção por botão
- Atribuição de portadores aos anéis
- Visualização da lista de ex-portadores.
- Limite de Forjadores.
- Tratamento de erros por meio de um toast
- Interface amigável para interação com a API do backend

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces com NextJS.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática.
- **Axios**: Cliente HTTP para comunicação com o backend.
- **React Router**: Gerenciamento de rotas.
- **React-Slick**: Para carrosel do dashboard.
- **React Toastify**: Para mensagens de aviso.
- **JWT (JSON Web Tokens)**: Gerenciamento de autenticação e autorização.

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. Instale as dependências:
    ```bash
    npm install

2. Configure as variáveis de ambiente: Crie um arquivo **.env.local** na raiz do projeto com base no arquivo
   _**.env.example.**_


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
