# Desafio Fullstack: Anéis de Poder - Concluído ✅

## 💡 Visão Geral

Implementei uma aplicação full-stack com um **backend** em Node.js (TypeScript) e um **frontend** em React (Vite + TypeScript), atendendo a todos os requisitos do desafio.

## 📸 Imagens e Vídeos

<div style="display: flex; justify-content: center; align-items: center; text-align: center;">
  <table>
    <tr>
      <td><img src="./media/login.png" alt="Login" width="350"/></td>
      <td><img src="./media/create.gif" alt="Create" width="350"/></td>
    </tr>
    <tr>
      <td><strong>Login</strong></td>
      <td><strong>Create</strong></td>
    </tr>
    <tr>
      <td><img src="./media/update.gif" alt="Update" width="350"/></td>
      <td><img src="./media/delete.gif" alt="Delete" width="350"/></td>
    </tr>
    <tr>
      <td><strong>Update</strong></td>
      <td><strong>Delete</strong></td>
    </tr>
  </table>
</div>

## 🛠️ Tecnologias Utilizadas

### Backend:
- **Node.js** com **TypeScript**
- **Express**
- **Prisma ORM** para interação com o banco de dados
- **PostgreSQL** usando **Docker**
- **JWT** para autenticação
- **Zod** para validação

### Frontend:
- **React** com **Vite** e **TypeScript**
- **React Router Dom** para navegação
- **TanStack Query** para requisições assíncronas
- **React Hook Form** para formulários
- **Tailwind CSS** para estilização
- **Zod** para validações
- **Toasts** para notificações

## 🎯 Funcionalidades Implementadas

### Backend:
- CRUD completo de anéis
- Autenticação com JWT
- Validações com Zod
- Limites de criação de anéis (Elfos, Anões, Homens, Sauron)

### Frontend:
- Formulários com validação e animações
- CRUD de anéis via interface simples
- Validações com Zod
- Carrossel para exibição de anéis
- Notificações toast para feedback ao usuário

## 📂 Estrutura do Projeto

### Backend:
- **Controllers**: Responsáveis por tratar as requisições.
- **Services**: Contêm a lógica de negócio e comunicação com o banco de dados.
- **Prisma ORM**: Facilita a interação com o banco de dados, criando queries tipadas automaticamente com base no schema.
- **Validação**: Feita com **Zod** tanto no frontend quanto no backend.

### Frontend:
- **Componentes Funcionais**: Separados por responsabilidade (UI e lógica).
- **Animações**: Implementadas nos inputs e toasts.
- **Arquitetura**: Lógica separada dos componentes em custom hooks e **services** para requisições HTTP.

### Docker:
- **PostgreSQL**: O banco de dados é executado em um contêiner Docker para facilitar o desenvolvimento e a configuração.

---

Esse projeto cumpre todos os requisitos do desafio, com foco em boas práticas, organização do código e utilização de ferramentas modernas.
