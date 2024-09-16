# Frontend Desafio: Os Anéis de Poder

Este projeto é parte do desafio "Os Anéis de Poder", onde o objetivo é construir um CRUD para gerenciar anéis inspirados na obra de J.R.R. Tolkien. O frontend foi desenvolvido usando **React** e **Vite**, proporcionando uma interface simples e eficiente para visualizar, criar, atualizar e excluir anéis.

## 🎯 Objetivo

O projeto consiste em criar um frontend capaz de interagir com uma API de gerenciamento de anéis, oferecendo funcionalidades como:

- Criar novos anéis com informações detalhadas.
- Listar todos os anéis cadastrados.
- Atualizar os dados de um anel existente.
- Excluir um anel.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **React**: Biblioteca JavaScript para construção de interfaces.
- **Vite**: Ferramenta de build rápida e leve para projetos frontend.
- **React Hook Form**: Gerenciamento de formulários e validação.
- **Zod**: Validação de schemas e tipos.
- **Axios**: Cliente HTTP para consumir a API de gerenciamento de anéis.

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/matheus-calixto-silva/Junior-Challenge/tree/desafio-matheus-calixto/
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd rings-frontend
   ```
3. Instale as dependências do projeto:
   ```bash
   pnpm install
   ```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto e configure a URL da API para apontar para o backend:

```
VITE_API_URL=http://localhost:3000
```

Isso garantirá que o frontend possa se comunicar corretamente com a API.

## 💻 Uso

Para iniciar a aplicação, utilize o seguinte comando:

```bash
pnpm run dev
```

A aplicação será iniciada no endereço `http://localhost:5173`. Agora você pode visualizar, criar, editar e excluir anéis!

## 📂 Estrutura de Pastas

O projeto segue uma organização modular com foco em separação de responsabilidades:

```bash
├── src
│   ├── app
│   │   ├── config         # Configurações gerais da aplicação
│   │   ├── contexts       # Context API para gerenciamento de estados globais
│   │   ├── hooks          # Hooks customizados
│   │   ├── interfaces     # Tipagem e interfaces utilizadas
│   │   ├── lib            # Funções auxiliares
│   │   ├── Router         # Configuração de rotas
│   │   ├── services       # Serviços para comunicação com a API
│   ├── views
│   │   ├── components     # Componentes reutilizáveis
│   │   │   ├── Loading.tsx
│   │   │   ├── RingForm.tsx
│   │   │   └── ...
│   │   ├── pages          # Páginas principais da aplicação
│   │   │   ├── Home.tsx
│   │   │   └── ...
│   │   └── styles         # Arquivos de estilo global
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir com o projeto:

1. Faça um **fork** do projeto.
2. Crie uma branch com a sua feature ou correção: `git checkout -b minha-feature`.
3. Faça commit das suas alterações: `git commit -m 'Minha nova feature'`.
4. Envie para o repositório remoto: `git push origin minha-feature`.
5. Abra um Pull Request.
