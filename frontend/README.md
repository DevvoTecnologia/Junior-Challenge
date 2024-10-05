# Documentação do Front-end - Projeto Anéis de Poder

## Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
3. [Estrutura do Projeto](#estrutura-do-projeto)


## Visão Geral

O front-end do projeto Anéis de Poder é uma aplicação React que permite aos usuários visualizar, criar, editar e excluir anéis mágicos inspirados no universo de J.R.R. Tolkien. A interface inclui um carrossel para exibição dos anéis e um formulário para criação/edição.

## Tecnologias e Ferramentas Utilizadas

- **Vite + SWC**: Build tool e dev server com compilação rápida.
  - **Vantagens do SWC**:
    - Compilação significativamente mais rápida comparada ao Babel.
    - Escrito em Rust, oferecendo melhor performance.
    - Totalmente compatível com as configurações do Babel.
    - Suporte nativo ao TypeScript sem necessidade de plugins adicionais.

- **React 18.x**
- **TypeScript**: Para tipagem estática e melhor tooling.

- **Zustand**: Para gerenciamento de estado.
  - **Vantagens sobre Redux**:
    - API mais simples e menos boilerplate.
    - Curva de aprendizado menor.
    - Melhor performance para atualizações de estado frequentes.
    - Integração fácil com TypeScript.
    - Não requer providers adicionais no nível da aplicação.

- **TailwindCSS**: Para estilização.
  - Abordagem utility-first para CSS.
  - Altamente customizável e fácil de manter.

- **shadcn/ui**: Biblioteca de componentes.
  - Componentes reutilizáveis e customizáveis.
  - Boa integração com TailwindCSS.

- **Biome.js**: Para linting e formatação de código.
  - Alternativa mais rápida e moderna ao ESLint.
  - Configuração simplificada.

- **react-toastify**: Para alertas e notificações toast.
  - Fácil de usar e customizar.
  - Ampla variedade de tipos de notificações.

## Estrutura do Projeto

FRONTEND/
|-- node_modules/
|-- public/
|-- src/
| |-- api/
| |-- assets/
| |-- components/
| |-- hooks/
| |-- lib/
| |-- pages/
| |-- stores/
| |-- types/
| |-- App.css
| |-- App.tsx
| |-- index.css
| |-- main.tsx
|-- .gitignore
|-- biome.json
|-- components.json
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- README.md
|-- tailwind.config.js
|-- tsconfig.app.json
|-- tsconfig.app.tsbuildinfo
|-- tsconfig.json
|-- tsconfig.node.json
|-- tsconfig.node.tsbuildinfo
|-- vite.config.ts

Esta estrutura reflete uma organização típica de um projeto React moderno usando Vite. Aqui está uma breve descrição de cada diretório e arquivo principal:

- `src/`: Contém todo o código-fonte da aplicação.
  - `api/`: Contém um interceptador do Axios para manipulação de requisições HTTP.
  - `assets/`: Armazena recursos estáticos como imagens, fontes, etc.
  - `components/`: Contém componentes React reutilizáveis.
  - `hooks/`: Armazena hooks personalizados.
  - `lib/`: Contém utilitários personalizados.
  - `pages/`: Contém componentes de página para roteamento.
  - `stores/`: Armazena stores Zustand para gerenciamento de estado.
  - `types/`: Contém definições de tipos TypeScript.
  - `App.tsx`: Componente raiz da aplicação.
  - `main.tsx`: Ponto de entrada da aplicação.

- Arquivos de configuração:
  - `vite.config.ts`: Configuração do Vite.
  - `tailwind.config.js`: Configuração do Tailwind CSS.
  - `tsconfig.json` e variantes: Configurações do TypeScript.
  - `biome.json`: Configuração do Biome.js para linting e formatação.
  - `eslint.config.js`: Configuração do ESLint (se ainda estiver em uso).
  - `postcss.config.js`: Configuração do PostCSS.

Esta estrutura demonstra uma organização clara e modular, facilitando a manutenção e escalabilidade do projeto.