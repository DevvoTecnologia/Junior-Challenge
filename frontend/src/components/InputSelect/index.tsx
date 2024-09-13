import { ChangeEventHandler, InputHTMLAttributes } from 'react'
import { Container } from './style'

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string
  value: string | number | string[] | undefined
  options: string[]
  noValueOption?: string
  name: string
  disabled?: boolean
  setter: ChangeEventHandler<HTMLSelectElement>
}

const Select = ({
  label,
  name,
  disabled = false,
  value,
  noValueOption = 'Selecione...',
  options,
  setter
}: SelectProps) => (
  <Container>
    {label && <span>{label}</span>}
    <select id={name} name={name} value={value} onChange={setter} disabled={disabled}>
      <option>{noValueOption}</option>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  </Container>
)

export default Select
