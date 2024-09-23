import { FC, useEffect, useState } from "react";
import { Ring } from "../../App";
import { Button } from "../Button";
import { SelectField } from "../SelectField";
import { TextField } from "../TextField";

const options = [
  { value: "Elves", label: "Elves" },
  { value: "Dwarves", label: "Dwarves" },
  { value: "Men", label: "Men" },
  { value: "Sauron", label: "Sauron" },
];

export type FormProps = {
  initialValues?: Ring | null;
  handleSubmit?: (e: React.FormEvent) => void;
  onDataChange?: (data: Ring) => void;
  loading?: boolean;
};

export const Form: FC<FormProps> = ({
  initialValues,
  handleSubmit,
  onDataChange,
  loading,
}) => {
  const [data, setData] = useState<Ring>(
    initialValues || {
      _id: "",
      name: "",
      power: "",
      holder: "",
      forgedBy: "",
      image: "",
    }
  );

  useEffect(() => {
    if (initialValues) {
      setData(initialValues);
    }

    return () => {
      setData({
        _id: "",
        name: "",
        power: "",
        holder: "",
        forgedBy: "",
        image: "",
      });
    };
  }, [initialValues]);

  useEffect(() => {
    if (onDataChange) {
      onDataChange(data);
    }
  }, [data, onDataChange]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="name"
        placeholder="Nome"
        label="Nome"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      <TextField
        type="text"
        name="power"
        placeholder="Poder"
        label="Poder"
        value={data.power}
        onChange={(e) => setData({ ...data, power: e.target.value })}
      />
      <TextField
        type="text"
        name="holder"
        placeholder="Portador"
        label="Portador"
        value={data.holder}
        onChange={(e) => setData({ ...data, holder: e.target.value })}
      />
      <SelectField
        name="forgedBy"
        label="Forjado por"
        value={data.forgedBy}
        onChange={(e) => setData({ ...data, forgedBy: e.target.value })}
        options={options}
      />
      <TextField
        type="text"
        name="image"
        placeholder="Link da imagem"
        label="Imagem"
        value={data.image}
        onChange={(e) => setData({ ...data, image: e.target.value })}
      />

      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
};
