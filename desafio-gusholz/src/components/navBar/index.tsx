import Link from "next/link";
import styles from "./navBar.module.css";

export default function NavBar(props: { isHomepage: boolean }) {
  return (
    <nav className={styles.navBar}>
      <Link className={props.isHomepage ? styles.selectedLink : styles.link} href={"/"}>Criar Anel</Link>
      <Link className={props.isHomepage ? styles.link : styles.selectedLink} href={"/rings"}>Visualizar Aneis</Link>
    </nav>
  )
}