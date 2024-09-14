import type { FormState } from '@/app/actions/shared';
import type { ExistingRing } from '@/app/lib/definitions';
import ApiErrorMessage from '@/app/ui/form/api-error-message';
import ErrorHeader from '@/app/ui/form/error-header';
import Input from '@/app/ui/form/input';
import RadioFieldset from '@/app/ui/form/radio-fieldset';
import SubmitButton from '@/app/ui/form/submit-button';
import { redirect } from 'next/navigation';

type FormProps = {
  state: FormState;
  formAction: (payload: FormData) => void;
  btnText: string;
  ringData?: ExistingRing;
};

export default function Form({ state, formAction, btnText, ringData }: FormProps) {
  if (state === 'success') {
    redirect('/');
  }
  return (
    <div className="container">
      {state?.formValidationErrors && <ErrorHeader />}
      <form action={formAction}>
        {state?.apiValidationError && <ApiErrorMessage message={state.apiValidationError} />}

        <Input
          name="name"
          label="Nome do anel:"
          validatedField={state?.formValidationErrors?.name ?? null}
          defaultValue={ringData?.name}
        />
        <Input
          name="power"
          label="Poder:"
          validatedField={state?.formValidationErrors?.power ?? null}
          defaultValue={ringData?.power}
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
          defaultValue={ringData?.forgedBy}
        />
        <Input
          name="image"
          label="URL da foto:"
          validatedField={state?.formValidationErrors?.image ?? null}
          type="url"
          defaultValue={ringData?.image}
        />
        <Input
          name="owner"
          label="Portador do Anel:"
          validatedField={state?.formValidationErrors?.ownerName ?? null}
          type="text"
          defaultValue={ringData?.currentOwner.name}
        />
        <SubmitButton text={btnText} />
      </form>
    </div>
  );
}
