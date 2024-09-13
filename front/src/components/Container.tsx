import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps): JSX.Element {
  return (
    <div
      className={`flex-1 h-[80%] bg-mainTextColor 
        p-6  sm:p-[50px] ${className}`}
    >
      <div className="h-full">{children}</div>
    </div>
  );
}
