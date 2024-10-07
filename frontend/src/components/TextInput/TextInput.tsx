import React from 'react';
import Text from '../Text/Text'; // Importando o componente de texto
import styles from './TextInput.module.css'; // CSS Module para estilização

interface Option {
  value: string;
  label: string;
}

interface TextInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  placeholder?: string;
  type: 'text' | 'select';
  options?: Option[];
}

const TextInput: React.FC<TextInputProps> = ({ 
  id, 
  name, 
  label, 
  value, 
  onChange, 
  error, 
  placeholder, 
  type, 
  options = [
    { 'id': '1',
      'name': 'Sauron',
      'value': '1',
      'label': 'Sauron'
    },
    { 'id': '2',
      'name': 'Elfos',
      'value': '2',
      'label': 'Elfos'
    },
    { 'id': '3',
      'name': 'Homens',
      'value': '3',
      'label': 'Homens'
    },
    { 'id': '4',
      'name': 'Anões',
      'value': '4',
      'label': 'Anões'
    },
  ]
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id}>{label}</label>
      {type === 'text' ? (
        <input
          type="text"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? styles.errorInput : 'color: #4c2e03;'}
          placeholder={placeholder}
        />
      ) : (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? styles.errorInput : 'color: #4c2e03;'}
        >
          <option value="" disabled>{placeholder || "Selecione uma opção"}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {error && <Text className={styles.errorText} content={error} color={"#ff0000"} size={"small"} bold={false} />}
    </div>
  );
};

export default TextInput;