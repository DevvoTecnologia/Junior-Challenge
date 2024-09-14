# Os Anéis do Poder - Frontend

## 🚀 Introdução

Este projeto front-end foi desenvolvido utilizando Next.js 14, aproveitando os benefícios dos Server Components e integrando o PicoCSS para uma estilização rápida e semântica. O objetivo é criar uma interface para gerenciar anéis, permitindo a criação, edição, visualização e exclusão desses itens. Minha intenção com um framework como o PicoCSS é criar uma interface elegante, acessível e rápida de se fazer, especialmente pelo incentivo à utilizar HTML semântico e os atributos de acessibilidade. Typescript é utilizado para garantir a tipagem dos dados e a validação do formulário, apesar que gostaria de ter uma funcionalidade ao estilo do Prisma para gerar rapidamente as tipagens do back-end para o front-end, por isso utilizei o Zod com definições próprias.

## 🛠 Tecnologias Utilizadas

- Next.js 14
- TypeScript
- PicoCSS
- Zod
- React Slick

## 📁 Estrutura do Projeto

O projeto segue a estrutura de diretórios mais recente recomendada pelo Next.js 14, com componentes, ações e APIs organizados em pastas específicas dentro do diretório `app`.

## 🚀 Benefícios dos Server Components

- Renderização no servidor
- Redução do JavaScript no cliente
- Acesso direto a recursos do servidor
- Streaming e carregamento progressivo

## 🎨 PicoCSS e HTML Semântico

O PicoCSS é utilizado para estilização, incentivando o uso de HTML semântico, o que melhora a acessibilidade, SEO e legibilidade do código.

## 📝 Formulários e Validação

A validação de formulários é realizada usando Zod, e conduzi uma abstração para implementar as regras de validação em ambos os formulários de criação e edição. A abstração ficou elegante e evitou código repetitivo.

## 🌐 API e Integração

A integração com a API é feita através de funções específicas localizadas em `app/api/`, utilizando fetch para as requisições HTTP.

## 🏁 Conclusão

Este projeto demonstra uma implementação moderna de front-end, aproveitando as mais recentes tecnologias e práticas de desenvolvimento para criar uma aplicação performática, acessível e fácil de manter.
