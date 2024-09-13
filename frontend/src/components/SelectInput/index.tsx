import React from 'react'
import { InputSelectStyle } from './styles'
import colors from '../../styles/colors'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any
  placeholder?: string
  id: string
  value?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any
  disabled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Array<any>
  width?: string
  optionDisabled?: string
  required?: boolean
  border?: string
  borderRadius?: string
}

const SelectInput = ({
  style,
  id,
  onChange,
  value,
  disabled,
  placeholder,
  options,
  width,
  optionDisabled,
  required = false,
  border,
  borderRadius
}: IProps) => {
  return (
    <InputSelectStyle
      borderColorFocus={colors?.blue}
      borderRadius={borderRadius}
      border={border}
      width={width}
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      required={required}
      style={{
        ...style
      }}
    >
      {optionDisabled?.length ? (
        <option value='' disabled>
          {optionDisabled}
        </option>
      ) : null}
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options?.map((option: any, index: number) => (
          <option value={option?.id ?? option?.code ?? option} key={index}>
            {option?.name ?? option?.label ?? option?.description ?? option?.value ?? option}
          </option>
        ))
      }
    </InputSelectStyle>
  )
}

export default SelectInput
