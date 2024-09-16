import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;

  gap: 5px;
`;

export const ContainerLabel = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;
`;

export const Label = styled.label`
  font-size: 16px;
  display: block;
  color: #333;

  width: 20%;

  text-align: start;
`;

export const StyledInput = styled.input`
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  padding-left: 40px;

  &:focus {
    border-color: #000000;
    box-shadow: 0 0 8px rgba(0, 86, 179, 0.2);
  }
`;

export const ContainerIconInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  position: absolute;
  color: #666;

  font-size: 16px;
  left: 12px;

  transform: translateY(-50%);
  top: 50%;
`;

export const ErrorMessage = styled.div`
  color: red;

  font-weight: 600;

  font-size: 14px;

  width: max-content;
`;
