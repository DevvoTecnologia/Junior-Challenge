import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  icon?: React.ReactNode;
  variant?: "primary" | "edit" | "delete";
  disabled?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  children,
  icon,
  variant = "primary",
  disabled = false,
  className,
}) => {
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
    edit: "bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700",
    delete: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
  };

  return (
    <button
      className={twMerge(
        "p-2 rounded-md duration-150 disabled:pointer-events-none disabled:bg-zinc-300 disabled:text-zinc-400",
        variantStyles[variant],
        className
      )}
      disabled={disabled}
    >
      {!!icon && icon}
      {!!children && children}
    </button>
  );
};
