import { FormEvent, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import styles from './create-new-ring-modal.module.css';

interface CreateNewRingModalProps {
  isOpen: boolean;
  toggleModal: () => void;
}

export function CreateNewRingModal({ isOpen, toggleModal }: CreateNewRingModalProps) {
  const [name, setName] = useState('');
  const [power, setPower] = useState('');
  const [bearer, setBearer] = useState('');
  const [forgedBy, setForgedBy] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = {
      name: name,
      power: power,
      bearer: bearer,
      forgedBy: forgedBy,
      image: image,
    };

    try {
      const response = await fetch('http://localhost:3000/rings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      });
  
      if (response.status === 201) {
        alert('Anel forjado com sucesso');
        
        toggleModal();
      } else {
        alert((await response.json()).message);
      }
    } catch (error) {
      console.error(error);
      alert('Algo deu errado, tente mais tarde');
      toggleModal();
    }
  }

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger asChild>
        <button
          className={`${styles.Button}`}
          onClick={toggleModal}
        >
          FORJAR NOVO ANEL DE PODER
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        
        <Dialog.Content className={styles.Content}>
          <Dialog.Close asChild>
            <button
              className={styles.IconButton} aria-label="Close"
              onClick={toggleModal}
            >
              X
            </button>
          </Dialog.Close>
          
          <form
            className={styles.ContainerForm}
            onSubmit={(event) => handleSubmit(event)}
          >
            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="name">
                Nome do Anel de Poder
              </label>
              <input
                className={styles.Input}
                id="name"
                name='name'
                type='text'
                placeholder="Ex: Anel de Sauron"
                required
                onChange={(event) => setName(event.target.value)}
              />
            </fieldset>
            
            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="power">
                Poder
              </label>
              <input
                className={styles.Input}
                id="power"
                name='power'
                type='text'
                placeholder="Ex: Invisibilidade, Controle"
                required
                onChange={(event) => setPower(event.target.value)}
              />
            </fieldset>

            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="bearer">
                Portador
              </label>
              <input
                className={styles.Input}
                id="bearer"
                name='bearer'
                type='text'
                placeholder="Ex: Sauron"
                required
                onChange={(event) => setBearer(event.target.value)}
              />
            </fieldset>

            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="forgedBy">
                Forjador por
              </label>

              <select
                className={styles.Input}
                id='forgedBy'
                required
                onChange={(event) => setForgedBy(event.target.value)}
              >
                <option value=''>Selecionar</option>
                <option value='ELVES'>Elfos</option>
                <option value='DWARVES'>Anões</option>
                <option value='MEN'>Homens</option>
                <option value='SAURON'>Sauron</option>
              </select>
            </fieldset>

            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="image">
                Imagem do Anel de Poder (URL)
              </label>
              <input
                className={styles.Input}
                id="image"
                name='image'
                type='url'
                placeholder="https://"
                required
                onChange={(event) => setImage(event.target.value)}
              />
            </fieldset>

            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
              <Dialog.Close asChild>
                <button
                  type='submit'
                  className={`${styles.Button} green`}
                >
                  FORJAR
                </button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>

      </Dialog.Portal>
    </Dialog.Root>
  );
}
