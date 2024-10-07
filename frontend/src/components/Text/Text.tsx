import React from 'react';
import styles from './Text.module.css';

interface TextProps {
  content: string;
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  color?: string;
  bold?: boolean;
  className?: string;
}

const Text: React.FC<TextProps> = ({ content, size = 'medium', color = 'black', bold = false, className }) => {
  const textStyle = {
    color: color,
    fontWeight: bold ? 'bold' : 'normal',
  };

  return (
    <span className={`${styles[size]}`} style={textStyle}>
      {content}
    </span>
  );
};

export default Text;