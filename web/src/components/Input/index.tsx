import React from 'react';

import './styles.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, ...props }: InputProps) {
  return <input className={`input ${error ? 'error' : ''}`} {...props} />;
}
