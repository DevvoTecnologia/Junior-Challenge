"use client";
import NextImage from "next/image";
import styles from "./ringCard.module.css";
import { useState } from "react";
import Modal from "../modal";

const iconsSize = 35;

export default function RingCard(props: {
  id: number,
  nome: string,
  forjadoPor: string,
  imagem: string,
  poder: string,
  portador: string
}) {

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteButtonClick = async (id: number) => {
    try {
      const url = `/api/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Deletado com sucesso", data);
        setShowModal(true);

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.error("Failed to delete:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className={styles.ringCard}>
      {showModal && (
        <Modal message="Anel deletado com sucesso!" onClose={handleCloseModal} />
      )}
      <div className={styles.imagesContainer}>
        <NextImage
          src={props.imagem}
          alt={`Anel ${props.nome}`}
          width={100}
          height={100}
        />
        <div className={styles.iconsContainer}>
          <NextImage
            src={"/static/images/edit-button.png"}
            alt={`Edit icon`}
            width={iconsSize}
            height={iconsSize}
            className={styles.icon}
          />
          <NextImage
            src={"/static/images/delete-button.png"}
            alt={`Edit icon`}
            width={iconsSize}
            height={iconsSize}
            className={styles.icon}
            onClick={() => { handleDeleteButtonClick(props.id) }}
          />
        </div>
      </div>
      <h1>"{props.nome}"</h1>
      <div>
        <h2>Poder: </h2>
        <span>{props.poder}</span>
      </div>
      <div>
        <h3>Pertence a:</h3>
        <span>{props.portador}</span>
      </div>
      <div>
        <h4>Feito por: </h4>
        <span>{props.forjadoPor}</span>
      </div>
    </div>
  )
}