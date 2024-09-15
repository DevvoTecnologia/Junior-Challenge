import React from 'react';
import './button.scss';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button = ({ onClick, children, type = 'button', className = '' }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
