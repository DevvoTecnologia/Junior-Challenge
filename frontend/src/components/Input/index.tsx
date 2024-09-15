import React from 'react';
import './input.scss';

interface InputProps {
  type: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Input = ({ type, value, name, onChange, placeholder = '', className = '' }: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
