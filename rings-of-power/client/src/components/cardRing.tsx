import styled from "styled-components";
import ringImg from "../assets/ring.webp";
import { FC, useState } from "react";
import { Ring } from "../Providers/Ring";
import { SiCurseforge } from "react-icons/si";
import { BsTrash3Fill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { LiaRingSolid } from "react-icons/lia";
import { GiOverlordHelm } from "react-icons/gi";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: all;
`;

const ModalContainer = styled.div`
  background: var(--light);
  padding: 2em;
  border-radius: 0.5em;
  text-align: center;
  width: 300px;

  > h3 {
    margin-bottom: 1em;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    margin-top: 1em;

    > button {
      cursor: pointer;
      padding: 0.5em 1em;
      border-radius: 0.5em;
      border: 1px solid var(--green-dark);
      background: var(--green-dark);
      color: var(--light);
      font-size: 1em;

      &:hover {
        background: var(--light);
        color: var(--green-dark);
      }
    }
  }
`;
const Container = styled.div<{ isModalOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: auto;
  max-width: 30em;
  max-height: 25em;
  height: auto;
  border: solid 1px var(--green-dark);
  border-radius: 0.5em;
  padding: 0.5em;
  transition: transform 0.3s;
  box-shadow: 0 0.5px 4px var(--green-dark);
  background-color: var(--black);
  justify-content: center;

  &:hover {
    transform: ${({ isModalOpen }) => (isModalOpen ? "none" : "scale(1.05)")};
  }

  .img-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
    width: 100%;
    color: var(--green-dark);
    > img {
      width: 20em;
      height: 10em;
      object-fit: cover;

      border-radius: 0.5em;
    }
  }

  .info-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
    width: 100%;
    color: var(--green-dark);

    > p {
      display: flex;
      flex-direction: row;
      gap: 0.2em;
    }
  }
  .edit-ring-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1em;
    width: 100%;
    color: var(--green-dark);
    > button {
      cursor: pointer;
      color: var(--green-dark);
      background: transparent;
      border: 1px solid var(--green-dark);
      border-radius: 0.5em;
      font-size: 1.2em;
      width: 3em;
      height: 2em;
      align-self: center;
      transition: all 0.4s ease-in-out;

      &:hover {
        background: var(--green-dark);
        color: var(--black);
      }
    }
  }
`;

export const CardRing: FC<{ data: Ring; loadRings(): void }> = ({
  data,
  loadRings,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const deleteRing = async (id: number): Promise<void> => {
    try {
      await api
        .delete(`/ring/${id}`)
        .then((response) => {
          loadRings();
        })
        .catch((error) => console.error({ error }));

      console.log("Anel deletado com sucesso");
      setShowModal(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Erro ao deletar o anel";
      console.error(errorMessage);
    }
  };

  return (
    <Container isModalOpen={showModal}>
      <div className="img-box">
        <img src={data.imagem} alt="ring" />
        <p>
          <b>{data.nome}</b>
        </p>
      </div>
      <div className="info-box">
        <p>
          <LiaRingSolid />
          <b>Poder:</b> {data.poder}
        </p>
        <p>
          <GiOverlordHelm />
          <b>Portador:</b> {data.portador}
        </p>
        <p>
          <SiCurseforge />
          <b>Forjador:</b> {data.forjadoPor}
        </p>
      </div>
      <div className="edit-ring-box">
        <button onClick={() => setShowModal(true)}>
          <BsTrash3Fill />
        </button>
        <button onClick={() => navigate(`/edit/${data.id}`)}>
          <FaRegEdit />
        </button>
      </div>
      {showModal && (
        <ModalBackground>
          <ModalContainer>
            <h3>Tem certeza que deseja deletar este anel?</h3>
            <div className="modal-buttons">
              <button onClick={() => deleteRing(data.id)}>Sim</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </ModalContainer>
        </ModalBackground>
      )}
    </Container>
  );
};
