import Link from "next/link";
import styles from "./navBar.module.css";

enum Pages {
  homepage,
  createRingPage,
  viewRingsPage,
}

export default function NavBar(props: { selectedPage: number }) {
  return (
    <nav className={styles.navBar}>
      <Link className={props.selectedPage === 0 ? styles.selectedLink : styles.link} href={"/"}>Homepage</Link>
      <Link className={props.selectedPage === 1 ? styles.selectedLink : styles.link} href={"/create-ring"}>Criar Anel</Link>
      <Link className={props.selectedPage === 2 ? styles.selectedLink : styles.link} href={"/rings"}>Visualizar Aneis</Link>
    </nav>
  )
}