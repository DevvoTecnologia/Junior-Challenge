import { ResponseRing } from '../../types/resposneRing';

import './styles.css';

interface CardProps {
  ringData: ResponseRing;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function Card({ ringData, onEdit, onDelete }: CardProps) {
  return (
    <div className="card" style={{ backgroundImage: `url(${ringData.image})` }}>
      <div className="card-info">
        <h3>{ringData.name}</h3>
        <p className="info">
          <img className="icon" src="/icons/bolt-icon.svg" alt="Poder" />
          {ringData.power}
        </p>
        <p className="info">
          <img
            className="icon"
            src="/icons/hammer-icon.svg"
            alt="Forjado por"
          />
          {ringData.forgedBy}
        </p>
        <p className="info">
          <img className="icon" src="/icons/user-icon.svg" alt="Dono" />
          {ringData.owner}
        </p>
        <div className="card-buttons">
          <button
            className="card-button edit"
            onClick={() => onEdit(ringData.id)}
          >
            Editar
          </button>
          <button
            className="card-button delete"
            onClick={() => onDelete(ringData.id)}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
