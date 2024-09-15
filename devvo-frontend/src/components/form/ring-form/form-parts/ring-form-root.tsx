import { cn } from "@/src/lib/utils";
import { ComponentProps } from "react";

type RingFormRootProps = ComponentProps<"form"> & {
  children: React.ReactNode;
};
export const RingFormRoot = ({
  children,
  className,
  ...rest
}: RingFormRootProps) => {
  return (
    <form
      {...rest}
      className={cn(
        className,
        `flex flex-col items-center justify-center gap-10 h-full `,
      )}
    >
      {children}
    </form>
  );
};
