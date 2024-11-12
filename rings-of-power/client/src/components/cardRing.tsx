import styled from "styled-components";
import ringImg from "../assets/ring.webp";
import { FC } from "react";
import { Ring } from "../Providers/Ring";
import { SiCurseforge } from "react-icons/si";
import { BsTrash3Fill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { LiaRingSolid } from "react-icons/lia";
import { GiOverlordHelm } from "react-icons/gi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: auto;
  max-width: 30em;
  max-height: 30em;
  height: auto;
  border: solid 1px var(--green-dark);
  border-radius: 0.5em;
  padding: 0.5em;
  transition: transform 0.3s;
  box-shadow: 0 0.5px 4px var(--green-dark);
  &:hover {
    transform: scale(1.05);
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

export const CardRing: FC<{ data: Ring }> = ({ data }) => {
  return (
    <Container>
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
        <button>
          <BsTrash3Fill />
        </button>
        <button>
          <FaRegEdit />
        </button>
      </div>
    </Container>
  );
};
