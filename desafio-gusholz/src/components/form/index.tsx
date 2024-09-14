import MadeBy from "@/models/madeBy"
import styles from "./formSection.module.css"

export default function FormSection(props: {
  name: string,
  value: string,
  descriptionLabel: String,
  placeholder: string,
  isDropdown: boolean,
  callbackFunc: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}) {

  return (
    <div className={styles.formularioContainer}>
      <label className={styles.formularioLabel} htmlFor={props.name}>{props.descriptionLabel}</label>
      {props.isDropdown ?
        <div className={styles.formularioContainer}>
          <select
            className={styles.formularioInputField}
            id={props.name}
            name={props.name}
            value={props.value}
            onChange={props.callbackFunc}
            required
          >
            {Object.entries(MadeBy).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        :
        <input
          className={styles.formularioInputField}
          type="text"
          id={props.name}
          name={props.name}
          value={props.value}
          onChange={props.callbackFunc}
          required
          placeholder={props.placeholder}
        />
      }
    </div>
  )
}