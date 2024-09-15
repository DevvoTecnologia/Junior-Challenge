import React from "react";
import {
  InputWrapper,
  StyledInput,
  IconWrapper,
  Label,
  ContainerLabel,
  ContainerIconInput,
  ErrorMessage,
} from "./styles";

interface InputFormProps {
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  icon?: React.ReactElement;
  error?: string;
}

const InputForm: React.FC<InputFormProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  error,
}) => {
  return (
    <InputWrapper>
      <ContainerLabel>
        {label && <Label>{label}</Label>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ContainerLabel>
      <ContainerIconInput>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </ContainerIconInput>
    </InputWrapper>
  );
};

export default InputForm;
