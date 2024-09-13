import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <NavBar selectedPage={0} />
      <main className={styles.main}>
        <h1>Desafio: Gustavo Holzmann</h1>
        <p>Para este desafio, estabeleci como prioridades:</p>
        <ol>
          <li>Cumprir os requisitos estabelecidos</li>
          <li>Garantir uma boa usabilidade</li>
          <li>Garantir feedbacks ao usuário com base em suas ações</li>
          <li>Criar um ambiente de produção simples para facilitar a utilização do sistema </li>
        </ol>
        <h2>Stack utilizada</h2>
        <ul>
          <li>React.js para o front-end, com typescript</li>
          <li>Next.js para a criação da API e pelo gerenciamento eficiente de rotas</li>
          <li>Postgres para o banco de dados local e de produção</li>
        </ul>
      </main>
      <Footer />
    </div>
  )
}