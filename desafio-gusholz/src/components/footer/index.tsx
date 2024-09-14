import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footerText}>Made by Gustavo Holzmann</footer>
      <footer className={styles.footerText}>Thanks for the reading! Hope you like</footer>
    </div>
  )
}