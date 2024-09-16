# Desafio Fullstack: Os Anéis de Poder

## 🌟 Introdução

Olá, pessoal da Devvo! Estou empolgado em compartilhar minha experiência e o resultado do desafio que recebi há exatos três dias atrás. Este documento serve como uma visão geral do projeto, destacando minha abordagem, as tecnologias utilizadas e os resultados alcançados.

## 🚀 Demo

Confira o projeto em ação. O deploy da aplicação front-end está hospedado na Vercel, e o back-end / banco de dados no Render.

```
  Considerando que o Render, plataforma onde o projeto está hospedado, desabilita os containers após um tempo de inatividade, é possível que haja algum tipo de delay inicial.
```

[https://junior-challenge-p1pa.vercel.app/](https://junior-challenge-p1pa.vercel.app/)

Desafio recebido em 11/09/2024 e finalizado em 14/09/2024 ✅

## 🎯 Objetivo e Abordagem

Meu objetivo principal foi criar uma solução simples, eficiente e esteticamente agradável, tanto no back-end quanto no front-end. O desafio proporcionou uma oportunidade para demonstrar habilidades essenciais de desenvolvimento, e entre delas, destaco meu esforço para evidenciar minha capacidade de organização por toda codebase e de me manter atualizado com as melhores práticas, sempre revisitadas, da indústria.

## 💻 Frontend

Para o frontend, optei por utilizar a stack:

- **Next.js 14 / React / TS / PicoCSS**: Aproveitando os novos Server Components para melhorar performance, SEO e reduzir a dependência de JavaScript no cliente.

Esta abordagem resultou em uma aplicação moderna e eficiente e com um baixo nível de dependências - além dessas mencionadas, teve o Slick e o Zod. Fico impressionado com a capacidade de responsividade da aplicação a partir do Next.js e suas novas atualizações, consegui implementar os estados e animações de uma forma bem menos dependente de bibliotecas externas e com uso de código no cliente. Acho que essa plataforma de Server Components ainda tem muito a melhorar, mas já é uma realidade que merece bastante atenção!

Para finalizar, gostaria de explicar essa escolha da stack acima por acreditar que posso sempre tentar algo diferente e me mostrar flexível. Eu quis ir além de outros projetos que já fiz e estão disponíveis no meu GitHub - por exemplo, o mais recente foi uma landing page feita com Astro + React + TailwindCSS para um amigo meu. Segue o link caso tenham interesse [Github](https://github.com/p1padev/gztrentin-v2).

## 🛠 Backend

No backend, segui as instruções fornecidas e explorei novas tecnologias:

- **TypeORM**: Primeira experiência com esta ORM, testando minhas habilidades e capacidade de aprendizado com documentação em prazo rápido.
- **Express**: Utilizando minha familiaridade prévia com o framework.
- **PostgreSQL**: Meus estudos recentes vinham abarcando SQL e Postgres, e foi uma ótima oportunidade para colocar em prática.

Adotei o modelo MSC (Model-Service-Controller) para uma clara separação de responsabilidades como sugerido por vocês, resultando em um código bem organizado para o meu gosto.

## 🏗 Estrutura do Projeto

- **Monorepo**: Configurado com PNPM e workspaces.
- **ESLint**: Regras aplicadas globalmente.
- **TypeScript**: Configurações específicas para front-end e back-end devido às suas naturezas distintas.

## ✅ Checklist de Realizações

- [x] Organização do código
- [x] Boas práticas de desenvolvimento
- [x] Frontend interativo e responsivo
- [x] Implementação correta da validação do limite de anéis por portador
- [x ] Testes unitários e/ou de integração
- [x] Documentação da API e do frontend

## 📚 Documentação

- [Documentação do Backend](./backend/README.md)
- [Documentação do Frontend](./frontend/README.md)

## 🔮 Próximos Passos

- Implementar testes unitários para solidificar a qualidade do código.
- Implementar desafios extras com relação de entidades.

---

Agradeço a oportunidade de participar deste desafio. Foi uma experiência enriquecedora que me permitiu demonstrar minhas habilidades e também aprender novas tecnologias. Estou ansioso para discutir mais sobre o projeto e minha abordagem.
