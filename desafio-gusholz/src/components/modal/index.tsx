import React, { useState } from 'react';
import styles from './modal.module.css';

interface ModalProps {
  message: string;
  onClose: () => void;
  onConfirm?: (inputValue?: string) => void; // Optional callback for confirm action
  withInput?: boolean; // Show input field
  confirmText?: string; // Text for confirm button
  cancelText?: string; // Text for cancel button
}

const Modal: React.FC<ModalProps> = ({
  message,
  onClose,
  onConfirm,
  withInput = false,
  confirmText = "OK",
  cancelText = "Cancel"
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(withInput ? inputValue : undefined); // Pass inputValue only if there's an input field
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>

        {withInput && (
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value..."
              className={styles.inputField}
            />
          </div>
        )}

        <div className={styles.buttonContainer}>
          {withInput ? (
            <>
              <button onClick={onClose} className={styles.cancelButton}>
                {cancelText}
              </button>
              <button onClick={handleConfirm} className={styles.okButton}>
                {confirmText}
              </button>
            </>
          ) : (
            <button onClick={onClose} className={styles.closeButton}>
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
