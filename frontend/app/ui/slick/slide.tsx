'use client';

import { useState } from 'react';
import { deleteRing } from '../../actions/deleteRing';
import { Ring } from '../../lib/definitions';
import styles from './slide.module.css';

export default function Slide({ ring }: { ring: Ring }) {
  const handleDeleteRing = deleteRing.bind(null, ring.id);
  const [isDeleting, setIsDeleting] = useState(false);

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
      <div role="group">
        <button>Editar</button>
        <button
          onClick={async () => {
            setIsDeleting(true);
            await handleDeleteRing();
            setIsDeleting(false);
          }}
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
