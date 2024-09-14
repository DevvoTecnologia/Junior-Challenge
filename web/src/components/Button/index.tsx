import { ReactNode } from 'react';

import { Loading } from '../Loading';

import './styles.css';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  isLoading?: boolean;
  width?: string;
  disabled?: boolean;
  danger?: boolean;
  children: ReactNode;
  onClick?: () => void; // Adicionado onClick
}

export function Button({
  type,
  isLoading,
  width,
  disabled,
  danger,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`button ${danger ? 'delete' : ''}`}
      style={{ width }}
    >
      {!isLoading && children}
      {isLoading && <Loading size={16} />}
    </button>
  );
}
