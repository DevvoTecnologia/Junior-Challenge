import "./Form.css";
import React, { useEffect } from "react";
import { ringAPI } from "../../api/api";
import { useRingContext } from "../../context/RingContext";

export interface CreateRingFormState {
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
}

type FormProps = {
  id: string;
  isEdit: boolean;
};

export default function Form({ id, isEdit }: FormProps) {
  const {
    setShowEditOverlay,
    setShowOverlay,
    showOverlay,
    showEditOverlay,
    setFormData,
    formData,
    fetchRings
  } = useRingContext();

  useEffect(() => {
    if (id && isEdit) {
      ringAPI
        .getRing(id)
        .then((data) => {
          setFormData({
            nome: data.nome,
            poder: data.poder,
            portador: data.portador,
            forjadoPor: data.forjadoPor,
          });
          
        })
        .catch((error) => {
          console.error(error.response?.data || error);
        });
    } else {
      setFormData({
        nome: "",
        poder: "",
        portador: "",
        forjadoPor: "",
      });
    }
  }, [id, isEdit, setFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEdit) {
      ringAPI
        .createRing(formData)
        .then(() => {
          setFormData({
            nome: "",
            poder: "",
            portador: "",
            forjadoPor: "",
          });
          setShowOverlay(!showOverlay);
          fetchRings()
          alert('Anel criado com sucesso')
        })
        .catch((error) => {
          console.error("Erro ao criar o anel:", error.response?.data || error);
        });
    } else if (isEdit) {
      ringAPI
        .updateRing(formData, id)
        .then(() => {
          setFormData({
            nome: "",
            poder: "",
            portador: "",
            forjadoPor: "",
          });
          setShowEditOverlay(!showEditOverlay);
          fetchRings()
 
        })
        .catch((error) => {
          console.error(
            "Erro ao atualizar o anel:",
            error.response?.data || error
          );
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="label_wrapper">
        <label htmlFor="nome">Nome do Anel:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className="label_wrapper">
        <label htmlFor="poder">Poder do Anel:</label>
        <input
          type="text"
          id="poder"
          name="poder"
          value={formData.poder}
          onChange={handleChange}
          required
        />
      </div>

      <div className="label_wrapper">
        <label htmlFor="portador">Portador:</label>
        <select
          name="portador"
          id="portador"
          value={formData.portador}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um portador</option>
          <option value="homem">Homem</option>
          <option value="anão">Anão</option>
          <option value="elfo">Elfo</option>
          <option value="sauron">Sauron</option>
        </select>
      </div>

      <div className="label_wrapper">
        <label htmlFor="forjadoPor">Forjado Por:</label>
        <input
          type="text"
          id="forjadoPor"
          name="forjadoPor"
          value={formData.forjadoPor}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit_btn">
        {isEdit ? "Editar" : "Criar"}
      </button>
    </form>
  );
}
