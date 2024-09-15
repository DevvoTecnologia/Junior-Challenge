import styled, { keyframes } from "styled-components";

interface ButtonProps {
  bgColor?: string;
  hoverColor?: string;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ContainerCard = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #f5f7fa, #e4e6eb);
  transition: transform 0.3s, box-shadow 0.3s, opacity 0.3s, border 0.3s;
  cursor: pointer;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.6s ease-in-out;
  border: 2px solid transparent;

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    border-color: #007bff;
  }
`;

export const CardImage = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

export const CardInfo = styled.div`
  padding: 10px 15px;
  text-align: left;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-top: 1px solid #ddd;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 16px;
    margin-bottom: 8px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.bgColor || "#007bff"};
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#0056b3"};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  svg {
    margin-right: 5px;
    font-size: 16px;
  }
`;

export const ContainerCardHover = styled(ContainerCard)`
  &:hover ${Button} {
    opacity: 1;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
`;
