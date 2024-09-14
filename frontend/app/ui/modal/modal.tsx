import { updateRing } from '@/app/actions/updateRing';
import type { ExistingRing } from '@/app/lib/definitions';
import styles from '@/app/ui/modal/modal.module.css';
import { useFormState } from 'react-dom';
import Form from '../form/form';

type ModalProps = {
  isOpen: boolean;
  handleCloseModal: () => void;
  ring: ExistingRing | null;
};

export default function Modal({ isOpen, handleCloseModal, ring }: ModalProps) {
  if (!ring) return null;
  const updateRingAction = updateRing.bind(null, ring.id.toString());
  const [state, formAction] = useFormState(updateRingAction, null);

  const containerClass = isOpen
    ? styles.modal_container + ' ' + styles.open
    : styles.modal_container;

  if (state === 'success') {
    handleCloseModal();
  }

  return (
    <div
      className={containerClass}
      onClick={(e) => {
        e.stopPropagation();
        console.log(e.target);
        console.log(e.currentTarget);
        if (e.target === e.currentTarget) {
          handleCloseModal();
        }
      }}
    >
      <dialog open={isOpen}>
        <article>
          <header>
            <button aria-label="Close" rel="prev" onClick={handleCloseModal}></button>
            <h2>Editar Anel</h2>
          </header>
          <Form state={state} formAction={formAction} btnText="Editar Anel" ringData={ring} />
        </article>
      </dialog>
    </div>
  );
}
