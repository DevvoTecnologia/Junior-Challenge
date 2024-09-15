import { FaEdit, FaTrash } from "react-icons/fa";
import {
  CardImage,
  CardInfo,
  ContainerButtons,
  ContainerCardHover,
  Button,
} from "./styles";

interface ICard {
  id: number;
  name: string;
  power: string;
  carrier: string;
  forgedBy: string;
  image_url?: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Card = ({
  id,
  carrier,
  forgedBy,
  image_url,
  name,
  power,
  onEdit,
  onDelete,
}: ICard) => {
  return (
    <ContainerCardHover>
      <CardImage>
        <img src={image_url} alt={name} />
      </CardImage>

      <CardInfo>
        <h1>Nome do Anel: {name}</h1>
        <p>
          <b>Poder: {power}</b>
        </p>
        <p>Portador: {carrier}</p>
        <p>Forjado Por: {forgedBy}</p>
      </CardInfo>

      <ContainerButtons>
        <Button
          bgColor="#007bff"
          hoverColor="#0056b3"
          onClick={() => onEdit(id)}
        >
          <FaEdit /> Editar
        </Button>
        <Button
          bgColor="#dc3545"
          hoverColor="#c82333"
          onClick={() => onDelete(id)}
        >
          <FaTrash /> Excluir
        </Button>
      </ContainerButtons>
    </ContainerCardHover>
  );
};

export default Card;
