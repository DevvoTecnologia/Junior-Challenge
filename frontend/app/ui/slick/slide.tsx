'use client';

import { deleteRing } from '@/app/actions/deleteRing';
import type { ExistingRing } from '@/app/lib/definitions';
import styles from '@/app/ui/slick/slide.module.css';
import { useState } from 'react';

type SlideProps = {
  ring: ExistingRing;
  handleOpenModal: (ring: ExistingRing) => void;
};

export default function Slide({ ring, handleOpenModal }: SlideProps) {
  const bindedDeleteRingAction = deleteRing.bind(null, ring.id);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteRing = async () => {
    setIsDeleting(true);
    await bindedDeleteRingAction();
  };

  return (
    <div className={styles.slide}>
      <h3>{ring.name}</h3>
      <mark>
        <p>
          <em>{ring.power}</em>
        </p>
      </mark>
      <small>
        Forjado por: <strong>{ring.forgedBy}</strong>
      </small>
      <img src={ring.image} alt={ring.name} />
      <h4>Portador: {ring.currentOwner.name}</h4>
      <div role="group">
        <button disabled={isDeleting} onClick={() => handleOpenModal(ring)}>
          Editar
        </button>
        <button
          onClick={handleDeleteRing}
          className="contrast"
          disabled={isDeleting}
          aria-busy={isDeleting}
        >
          {isDeleting ? 'Deletando...' : 'Deletar'}
        </button>
      </div>
    </div>
  );
}
