import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';

import { IRing } from '../../../@types/IRing';
import { useRing } from '../../../hooks/useRing';

import styles from '../styles.module.css'

interface IModalProps extends ModalProps {
  type: "edit" | "delete";
  item: IRing;
  onClose: () => void;
}

export const ModalComponent: React.FC<IModalProps> = ({ item, type, onClose, ...rest }: IModalProps) => {
  const { handleEditRing, handleDeleteRing } = useRing();
  const { register, handleSubmit } = useForm<IRing>({
    defaultValues: {
      id: item.id,
      name: item.name,
      carrier: item.carrier,
      forged: item.forged,
      power: item.power,
    },
  });

  const onSubmit: SubmitHandler<IRing> = (data) => {
    onClose();

    setTimeout(() => {
      handleEditRing(data);
    }, 500);
  };

  return (
    <Modal type={type} {...rest}>
      <ToastContainer />
      <Modal.Header closeButton>
        <Modal.Title>
          {type === "edit"
            ? `Editar Anel`
            : `Deletar Anel`
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === "edit" ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.infoContainer}>
              <p className={styles.editModalDetails}>
                <small>Nome</small>
                <strong>{item.name}</strong>
              </p>
              <p className={styles.editModalDetails}>
                <small>Poder</small>
                <strong>{item.power}</strong>
              </p>
              <p className={styles.editModalDetails}>
                <small>Portador</small>
                <strong>{item.carrier}</strong>
              </p>
              <p className={styles.editModalDetails}>
                <small>Forjado por</small>
                <strong>{item.forged}</strong>
              </p>
            </div>
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
              <input type="hidden" {...register("id")} />
            </div>
            <Modal.Footer>
              <Button variant="btn btn-outline-dark" onClick={onClose}>
                Fechar
              </Button>
              <Button type="submit" variant="secondary">
                Editar
              </Button>
            </Modal.Footer>
          </form>
        ) : (
          <p>{`Tem certeza que quer deletar ${item.name}?`}</p>
        )}
      </Modal.Body>
      {type === "delete" && (
        <Modal.Footer>
          <Button variant="btn btn-outline-dark" onClick={onClose}>
            Fechar
          </Button>
          <Button type="button" variant="danger" onClick={() => {
            onClose();
            setTimeout(() => {
              handleDeleteRing(item.id);
            }, 500);
          }}>
            Deletar
          </Button>
        </Modal.Footer>
      )
      }
    </Modal >
  )
}
