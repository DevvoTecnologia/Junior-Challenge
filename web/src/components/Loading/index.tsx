import './styles.css';

interface LoadingProps {
  size?: number;
}

export function Loading({ size = 32 }: LoadingProps) {
  return <div className="loading" style={{ fontSize: `${size}px` }}></div>;
}
