import { FC, useState } from "react";
import { Button } from "../Button";
import { TextField } from "../TextField";

export type Data = {
  name: string;
  power: string;
  holder: string;
  forgedBy: string;
  image: string;
};

export type FormProps = {
  initialValues?: Data;
  onFormSubmit?: (data: Data) => void;
};

export const Form: FC<FormProps> = ({ initialValues, onFormSubmit }) => {
  const [data, setData] = useState<Data>(
    initialValues || {
      name: "",
      power: "",
      holder: "",
      forgedBy: "",
      image: "",
    }
  );

  const handleInput = (field: string, value: string) => {
    setData((data) => ({
      ...data,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onFormSubmit?.(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="name"
        placeholder="Nome"
        label="Nome"
        initialValue={initialValues?.name}
        onInput={(value) => handleInput("name", value as string)}
      />
      <TextField
        type="text"
        name="power"
        placeholder="Poder"
        label="Poder"
        initialValue={initialValues?.power}
        onInput={(value) => handleInput("power", value as string)}
      />
      <TextField
        type="text"
        name="holder"
        placeholder="Portador"
        label="Portador"
        initialValue={initialValues?.holder}
        onInput={(value) => handleInput("holder", value as string)}
      />
      <TextField
        type="text"
        name="forgedBy"
        placeholder="Forjado por"
        label="Forjado por"
        initialValue={initialValues?.forgedBy}
        onInput={(value) => handleInput("forgedBy", value as string)}
      />
      <TextField
        type="text"
        name="image"
        placeholder="Imagem"
        label="Imagem"
        initialValue={initialValues?.image}
        onInput={(value) => handleInput("image", value as string)}
      />

      <Button className="w-full" type="submit">
        Criar
      </Button>
    </form>
  );
};
