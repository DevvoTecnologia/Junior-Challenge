import { FiTrash, FiEdit } from "react-icons/fi";
import { api } from "./service/api";
import { useEffect, useState, useRef, FormEvent } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AxiosResponse } from "axios";


interface RingsProps {
  _id: string;
  ringName: string;
  powerName: string;
  ownerName: string;
  builtBy: string;
  imageUrl?: string;
}

export default function App() {
  const [rings, setRings] = useState<RingsProps[]>([]);
  const [editingRing, setEditingRing] = useState<RingsProps | null>(null);
  const ringRef = useRef<HTMLInputElement | null>(null);
  const powerRef = useRef<HTMLInputElement | null>(null);
  const ownerRef = useRef<HTMLInputElement | null>(null);
  const builtRef = useRef<HTMLInputElement | null>(null);
  const imageUrlRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadRings();
  }, []);

  async function loadRings() {
    try {
      const response = await api.get("/rings");
      setRings(response.data);
    } catch (error) {
      console.error("Erro ao carregar anéis:", error);
    }
  }


  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
  
    const payload = {
      ringName: ringRef.current?.value.trim() || "",
      powerName: powerRef.current?.value.trim() || "",
      ownerName: ownerRef.current?.value.trim() || "",
      builtBy: builtRef.current?.value.trim() || "",
      imageUrl: imageUrlRef.current?.value || "" 
    };
  

    if (!payload.ringName || !payload.powerName || !payload.ownerName || !payload.builtBy) {
      alert("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }
  
    try {
      let response: AxiosResponse<any, any>;
      if (editingRing) {
        response = await api.put(`/rings/${editingRing._id}`, payload);
        const updatedRings = rings.map((ring) =>
          ring._id === editingRing._id ? response.data : ring
        );
        setRings(updatedRings);
        setEditingRing(null);
      } else {
        response = await api.post("/rings", payload);
        setRings((allRings) => [...allRings, response.data]);
      }
      console.log('Resposta recebida:', response);
    } catch (error) {
      if (error.response) {
        console.error("Erro ao salvar anel:", error.response.data);
        alert(`O limite de anéis por ${payload.builtBy} foi atingido`);
      } else {
        // Outros erros
        console.error("Erro desconhecido:", error);
        alert(`Erro desconhecido: ${error.message}`);
      }
    }
  
    if (ringRef.current) ringRef.current.value = "";
    if (powerRef.current) powerRef.current.value = "";
    if (ownerRef.current) ownerRef.current.value = "";
    if (builtRef.current) builtRef.current.value = "";
    if (imageUrlRef.current) imageUrlRef.current.value = "";
  }
  

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/rings/${id}`);
      console.log('Ring deleted:', response.data);
      setRings(rings.filter((ring) => ring._id !== id));
    } catch (error) {
      console.error('Error in deleteRing:', error);
    }
  };

  function handleEdit(ring: RingsProps) {
    setEditingRing(ring);
    ringRef.current!.value = ring.ringName;
    powerRef.current!.value = ring.powerName;
    ownerRef.current!.value = ring.ownerName;
    builtRef.current!.value = ring.builtBy;
  }

  const sliderSettings = {
    dots: true,
    infinite: rings.length > 1,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Anéis</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome do anel:</label>
          <input
            type="text"
            placeholder="Nome do anel"
            className="w-full mb-5 p-2 rounded"
            ref={ringRef}
          />

          <label className="font-medium text-white">Poder do anel:</label>
          <input
            type="text"
            placeholder="Poder do anel"
            className="w-full mb-5 p-2 rounded"
            ref={powerRef}
          />

          <label className="font-medium text-white">Portador do anel:</label>
          <input
            type="text"
            placeholder="Portador"
            className="w-full mb-5 p-2 rounded"
            ref={ownerRef}
          />

          <label className="font-medium text-white">Forjado por:</label>
          <input
            type="text"
            placeholder="Forjado por"
            className="w-full mb-5 p-2 rounded"
            ref={builtRef}
          />

          <input
            type="submit"
            value={editingRing ? "Atualizar Anel" : "Forjar Anel"}
            className="cursor-pointer w-full p-2 rounded bg-green-500 text-white"
          />
        </form>

        <section className="relative">
          <Slider {...sliderSettings} className="carousel-container">
            {rings.map((item) => (
              <div
                key={item._id}
                className="p-4 bg-white rounded-lg shadow-lg"
              >
                <img
                  src={item.imageUrl} 
                  alt={item.ringName}
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <p>
                  <span className="font-medium">Nome do Anel: </span>
                  {item.ringName}
                </p>
                <p>
                  <span className="font-medium">Poder do Anel: </span>
                  {item.powerName}
                </p>
                <p>
                  <span className="font-medium">Portador do anel: </span>
                  {item.ownerName}
                </p>
                <p>
                  <span className="font-medium">Forjado por: </span>
                  {item.builtBy}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-red-500 w-8 h-8 flex items-center justify-center rounded-full text-white"
                    onClick={() => handleDelete(item._id)}
                  >
                    <FiTrash size={18} />
                  </button>
                  <button
                    className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-full text-white"
                    onClick={() => handleEdit(item)}
                  >
                    <FiEdit size={18} />
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      </main>
    </div>
  );
}
