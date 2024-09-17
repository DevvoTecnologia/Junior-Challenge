import "./Card.css";
import { BiSolidTrashAlt, BiEdit } from "react-icons/bi";
import { useRingContext } from "../../context/RingContext";
import React from "react";
import { IconContext } from "react-icons";

type CardProps = {
  onClickFunction: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: (id: string) => Promise<void>;
  ring: {
    _id: string;
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: string;
  };
};

function Card({ onDelete, ring }: CardProps) {
  const { setEditingRingId, setShowEditOverlay } = useRingContext();

  const handleEditClick = (id: string) => {
    setEditingRingId(id);
    setShowEditOverlay(true);
  };

  return (
    <div className="ring_card">
      <div className="btn_wrapper">
        <button className="edit_btn" onClick={() => handleEditClick(ring._id)}>
          <IconContext.Provider
            value={{ color: "#d1d1d1", className: "edit_icon" }}
          >
            <BiEdit />
          </IconContext.Provider>
        </button>
        <button className="delete_btn" onClick={() => onDelete(ring._id)}>
        <IconContext.Provider
            value={{ color: "#d1d1d1", className: "delete_icon" }}
          >
          <BiSolidTrashAlt />
          </IconContext.Provider>
        </button>
      </div>

      <div className="details">
        <h4>{ring.nome}</h4>
        <p>{ring.poder}</p>
        <div className="text_wrapper">
          <p>
            <strong>Portador:</strong> {ring.portador}
          </p>
          <p>
            <strong>Forjado por:</strong> {ring.forjadoPor}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
