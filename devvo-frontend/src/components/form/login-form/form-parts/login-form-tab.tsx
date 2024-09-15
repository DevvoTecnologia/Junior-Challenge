import { Separator } from "@/src/components/ui/separator";
import { ComponentProps } from "react";
type LoginFormTabProps = ComponentProps<"span"> & {
  children: React.ReactNode;
};
export const LoginFormTab = ({ children, ...rest }: LoginFormTabProps) => {
  return (
    <span className="flex items-center justify-center gap-2 px-2.5">
      <Separator className="my-4  w-1/6" />

      <span
        {...rest}
        className={`text-sm text-foreground/40 whitespace-nowrap cursor-pointer hover:underline`}
      >
        {children}
      </span>
      <Separator className="my-4  w-1/6" />
    </span>
  );
};
