# Projeto de Anéis Mágicos

Este projeto é uma aplicação web para gerenciar uma coleção de anéis mágicos. Ele permite visualizar, adicionar, editar e excluir anéis, com detalhes como nome, poder, portador e forjador.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset tipado de JavaScript para desenvolvimento mais seguro e produtivo.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
- **Shadcn UI**: Biblioteca de componentes UI baseada em Radix UI e Tailwind.
- **React Hook Form**: Biblioteca para gerenciamento de formulários em React.
- **Zod**: Biblioteca de validação de esquemas para TypeScript.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js) ou yarn

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/MateusJSouza/Junior-Challenge
   ```

2. Navegue até o diretório do projeto:
   ```
   cd frontend
   ```

3. Instale as dependências:
   ```
   npm install
   ```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento:
  ```
  npm run dev
  ```

O aplicativo estará disponível em `http://localhost:3000` (ou outra porta, se configurada diferentemente).

## Estrutura do Projeto

- `src/components`: Contém os componentes React, incluindo o formulário de anel e a lista de anéis.
- `src/types`: Definições de tipos TypeScript, incluindo a interface `Ring`.
- `src/validators`: Esquemas de validação Zod para os dados do anel.

## Funcionalidades Principais

- Visualização e deleção de anéis;
- Formulário para adicionar e editar anéis;
- Validação de dados do formulário usando Zod;
- Design responsivo utilizando Tailwind CSS;
- Sistema de autenticação com JWT.

