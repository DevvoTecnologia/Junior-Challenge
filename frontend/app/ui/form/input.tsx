import type { possibleFieldStatus } from '@/app/lib/validateRingProperties';
import { useFormStatus } from 'react-dom';

type InputProps = {
  name: string;
  label: string;
  validatedField: possibleFieldStatus | null;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ name, label, validatedField, ...inputProps }: InputProps) {
  const { pending } = useFormStatus();
  let isInvalid = undefined;
  let errorMessage = undefined;

  if (validatedField) {
    if (validatedField.status === 'success') {
      isInvalid = false;
    } else {
      isInvalid = true;
      errorMessage = validatedField.message;
    }
  }

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} disabled={pending} aria-invalid={isInvalid} {...inputProps} />
      {errorMessage && <small>{errorMessage}</small>}
    </>
  );
}
