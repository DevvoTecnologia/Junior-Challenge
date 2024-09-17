import { useState } from 'react';
import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";
import { ModalComponent } from './Modal';

import { IRing } from "../../../@types/IRing";

import styles from '../styles.module.css'

interface CardProps {
  item: IRing
}

export function Card({ item }: CardProps) {
  const [show, setShow] = useState(false);
  const [type, setType] = useState<"edit" | "delete">("edit");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className={styles['section-content']}>
      <img src={item.image} alt={item.name} className={styles['ring-image']} />
      <p className={styles.details}>
        <strong>
          Nome:
        </strong>
        {item.name}
      </p>
      <p className={styles.details}>
        <strong>
          Poder:
        </strong>
        {item.power}
      </p>
      <p className={styles.details}>
        <strong>
          Portador:
        </strong>
        {item.carrier}
      </p>
      <p className={styles.details}>
        <strong>
          Forjado por:
        </strong>
        {item.forged}
      </p>

      <div className={styles.actionButtons}>
        <button
          type="button"
          onClick={() => { handleShow(); setType("edit") }}
          className={styles.editButton}
        >
          <RiEdit2Fill size={24} />
          Editar
        </button>
        <button
          type="button"
          onClick={() => { handleShow(); setType("delete") }}
          className={styles.deleteButton}
        >
          <RiDeleteBinFill size={24} />
          Deletar
        </button>
      </div>

      <ModalComponent
        type={type}
        item={item}
        show={show}
        onHide={handleClose}
        onClose={handleClose}
      />
    </section>
  );
}