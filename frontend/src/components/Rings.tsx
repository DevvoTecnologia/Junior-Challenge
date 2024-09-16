import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApi } from "../hooks/useApi";
import Slider from "react-slick";
import { RingForm } from "./RingForm";
import { Ring } from "../types/Rings";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Rings() {
  const [rings, setRings] = useState<Ring[]>([]);
  const api = useApi();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getRings = async () => {
    try {
      const response = await api.listRings();
      setRings(response);
    } catch (error) {
      toast.error('Erro ao carregar anéis');
    }
  };

  useEffect(() => {
    getRings();
  }, []);

  return (
    <div className="w-full md:w-2/3 mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg">
      <h2 className="text-center text-3xl font-bold text-yellow-500 mb-6">Anéis do Poder</h2>
      <Slider {...settings}>
        {rings.map((ring) => (
          <div key={ring._id} className="bg-gray-800 text-white rounded-xl shadow-md mb-10 overflow-hidden">
            {/* Container da Imagem */}
            <div className="h-64 bg-gradient-to-b from-gray-900 to-black flex justify-center items-center">
              <img 
                src={ring.image || 'default-image-path.jpg'} 
                className="h-44 w-44 rounded-full border-4 border-yellow-500 shadow-md"
                alt={ring.ringname}
              />
            </div>
            
            {/* Informações do Anel */}
            <div className="flex flex-col items-center justify-center gap-4 p-6">
              <h3 className="text-xl font-semibold text-yellow-400">{ring.ringname}</h3>
              <p className="text-center text-gray-300 mb-4">{ring.description}</p>

              {/* Formulário de Atualização */}
              <div className="w-full">
                <RingForm ring={ring} onSave={() => getRings()} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
