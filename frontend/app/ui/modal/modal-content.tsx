import { updateRing } from '@/app/actions/updateRing';
import type { ExistingRing } from '@/app/lib/definitions';
import { useFormState } from 'react-dom';
import Form from '../form/form';

type ModalProps = {
  handleCloseModal: () => void;
  ring: ExistingRing;
};

export default function ModalContent({ handleCloseModal, ring }: ModalProps) {
  const updateRingAction = updateRing.bind(null, ring.id.toString());
  const [state, formAction] = useFormState(updateRingAction, null);

  if (state === 'success') {
    handleCloseModal();
  }

  return (
    <article>
      <header>
        <button aria-label="Close" rel="prev" onClick={handleCloseModal}></button>
        <h2>Editar Anel</h2>
      </header>
      <Form state={state} formAction={formAction} btnText="Editar Anel" ringData={ring} />
    </article>
  );
}
