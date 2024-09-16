## Junior Challenge - Frontend

Este repositório contém o frontend do projeto Junior Challenge, desenvolvido utilizando Vite, React, e TypeScript. Este documento descreve o processo de instalação, os principais scripts, a estrutura do projeto, e as dependências usadas.


## Instalação


Para instalar e configurar o projeto localmente, siga os seguintes passo


## 1. Clone o repositório:

```bash
git clone https://github.com/andersona16/Junior-Challenge.git
cd Junior-Challenge/frontend
```

## 2. Instale as dependências necessárias com o comando:

```bash
npm install

ou 

yarn install
```

## Scripts

Os seguintes scripts estão disponíveis no arquivo package.json para facilitar o desenvolvimento e o build do projeto:

```bash
npm run dev: Inicia o servidor de desenvolvimento com o Vite.

npm run build: Constrói o projeto para produção.

npm run preview

npm run lint
```

## Estrutura do Projeto


A estrutura do diretório frontend é organizada da seguinte forma:


```bash
frontend/
├── src/
│   ├── App.tsx            # Componente principal da aplicação React
│   ├── assets/            # Recursos como imagens, fontes, etc.
│   ├── components/        # Componentes reutilizáveis da aplicação
│   ├── context/           # Definição de Context API para gerenciamento de estado global
│   ├── interface/         # Definição de interfaces TypeScript usadas no projeto
│   ├── main.tsx           # Arquivo de entrada principal que inicializa a aplicação React
│   ├── pages/             # Páginas principais da aplicação
│   ├── routes/            # Definição de rotas do React Router
│   ├── services/          # Serviços para chamadas de API e outras funcionalidades
│   ├── styles/            # Arquivos de estilização global e componentes estilizados
│   ├── utils/             # Funções utilitárias e helpers do projeto
│   └── vite-env.d.ts      # Arquivo de definição de tipos para o Vite e TypeScript
```

## Principais Dependências

- React: Biblioteca para construção da interface do usuário.
- React Router Dom: Gerenciamento de rotas.
- Axios: Utilizado para chamadas HTTP.
- Styled Components: Estilização de componentes com CSS-in-JS.
- Yup: Validação de formulários.
- React Toastify: Exibição de notificações de forma fácil.
- React Slick: Criação de carrosséis de imagens.
- React Icons: Conjunto de ícones para uso em componentes.


## Ferramentas de Desenvolvimento

- TypeScript: Suporte a tipos estáticos.
- ESLint: Ferramenta de linting para garantir qualidade e consistência do código.
- Vite: Ferramenta de construção rápida e moderna.
- Definições de Tipos: Utilizadas para fornecer suporte de tipos ao trabalhar com bibliotecas - JavaScript em TypeScript.