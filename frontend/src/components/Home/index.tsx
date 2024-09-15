// src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import RingCarousel from '../RingCarousel';
import './home.scss';
import Button from '../Button';

interface Ring {
  id: number;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem: string;
}

const HomePage = () => {
  const [rings, setRings] = useState<Ring[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/rings')
      .then(response => setRings(response.data))
      .catch(error => console.error('Error fetching rings:', error));
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    axiosInstance.delete(`/rings/${id}`)
      .then(() => {
        setRings(rings.filter(ring => ring.id !== id));
      })
      .catch(error => console.error('Error deleting ring:', error));
  };

  const hasRings = rings.length > 0;

  return (
    <div className="home">
      <div className='section-title'>
        <h1>RINGS LIST</h1>
        <div className="button-container">
          <Button type='button' children='Create new Ring' onClick={() => navigate('/create')}/>
        </div>
      </div>
      {hasRings ? (
        <RingCarousel rings={rings} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <div className="placeholder">
          No rings found.
        </div>
      )}
    </div>
  );
};

export default HomePage;
