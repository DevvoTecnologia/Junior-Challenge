import styles from "./button.module.css"

export default function Button(props: { action: (e: React.FormEvent) => void, buttonText: string, condition: boolean }) {
  return (
    <button
      disabled={!props.condition}
      onClick={props.action}
      type="submit"
      className={!props.condition ? styles.disabledButton : styles.submitButton}>{props.buttonText}
    </button>
  )
}