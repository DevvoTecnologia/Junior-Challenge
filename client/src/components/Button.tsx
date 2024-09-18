interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?(): void;
}

export function Button({
  children,
  className,
  onClick = () => {},
  ...rest
}: Props) {
  return (
    <button
      className={
        "p-2 bg-secondary-600 border rounded-lg border-secondary-500 text-secondary-100 font-semibold hover:bg-secondary-800 hover:border-secondary-600 disabled:bg-neutral-500 disabled:border-transparent duration-150 ease-in-out " +
        className
      }
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
