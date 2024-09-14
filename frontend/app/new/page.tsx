'use client';

import { useFormState } from 'react-dom';
import { createRing } from '../actions/createRing';
import Input from '../ui/form/input';
import RadioFieldset from '../ui/form/radio-fieldset';
import SubmitButton from '../ui/form/submit-button';

export default function NewRingPage() {
  const [state, formAction] = useFormState(createRing, null);

  return (
    <div className="container">
      <h1 className="text-center">Crie um novo anel</h1>
      {state?.formValidationErrors && (
        <>
          <hr />
          <p className="text-center">
            <span data-tooltip="Envie novamente para verificar" data-placement="bottom">
              {' '}
              Corrija os erros!
            </span>
          </p>
          <hr />
        </>
      )}
      <form action={formAction}>
        {state?.apiValidationError && (
          <div className="text-center">
            <small>
              <mark>{state.apiValidationError}</mark>
            </small>
          </div>
        )}

        <Input
          name="name"
          label="Nome do anel:"
          validatedField={state?.formValidationErrors?.name ?? null}
        />
        <Input
          name="power"
          label="Poder:"
          validatedField={state?.formValidationErrors?.power ?? null}
        />
        <RadioFieldset
          name="forgedBy"
          legend="Forjado por:"
          inputs={[
            { id: 'elfos', value: 'Elfos', label: 'Elfos' },
            { id: 'anoes', value: 'Anões', label: 'Anões' },
            { id: 'humanos', value: 'Humanos', label: 'Humanos' },
            { id: 'sauron', value: 'Sauron', label: 'Sauron' },
          ]}
          validatedField={state?.formValidationErrors?.forgedBy ?? null}
        />
        <Input
          name="image"
          label="URL da foto:"
          validatedField={state?.formValidationErrors?.image ?? null}
          type="url"
        />
        <Input
          name="owner"
          label="Portador do Anel:"
          validatedField={state?.formValidationErrors?.ownerName ?? null}
          type="text"
        />
        <SubmitButton />
      </form>
    </div>
  );
}
