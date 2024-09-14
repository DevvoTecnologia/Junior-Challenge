// src/components/RingCarousel.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importação dos estilos do carrossel

interface Ring {
  id: string;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem: string;
}

const RingCarousel: React.FC = () => {
  const [rings, setRings] = useState<Ring[]>([]);

  useEffect(() => {
    const fetchRings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/rings');
        setRings(response.data);
      } catch (error) {
        console.error('Erro ao carregar os anéis:', error);
      }
    };

    fetchRings();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este anel?")) {
      try {
        await axios.delete(`http://localhost:3000/rings/${id}`);
        setRings(rings.filter((ring) => ring.id !== id));
        alert('Anel excluído com sucesso.');
      } catch (error) {
        console.error('Erro ao excluir o anel:', error);
        alert('Falha ao excluir o anel.');
      }
    }
  };

  const handleEdit = (id: string) => {
    alert(`Redirecionando para editar o anel com ID: ${id}`);
  };

  return (
    <div>
      <h2>Anéis Cadastrados</h2>
      <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} useKeyboardArrows={true}>
        {rings.map((ring) => (
          <div key={ring.id} className="ring-item">
            <img
              src={ring.imagem ? ring.imagem : 'https://via.placeholder.com/300x300.png?text=Anel'}
              alt={`Imagem do anel ${ring.nome}`}
              style={{ maxWidth: '300px', height: 'auto' }} // Tamanho padrão para as imagens
            />
            <div className="legend">
              <h3>{ring.nome}</h3>
              <p>Poder: {ring.poder}</p>
              <p>Portador: {ring.portador}</p>
              <p>Forjado por: {ring.forjadoPor}</p>
              <div>
                <button onClick={() => handleEdit(ring.id)}>Editar</button>
                <button onClick={() => handleDelete(ring.id)}>Excluir</button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default RingCarousel;
