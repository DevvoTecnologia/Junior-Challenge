import { IconEdit, IconEraser } from "@tabler/icons-react";
import { FC } from "react";
import { Button } from "../Button";

export type CardProps = {
  name: string;
  power: string;
  holder: string;
  forgedBy: string;
  image: string;
  onDelete?: () => void;
  onEdit?: () => void;
};

export const Card: FC<CardProps> = ({
  name,
  power,
  holder,
  forgedBy,
  image,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="w-full h-full rounded-lg border border-gray-700 bg-gray-800 overflow-hidden text-white">
      <img src={image} alt={name} className="h-40 object-cover w-full" />

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{name}</h2>
        <h4>
          <strong>Poder: </strong>
          {power}
        </h4>

        <div className="flex justify-between items-center h-1/3">
          <p>
            <strong>Portador: </strong>
            {holder}
          </p>
          <p>
            <strong>Forjado por: </strong>
            {forgedBy}
          </p>
        </div>

        <div className="flex justify-between items-center gap-4">
          <Button variant="ghost" className="w-full" onClick={onEdit}>
            <IconEdit /> Editar
          </Button>
          <Button variant="ghost" className="w-full" onClick={onDelete}>
            <IconEraser /> Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};
