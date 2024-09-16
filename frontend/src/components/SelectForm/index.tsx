import React from "react";
import {
  SelectWrapper,
  StyledSelect,
  IconWrapper,
  Label,
  ContainerIconSelect,
  ErrorMessage,
  ContainerError,
} from "./styles";

interface SelectFormProps {
  name?: string;
  label?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  options: { value: string; label: string }[];
  icon?: React.ReactElement;
  error?: string;
}

const SelectForm: React.FC<SelectFormProps> = ({
  name,
  label,
  value,
  onChange,
  options,
  icon,
  error,
}) => {
  return (
    <SelectWrapper>
      <ContainerError>
        <Label> {label}</Label>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ContainerError>
      <ContainerIconSelect>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledSelect name={name} value={value} onChange={onChange}>
          <option value="">Selecione</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </ContainerIconSelect>
    </SelectWrapper>
  );
};

export default SelectForm;
