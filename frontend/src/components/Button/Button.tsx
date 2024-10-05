import React from 'react';
import { IconType } from 'react-icons';
import styles from './Button.module.css';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  color?: string;
  type: string;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, color, type, icon: Icon }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: color || '#007bff',
  };

  return (
    <button 
      onClick={onClick} 
      className={styles.button}
      style={buttonStyle}
    >
      {Icon && <Icon className={styles.icon} />}
      {text}
    </button>
  );
};

export default Button;