import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import api from '../../services/api';
import '../../styles/styles.css';

interface Anel {
  id: number;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem: string;
}

const Carousel: React.FC = () => {
  const [aneis, setAneis] = useState<Anel[]>([]);

  useEffect(() => {
    api.get('/aneis')
      .then(response => {
        console.log('Dados dos anéis recebidos:', response.data);
        setAneis(response.data);
      })
      .catch(error => console.error('Erro ao buscar anéis:', error));
  }, []);
  

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/aneis/${id}`);
      setAneis(aneis.filter(anel => anel.id !== id));
    } catch (error) {
      console.error('Erro ao excluir o anel:', error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {aneis.map(anel => (
        <div key={anel.id} className="carousel-item">
          <h3>{anel.nome}</h3>
          <p>Poder: {anel.poder}</p>
          <p>Portador: {anel.portador}</p>
          <p>Forjado por: {anel.forjadoPor}</p>
          <img src={anel.imagem} alt={anel.nome} />
          <button onClick={() => handleDelete(anel.id)}>Excluir</button>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
