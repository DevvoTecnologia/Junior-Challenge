import React from 'react';
import Text from '../Text/Text'; // Importando o componente de texto, como solicitado
import styles from './TextInput.module.css'; // CSS Module para estilização

interface TextInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ id, name, label, value, onChange, error, placeholder }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? styles.errorInput : 'color: #4c2e03;'}
      />
      {error && <Text className={styles.errorText} content={error} color={"#ff0000"} size={"small"} bold={false} />}
    </div>
  );
};

export default TextInput;