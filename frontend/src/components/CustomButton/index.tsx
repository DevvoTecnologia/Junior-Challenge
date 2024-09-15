import React from "react";

import { Button } from "./styles";

interface CustomButtonProps {
  bgColor?: string;
  hoverColor?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  bgColor,
  hoverColor,
  onClick,
  children,
  type = "button",
}) => {
  return (
    <Button
      bgColor={bgColor}
      hoverColor={hoverColor}
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
