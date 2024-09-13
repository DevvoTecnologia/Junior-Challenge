// Hooks
import { ChangeEvent, useEffect, useState } from "react";
// Types
import { RingData, RingDataCreate } from "../../types/RingData";
// Utils
import { Forjador } from "../../utils/Forjador";

const imageOptions = [
  {
    label: "Os Nove Anéis",
    url: "https://static.wikia.nocookie.net/terramedia/images/f/fa/O_Anel_dos_Nove_Anéis_de_Poder.jpg",
  },
  {
    label: "Os Sete Anéis",
    url: "https://static.wikia.nocookie.net/terramedia/images/a/a6/O_Anel_dos_Sete_Anéis_de_Poder_LOTR.jpg",
  },
  {
    label: "Os Três Anéis",
    url: "https://static.wikia.nocookie.net/lotr/images/e/e0/The_Three_Rings_-_TRoP.png/",
  },
  {
    label: "O Um Anel",
    url: "https://static.wikia.nocookie.net/terramedia/images/0/00/Ring_02.png",
  },
];

interface RingFormProps {
  initialData?: RingData;
  onSubmit: (data: RingData) => void;
  onClose: () => void;
}

const RingForm = ({ initialData, onSubmit, onClose }: RingFormProps) => {
  const [formData, setFormData] = useState<RingDataCreate>({
    nome: initialData?.nome || "",
    poder: initialData?.poder || "",
    portador: initialData?.portador || "",
    forjadoPor: initialData?.forjadoPor || Forjador.ELFOS,
    imagem: initialData?.imagem || imageOptions[0].url,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData?._id) {
      onSubmit({
        ...formData,
        _id: initialData._id,
      });
    } else {
      onSubmit({
        ...formData,
        _id: null,
      });
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome,
        poder: initialData.poder,
        portador: initialData.portador,
        forjadoPor: initialData.forjadoPor,
        imagem: initialData.imagem,
      });
    }
  }, [initialData]);

  return (
    <>
      <form
        className="flex flex-col my-6 justify-center gap-1 w-3/5"
        onSubmit={handleSubmit}
      >
        <label htmlFor="nome" className="font-medium text-[#EEF0F2]">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome do anel"
          className="w-full mb-5 p-2 rounded-md"
        />
        <label htmlFor="poder" className="font-medium text-[#EEF0F2]">
          Poder
        </label>
        <textarea
          id="poder"
          name="poder"
          value={formData.poder}
          onChange={handleChange}
          placeholder="Uma breve descrição do poder do anel"
          className="w-full mb-5 p-2 rounded-md"
        />
        <label htmlFor="portador" className="font-medium text-[#EEF0F2]">
          Portador
        </label>
        <input
          type="text"
          id="portador"
          name="portador"
          value={formData.portador}
          onChange={handleChange}
          placeholder="Nome do portador ATUAL do anel"
          className="w-full mb-5 p-2 rounded-md"
        />
        <label htmlFor="forjadoPor" className="font-medium text-[#EEF0F2]">
          Forjado por:
        </label>
        <select
          id="forjadoPor"
          name="forjadoPor"
          value={formData.forjadoPor}
          onChange={handleChange}
          className="w-full mb-5 p-2 rounded-md"
        >
          {Object.values(Forjador).map((forjador) => (
            <option key={forjador} value={forjador}>
              {forjador}
            </option>
          ))}
        </select>

        <label htmlFor="imagem" className="font-medium text-[#EEF0F2]">
          Imagem do anel
        </label>
        <select
          id="imagem"
          name="imagem"
          value={formData.imagem}
          onChange={handleChange}
          className="w-full mb-5 p-2 rounded-md"
        >
          {imageOptions.map((image) => (
            <option key={image.url} value={image.url}>
              {image.label}
            </option>
          ))}
        </select>
        <div className="flex justify-center">
          <img
            src={formData.imagem}
            alt="Anel selecionado"
            width={100}
            height={100}
          />
        </div>
        <div className="flex gap-7">
          <button
            type="submit"
            className=" cursor-pointer w-full p-2 bg-green-700 rounded font-medium mt-5"
          >
            {initialData ? "Atualizar Anel" : "Criar Anel"}
          </button>
          <button
            type="button"
            className=" cursor-pointer w-full p-2 bg-[#FAFAFF] rounded font-medium mt-5"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};

export default RingForm;
