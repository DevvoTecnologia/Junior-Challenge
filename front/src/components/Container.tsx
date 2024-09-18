import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import image from '../assets/senhor-dos-aneis-serie.jpg';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps): JSX.Element {
  return (
    <div
      className={`flex-1 bg-mainTextColor h-screen p-6 sm:p-[50px] ${className}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="h-full">{children}</div>
    </div>
  );
}
