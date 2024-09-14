import React, { ReactNode } from 'react';

import './styles.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  disabled?: boolean;
  children: ReactNode;
}

export function Select({ disabled, children, ...rest }: SelectProps) {
  return (
    <select className="select" disabled={disabled} {...rest}>
      {children}
    </select>
  );
}
