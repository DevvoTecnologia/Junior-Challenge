import { FiTrash, FiEdit } from "react-icons/fi";
import { api } from "./service/api";
import { useEffect, useState, useRef, FormEvent } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface RingsProps {
  id: string;
  ringName: string;
  powerName: string;
  ownerName: string;
  builtBy: string;
  imageUrl?: string; // Campo para URL da imagem
}

export default function App() {

  const [rings, setRings] = useState<RingsProps[]>([]);
  const [editingRing, setEditingRing] = useState<RingsProps | null>(null); // Estado para edição
  const ringRef = useRef<HTMLInputElement | null>(null);
  const powerRef = useRef<HTMLInputElement | null>(null);
  const ownerRef = useRef<HTMLInputElement | null>(null);
  const builtRef = useRef<HTMLInputElement | null>(null);
  const imageUrlRef = useRef<HTMLInputElement | null>(null); // Referência para o campo da imagem

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

  if (!builtRef.current?.value) return;

  const payload = {
    ringName: ringRef.current?.value || "",
    powerName: powerRef.current?.value || "",
    ownerName: ownerRef.current?.value || "",
    builtBy: builtRef.current?.value || "",
    imageUrl: imageUrlRef.current?.value || ""
  };

  try {
    if (editingRing) {
      const response = await api.patch(`/rings/${editingRing.id}`, payload);
      const updatedRings = rings.map((ring) =>
        ring.id === editingRing.id ? response.data : ring
      );
      setRings(updatedRings);
      setEditingRing(null);
    } else {
      const response = await api.post("/rings", payload);
      setRings((allRings) => [...allRings, response.data]);
    }
  } catch (error) {
    if (error) {
      // Erro com resposta do servidor
      console.error("Erro de resposta do servidor:", error);
      alert(`Erro: ${JSON.stringify(error)}`); // Exibe a mensagem de erro
    } else if (error) {
      // Erro na solicitação
      console.error("Erro na solicitação:", error);
      alert("Erro na solicitação. Verifique sua conexão com o servidor.");
    } else {
      // Erro desconhecido
      console.error("Erro desconhecido:", error);
      alert(`Erro desconhecido: ${error}`);
    }
  }

  // Limpar os campos após o submit
  ringRef.current!.value = "";
  powerRef.current!.value = "";
  ownerRef.current!.value = "";
  builtRef.current!.value = "";
  imageUrlRef.current!.value = "";
}


  async function handleDelete(id: string) {
    try {
      await api.delete(`/rings/${id}`);
      const allRings = rings.filter((ring) => ring.id !== id);
      setRings(allRings);
    } catch (err) {
      console.log(err);
    }
  }

  function handleEdit(ring: RingsProps) {
    setEditingRing(ring);
    ringRef.current!.value = ring.ringName;
    powerRef.current!.value = ring.powerName;
    ownerRef.current!.value = ring.ownerName;
    builtRef.current!.value = ring.builtBy;
    imageUrlRef.current!.value = ring.imageUrl || ""; // Adiciona valor da URL da imagem
  }

  const sliderSettings = {
    dots: true,
    infinite: rings.length > 1,
    speed: 500,
    slidesToShow: 2, // Exibir dois slides
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Aneis</h1>

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

          <label className="font-medium text-white">URL da imagem:</label>
          <input
            type="text"
            placeholder="URL da imagem"
            className="w-full mb-5 p-2 rounded"
            ref={imageUrlRef}
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
                key={item.id}
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
                    onClick={() => handleDelete(item.id)}
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
