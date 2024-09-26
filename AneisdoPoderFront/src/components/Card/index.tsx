import { Pencil, CircleX, Check } from "lucide-react";
import { IAnel } from "../../interfaces/IAnel";
import React, { useRef, useState } from "react";
import {
  CardStyled,
  ContainerIconStyled,
  PictureStyled,
  TitleStyled,
} from "../../styles/CardContainer";

interface CardForm extends IAnel {
  newRing?: true | false | undefined;
  edicaoAtivada?: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
  modalMessage?: boolean;
  setModalMessage?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CustomElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  holder: HTMLInputElement;
  power: HTMLInputElement;
  forger: HTMLOptionElement;
}

export const Card = ({
  id,
  name,
  holder,
  power,
  forger,
  imgRing,
  newRing,
  edicaoAtivada,
  setErrorMessage,
  modalMessage,
  setModalMessage
}: CardForm) => {
  // const [idForm, _setIdForm] = useState(id);
  const [nameForm, setNameForm] = useState(name);
  const [holderForm, setHolderForm] = useState(holder);
  const [powerForm, setPowerForm] = useState(power);
  const [forgerForm, setForgerForm] = useState(forger);
  const [editModal, setEditModal] = useState(newRing);

  const inputRef = useRef<HTMLInputElement>(null);

  const ativarEdicao = () => {
    if (edicaoAtivada && newRing) {
      edicaoAtivada(!newRing);
    }

    setEditModal(!editModal);

    if (!editModal) {
      setTimeout(() => {
        inputRef.current?.focus(); // Usa .focus() no input
      }, 0); // Timeout para garantir que o estado seja atualizado antes do foco
    }
  };

  const handleForgerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForgerForm(e.target.value); // Atualiza o estado com o novo valor selecionado
  };

  const handleData = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget
      .elements as typeof event.currentTarget.elements & CustomElements;

    const anel = {
      name: formElements.name.value,
      power: formElements.power.value,
      holder: formElements.holder.value,
      forger: formElements.forger.value,
    };

    if (!anel) {
      return;
    }

    const URL = newRing
      ? `http://localhost:3001/aneis`
      : `http://localhost:3001/aneis/${id}`;

    const methodForm = newRing ? "POST" : "PUT";

    try {
      const response = await fetch(URL, {
        method: methodForm,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(anel),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (setErrorMessage) {
          setErrorMessage(errorData.error); // Captura a mensagem de erro
        }
        if (setModalMessage) {
          setModalMessage(!modalMessage);
        }
      } else {
        const data = await response.json();
        console.log("Anel criado com sucesso:", data);
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <>
      <CardStyled method="post" onSubmit={handleData}>
        <PictureStyled src={`./${imgRing}.webp`}></PictureStyled>
        <TitleStyled>
          <label>Nome</label>
          <input
            id="name"
            placeholder="Nome do Anel"
            value={nameForm}
            onChange={(e) => setNameForm(e.target.value)}
            disabled={!editModal}
            ref={inputRef}
            required
          />
        </TitleStyled>
        <TitleStyled>
          <label>Poder</label>
          <textarea
            id="power"
            placeholder="Poder do Anel"
            value={powerForm}
            onChange={(e) => setPowerForm(e.target.value)}
            disabled={!editModal}
            required
          />
        </TitleStyled>
        <TitleStyled>
          <label>Portador</label>
          <input
            id="holder"
            placeholder="Portador do Anel "
            value={holderForm}
            onChange={(e) => setHolderForm(e.target.value)}
            disabled={!editModal}
            required
          />
        </TitleStyled>
        <TitleStyled>
          <label>Forjador</label>
          {!editModal ? (
            <input value={forger} disabled={!editModal} />
          ) : (
            <select
              id="forger"
              value={forgerForm}
              onChange={handleForgerChange}
              disabled={!editModal}
            >
              <option value="Elfos">Elfos</option>
              <option value="Anões">Anões</option>
              <option value="Homens">Homens</option>
              <option value="Sauron">Sauron</option>
            </select>
          )}
        </TitleStyled>
        <ContainerIconStyled>
          {!editModal ? (
            <Pencil onClick={() => ativarEdicao()} size={42} strokeWidth={1} />
          ) : (
            <>
              <button type="submit">
                <Check size={42} strokeWidth={1} />
              </button>
              <button onClick={() => ativarEdicao()}>
                <CircleX size={42} strokeWidth={1} />
              </button>
            </>
          )}
          {/* <CircleX size={42} strokeWidth={1} /> */}
        </ContainerIconStyled>
      </CardStyled>
    </>
  );
};
