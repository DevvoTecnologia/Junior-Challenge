import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRings, deleteRing } from '../services/api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/global.css';
import { IRing } from '../types/Ring'; 

const RingList: React.FC = () => {
  const [rings, setRings] = useState<IRing[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRings = async () => {
      const response = await getRings();
      if (response?.data) {
        setRings(response.data);
      } else {
        setRings([]);
      }
    };
    fetchRings();
  }, []);

  const handleDelete = async (id: string | undefined) => {
    if(id){
      await deleteRing(id);
      setRings(rings.filter((ring: IRing) => ring._id !== id));
    }
  };

  const handleEdit = (ring: IRing) => {
    navigate(`/update/${ring._id}`, { state: { ring } });
  };

  const handleCreatePage = () => {
    navigate(`/create`)
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <h1>Lista de Anéis</h1>
      <Slider {...settings}>
        {rings.map((ring: IRing) => (
          <div key={ring._id} className="carousel-item">
            <img src={ring.imagem} alt={ring.nome} />
            <h2>{ring.nome}</h2>
            <p>{ring.poder}</p>
            <p>{ring.portador}</p>
            <p>{ring.forjadoPor}</p>
            <div className="button-container">
              <button className="delete" onClick={() => handleDelete(ring._id)}>
                Excluir
              </button>
              <button onClick={() => handleEdit(ring)}>Editar</button>
            </div>
          </div>
        ))}
      </Slider>
      <div className='container-button-create'>
        <button onClick={() => handleCreatePage()}>Criar Novo Anel</button>
      </div>
     
    </div>
  );
};

export default RingList;
