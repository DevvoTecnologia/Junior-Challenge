import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import human from "../../assets/human.webp"
import sauron from "../../assets/sauron.webp"
import dwarf from "../../assets/dwarf.jpg"
import elf from "../../assets/elf.jpg"
import { Input } from '@nextui-org/input';
import { Avatar } from '@nextui-org/avatar';
import FeedbackMessage from '../../components/Atention';
import { getRing } from './_request';

type TForjador = "Anão" | "Elfo" | "Humano" | "Sauron"
type TForm = {
  id?: number;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: TForjador;
  imagem: File | undefined;
}
type TForjadores = {
  nome: TForjador;
  pos: string;
  delay: string;
  img: string;
  cor: string;
}

type TRes = {
    type: 'success' | 'error' | 'warning';
    message: any;
}

const RingForm: React.FC = (props: any) => {
  const { id } = useParams<{ id?: string }>();
  const [formData, setFormData] = useState<TForm>({} as TForm);
  const [formType, setFormType] = useState<"update" | "insert">("insert");
  const [res, setRes] = useState<TRes>({} as TRes);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const forjadores: TForjadores[] = [
    {
      nome: "Anão",
      pos: "md:top-40 md:left-[-100px]",
      delay: "100ms",
      img: dwarf,
      cor: "#432818"
    },
    {
      nome: "Elfo",
      pos: "md:top-80 md:left-[-100px]",
      delay: "200ms",
      img: elf,
      cor: "#fff"
    },
    {
      nome: "Humano",
      pos: "md:top-40 md:right-[-100px]",
      delay: "300ms",
      img: human,
      cor: "rgba(230,176,67,1)"
    },
    {
      nome: "Sauron",
      pos: "md:top-80 md:right-[-100px]",
      delay: "400ms",
      img: sauron,
      cor: "#c1121f"
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      let res = await getRing(Number(id));
      res = res.anel
      setFormData({
        id: res.id,
        nome: res.nome,
        imagem: undefined,
        poder: res.poder,
        portador: res.portador.nome,
        forjadoPor: res.forjadoPor
      })
    }
    if (id) {
      setFormType("update")
      fetch()
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('nome', formData.nome);
    formDataToSend.append('poder', formData.poder);
    formDataToSend.append('portador', formData.portador);
    formDataToSend.append('forjadoPor', formData.forjadoPor);
  
    if (formData.imagem) {
      formDataToSend.append('imagem', formData.imagem);
    }
  
    try {
      let response = null;
      
      setIsLoading(true);
      if (formType === "insert") {
        response = await fetch('http://localhost:5000/api/rings', {
          method: 'POST',
          body: formDataToSend,
        });
      } else {
        response = await fetch(`http://localhost:5000/api/rings/${id}`, {
          method: 'PUT',
          body: formDataToSend,
        });
      }
      setIsLoading(false);
  
      if (response.ok) {
        const result = await response.json();
        setRes({
          message: formType === "insert" ? "Anel Criado com Sucesso!!" : "Anel Atualizado com Sucesso!!",
          type: "success"
        });
        formType === "insert" && setFormData({
          forjadoPor: "" as TForjador,
          imagem: undefined,
          nome: "",
          poder: "",
          portador: "",
        })
      } else {
        const result = await response.json();
        setRes({
          type: "error",
          message: result.error || "Erro ao processar a requisição"
        });
        console.log("Erro ao enviar os dados:", result);
      }
    } catch (error) {
      setRes({
        type: "error",
        message: "Erro na comunicação com o servidor"
      });
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForjadorChange = (value: TForjador) => {
    setFormData({ ...formData, forjadoPor: value });
  };

  const inputConf = {
    label: "!text-[#f4e5c3]",
    input: [
      "bg-red",
      "text-[#f4e5c3]",
      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
      "!text-white"
    ],
    innerWrapper: "bg-red",
    inputWrapper: [
      "shadow-xl",
      "backdrop-blur-sm",
      "group-data-[focus=true]/input:!bg-[#795649]/95",
      "!cursor-text",
      "!bg-[#795649]/90",
      "hover:!bg-[#795649]/95",
      "!text-white",
      "border-2",
      "border-[#c0a080]",
    ],
  }

  const goToList = () => navigate("/aneis")

  return (
    <>
      <div className={`flex items-center flex-col h-screen items-center justify-center gap-8`}>
        <button onClick={goToList} className="w-60 bg-[#8B4513] text-white py-2 px-4 rounded-lg shadow-md border-b-4 border-[#5D3412] hover:bg-[#A0522D] hover:border-[#6F3F1B] active:bg-[#5D3412] active:border-[#3A1F0E] transition-all duration-200 ease-in-out">
          Aneis
        </button>
        <form className="flex flex-col gap-3 max-w-[360px] mx-auto relative " onSubmit={handleSubmit}>
          <h1 className="text-4xl text-[#e0cda9] shad m-auto mb-3 text-center" style={{ textShadow: "2px 2px 4px rgba(0,0,0,05)" }}>Os Anéis do Poder</h1>
          <Input classNames={inputConf} onChange={handleInputChange} required value={formData.nome} type="text" label="Nome" name="nome" />
          <Input classNames={inputConf} onChange={handleInputChange} required value={formData.poder} type="text" label="Poder" name="poder" />
          <Input classNames={inputConf} onChange={handleInputChange} required value={formData.portador} type="text" label="Portador" name="portador" />
          <Input classNames={inputConf} readOnly onChange={handleInputChange} required value={formData.forjadoPor} type="text" label="Forjado por" name="forjadoPor" />
          <Input 
            classNames={inputConf}
            onChange={(e) => {
              const file = e.target.files?.[0];
              setFormData({ ...formData, imagem: file });
            }}
            required={formType === "insert"}
            type="file"
            name="imagem"
            accept='image/png, image/jpeg, image/jpg'
          />
          <div className='flex md:mt-0 mt-2 justify-between'>
            {
              forjadores.map((item) => (
                <Avatar
                  onClick={() => handleForjadorChange(item.nome)}
                  className={`md:absolute ${item.pos} cursor-pointer animate-bounce transition-all`}
                  style={{ animationDelay: item.delay, boxShadow: formData.forjadoPor === item.nome ? `0px 0px 19px 7px ${item.cor}` : "none" }}
                  src={item.img}
                  size="lg"
                />
              ))
            }

          </div>
          {
            isLoading ?
              <button disabled={isLoading} className="medieval-button mt-4" type="submit">...</button>: 
              <button disabled={isLoading} className="medieval-button mt-4" type="submit">{formType === "insert" ? "Criar Anel" : "Atualizar Anel"}</button>

          }
        </form>
        {
          res.message &&
        <FeedbackMessage message={res.message} type={res.type} />
        }

      </div>
    </>
  );
};

export default RingForm;
