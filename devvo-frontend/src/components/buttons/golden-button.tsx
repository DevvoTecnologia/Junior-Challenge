import { cn } from "@/src/lib/utils";
import { ComponentProps } from "react";

type GoldenButtonProps = ComponentProps<"button"> & {
  children: React.ReactNode;
};
export const GoldenButton = ({
  children,
  role = "button",
  className,
  ...rest
}: GoldenButtonProps) => {
  return (
    <button
      {...rest}
      role={role}
      className={cn(className, "golden-button", "active:!translate-y-2")}
    >
      <span>{children}</span>
    </button>
  );
};
