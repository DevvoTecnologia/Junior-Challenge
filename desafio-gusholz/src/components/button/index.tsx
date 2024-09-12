import styles from "./button.module.css"

export default function Button(props: { action: (e: React.FormEvent) => void, buttonText: string }) {
  return (
    <button onClick={props.action} type="submit" className={styles.submitButton}>{props.buttonText}</button>
  )
}