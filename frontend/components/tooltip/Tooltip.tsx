import { ComponentProps } from "react";
import {
  Tooltip as ShadTooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

type TootipProps = {
  text: string;
  children: React.ReactNode;
} & ComponentProps<typeof ShadTooltip>;

export default function Tooltip({ text, children, ...props }: TootipProps) {
  return (
    <TooltipProvider>
      <ShadTooltip {...props}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </ShadTooltip>
    </TooltipProvider>
  );
}
