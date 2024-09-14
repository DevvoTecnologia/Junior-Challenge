import styles from '@/app/ui/modal/modal.module.css';

type ModalContainerProps = {
  children: React.ReactNode;
  isOpen: boolean;
  handleCloseModal: () => void;
};

export default function ModalContainer({
  children,
  isOpen,
  handleCloseModal,
}: ModalContainerProps) {
  const containerClass = isOpen
    ? styles.modal_container + ' ' + styles.open
    : styles.modal_container;

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
      <dialog open={isOpen}>{children}</dialog>
    </div>
  );
}
