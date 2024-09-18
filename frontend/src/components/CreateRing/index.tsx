import Modal from "react-bootstrap/Modal";
import { Button } from 'react-bootstrap';
import { ToastContainer } from "react-toastify";
import { IRing } from "../../@types/IRing";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRing } from "../../hooks/useRing";

import styles from './styles.module.css';
import { useState } from "react";

export function CreateRing() {
  const [show, setShow] = useState(false);

  const { handleCreateRing } = useRing();
  const { register, handleSubmit } = useForm<IRing>({
    defaultValues: {
      name: "",
      carrier: "",
      forged: "",
      power: "",
      image: "",
      createdAt: new Date().toISOString(),
    },
  });

  const onClose = () => setShow(false)

  const onSubmit: SubmitHandler<IRing> = (data) => {
    onClose();
    setTimeout(() => {
      handleCreateRing(data);
    }, 500);
  };

  return (
    <div>
      <Button
        type="button"
        className={`btn btn-dark ${styles.buttonCreateRing}`}
        onClick={() => setShow(true)}
      >
        Novo Anel
      </Button>

      <Modal show={show}>
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>
            Novo Anel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.editableFieldContent}>
              <label htmlFor="name">
                Nome do anel:
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: true })}
                />
              </label>
              <label htmlFor="power">
                Poder do anel:
                <input
                  id="power"
                  type="text"
                  {...register("power", { required: true })}
                />
              </label>
              <label htmlFor="carrier">
                Nome do portador:
                <input
                  id="carrier"
                  type="text"
                  {...register("carrier", { required: true })}
                />
              </label>
              <label htmlFor="forged">
                Quem forjou o anel:
                <input
                  id="forged"
                  type="text"
                  {...register("forged", { required: true })}
                />
              </label>
              <label htmlFor="image">
                Link da imagem:
                <input
                  id="image"
                  type="text"
                  {...register("image", { required: true })}
                />
              </label>
            </div>
            <Modal.Footer>
              <Button variant="btn btn-outline-dark" onClick={onClose}>
                Fechar
              </Button>
              <Button type="submit" variant="secondary">
                Criar
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}