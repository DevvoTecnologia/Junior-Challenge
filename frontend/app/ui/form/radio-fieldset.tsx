import { possibleFieldStatus } from '@/app/lib/validateRingProperties';
import { useFormStatus } from 'react-dom';

type RadioFieldsetProps = {
  name: string;
  inputs: {
    id: string;
    value: string;
    label: string;
  }[];
  legend: string;
  validatedField: possibleFieldStatus | null;
  defaultValue?: string;
};

export default function RadioFieldset({
  name,
  inputs,
  legend,
  validatedField,
  defaultValue,
}: RadioFieldsetProps) {
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
      <fieldset disabled={pending} aria-invalid={isInvalid}>
        <legend>{legend}</legend>
        {inputs.map((input) => (
          <span style={{ display: 'inline-block', marginRight: '10px' }} key={input.id}>
            <input
              type="radio"
              id={input.id}
              name={name}
              value={input.value}
              aria-invalid={isInvalid}
              defaultChecked={defaultValue === input.value}
            />
            <label htmlFor={input.id}>{input.label}</label>
          </span>
        ))}
      </fieldset>
      {errorMessage && <small>{errorMessage}</small>}
    </>
  );
}
