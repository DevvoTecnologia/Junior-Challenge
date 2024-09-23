import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  icon?: React.ReactNode;
  variant?: "primary" | "ghost";
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
    ghost:
      "text-gray-400 border border-gray-600 hover:bg-gray-700 active:bg-gray-800",
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
