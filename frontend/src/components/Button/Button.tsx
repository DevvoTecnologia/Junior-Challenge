import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  icon?: React.ReactNode;
  variant?: "primary" | "edit" | "delete";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  children,
  icon,
  variant = "primary",
  disabled = false,
  className,
  onClick,
}) => {
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
    edit: "bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700",
    delete: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
  };

  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      className={twMerge(
        "p-2 rounded-md duration-150 disabled:pointer-events-none disabled:bg-zinc-300 disabled:text-zinc-400 flex items-center justify-center gap-2",
        variantStyles[variant],
        className
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      {!!icon && icon}
      {!!children && children}
    </button>
  );
};
