'use client';

import { createRing } from '@/app/actions/createRing';
import Form from '@/app/ui/form/form';
import { useFormState } from 'react-dom';

export default function NewRingPage() {
  const [state, formAction] = useFormState(createRing, null);

  return (
    <div className="container">
      <h1 className="text-center">Crie um novo anel</h1>
      <Form state={state} formAction={formAction} btnText="Salvar Anel" />
    </div>
  );
}
