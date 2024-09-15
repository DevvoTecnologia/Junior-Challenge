import { cn } from "@/src/lib/utils";
import { ComponentProps } from "react";

type LoginFormRootProps = ComponentProps<"form"> & {
  children: React.ReactNode;
};
export const LoginFormRoot = ({
  children,
  className,
  ...rest
}: LoginFormRootProps) => {
  return (
    <form {...rest} className={cn(className, `flex flex-col gap-4 w-full`)}>
      {children}
    </form>
  );
};
