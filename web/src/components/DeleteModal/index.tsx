import { Button } from '../Button';

import './styles.css';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteModal({ isOpen, onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmação de exclusão</h2>
        <p>Tem certeza que deseja excluir o anel?</p>
        <div className="modal-actions">
          <Button onClick={onClose} width="fit-content">
            Cancelar
          </Button>
          <Button onClick={onConfirm} danger width="fit-content">
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
