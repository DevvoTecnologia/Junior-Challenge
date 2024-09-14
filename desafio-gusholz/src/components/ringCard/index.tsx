"use client";
import NextImage from "next/image";
import styles from "./ringCard.module.css";
import { useState } from "react";
import Modal from "../modal";

const iconsSize = 20;

export default function RingCard(props: {
  id: number;
  nome: string;
  forjadoPor: string;
  imagem: string;
  poder: string;
  portador: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    nome: props.nome,
    poder: props.poder,
    portador: props.portador,
    forjadoPor: props.forjadoPor,
  });

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

  const handleEditButtonClick = () => {
    if (isEditing) {
      handleSaveButtonClick(); // Save changes if already in editing mode
    } else {
      setIsEditing(true); // Enter editing mode
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveButtonClick = async () => {
    try {
      const url = `/api/${props.id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editValues),
      });

      if (response.ok) {
        setIsEditing(false);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        console.error("Failed to update:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <>
      {showModal && (
        <Modal
          message="Anel deletado com sucesso!"
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
      <div className={styles.ringCard}>
        <div className={styles.imagesContainer}>
          <NextImage
            src={props.imagem}
            alt={`Anel ${props.nome}`}
            width={300}
            height={300}
          />
          <div className={styles.iconContainer}>
            <NextImage
              src={"/static/images/delete-button.png"}
              alt={`Delete icon`}
              width={30}
              height={30}
              className={styles.icon}
              onClick={() => handleDeleteButtonClick(props.id)}
            />
            <NextImage
              src={"/static/images/edit-button.png"}
              alt={`Edit icon`}
              width={iconsSize}
              height={iconsSize}
              className={styles.icon}
              onClick={handleEditButtonClick}
            />
          </div>
        </div>
        <div className={styles.container}>
          <h1>
            {isEditing ? (
              <input
                type="text"
                name="nome"
                value={editValues.nome}
                onChange={handleInputChange}
                className={styles.input}
              />
            ) : (
              `"${props.nome}"`
            )}
          </h1>
        </div>
        <div className={styles.container}>
          <h2 className={styles.label}>Poder:</h2>
          <div className={styles.labelContainer}>
            {isEditing ? (
              <input
                type="text"
                name="poder"
                value={editValues.poder}
                onChange={handleInputChange}
                className={styles.input}
              />
            ) : (
              <p className={styles.text}>{props.poder}</p>
            )}
          </div>
        </div>
        <div className={styles.container}>
          <h2 className={styles.label}>Pertence a:</h2>
          <div className={styles.labelContainer}>
            {isEditing ? (
              <input
                type="text"
                name="portador"
                value={editValues.portador}
                onChange={handleInputChange}
                className={styles.input}
              />
            ) : (
              <p className={styles.text}>{props.portador}</p>
            )}
          </div>
        </div>
        <div className={styles.container}>
          <h2 className={styles.label}>Feito por:</h2>
          <div className={styles.labelContainer}>
            {isEditing ? (
              <input
                type="text"
                name="forjadoPor"
                value={editValues.forjadoPor}
                onChange={handleInputChange}
                className={styles.input}
              />
            ) : (
              <p className={styles.text}>{props.forjadoPor}</p>
            )}
          </div>
        </div>
        {isEditing && (
          <div className={styles.saveButtonContainer}>
            <button
              onClick={handleSaveButtonClick}
              className={styles.saveButton}
            >
              Salvar Modificações
            </button>
          </div>
        )}
      </div>
    </>
  );
}
