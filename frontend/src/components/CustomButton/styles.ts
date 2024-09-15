import styled from "styled-components";

interface CustomButtonProps {
  bgColor?: string;
  hoverColor?: string;
}

export const Button = styled.button<CustomButtonProps>`
  background: ${(props) => props.bgColor || "#007bff"};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${(props) => props.hoverColor || "#0056b3"};
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    transform: scale(1.05);

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300%;
      height: 300%;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transition: all 0.3s ease;
      transform: translate(-50%, -50%) scale(0);
      z-index: 0;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.1);
      filter: blur(8px);
      transition: all 0.3s ease;
      opacity: 0.5;
      z-index: -1;
    }
  }

  svg {
    margin-right: 8px;
  }
`;
