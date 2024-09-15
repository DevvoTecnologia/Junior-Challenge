import { cn } from "@/src/lib/utils";
import { ComponentProps } from "react";

type RingFormLabelProps = ComponentProps<"label"> & {
  children: React.ReactNode;
};
export const RingFormLabel = ({
  children,
  className,
  ...rest
}: RingFormLabelProps) => {
  return (
    <label {...rest} className={cn(className, `flex flex-col `)}>
      {children}
    </label>
  );
};
