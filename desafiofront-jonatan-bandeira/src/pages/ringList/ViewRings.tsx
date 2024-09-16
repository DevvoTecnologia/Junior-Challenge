import React, { useState, useEffect } from 'react';
import RingCarousel from '../../components/RingCarousel';
import { getRings } from './_request';
import { useNavigate } from 'react-router-dom';

export type TAnel = {
  id: number;
  nome: string;
  poder: string;
  forjadoPor: string;
  imagem: string;
  portador: {
    id: number;
    nome: string;
  };
  portadorId: number;
  createdAt: string;
  updatedAt: string;
};


const ViewRings: React.FC = () => {
  const [rings, setRings] = useState<TAnel[]>([]);
  const navigate = useNavigate();

  const goToList = () => navigate("/")

  useEffect(() => {
    const fetch = async () => {
      const res = await getRings()
      setRings(res.aneis)
    }
    fetch();
  }, []);

  return (
    <div className="text-center h-screen flex flex-col justify-center items-center gap-8 ">
      <button onClick={goToList} className="w-60 bg-[#8B4513] text-white py-2 px-4 rounded-lg shadow-md border-b-4 border-[#5D3412] hover:bg-[#A0522D] hover:border-[#6F3F1B] active:bg-[#5D3412] active:border-[#3A1F0E] transition-all duration-200 ease-in-out">
        Criar Anel
      </button>
      {
        rings.length === 0 ? "Loading" : <RingCarousel data={rings} />
      }
    </div>
  );
};

export default ViewRings;
