import React from 'react';
import { IconType } from 'react-icons';
import styles from './Button.module.css';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  color?: string;
  type: string;
  icon?: IconType;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, color, type, icon: Icon, disabled }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: color || '#007bff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button 
      onClick={onClick} 
      className={styles.button}
      style={buttonStyle}
      disabled={disabled}
    >
      {Icon && <Icon className={styles.icon} />}
      {text}
    </button>
  );
};

export default Button;