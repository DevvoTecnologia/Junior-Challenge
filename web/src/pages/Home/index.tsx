import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Card } from '../../components/Card';
import { CustomSlide } from '../../components/CustomSlide';
import { Button } from '../../components/Button';
import { DeleteModal } from '../../components/DeleteModal';
import { ringServiceInstance } from '../../services/ringService';
import { ResponseRing } from '../../types/resposneRing';

import './styles.css';

export function Home() {
  const navigate = useNavigate();
  const [rings, setRings] = useState<ResponseRing[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ringToDelete, setRingToDelete] = useState('');

  function getAllRings() {
    ringServiceInstance
      .getAll()
      .then(data => setRings(data))
      .catch(error => toast.error(error.message));
  }

  useEffect(() => {
    getAllRings();
  }, [setRings]);

  function handleDelete() {
    ringServiceInstance
      .delete(ringToDelete)
      .then(() => toast.success('Anel excluido com sucesso'))
      .catch(error => toast.error(error.message))
      .finally(() => {
        setIsModalOpen(false);
        getAllRings();
      });
  }

  function handleOpenDeleteModal(id: string) {
    setRingToDelete(id);
    setIsModalOpen(true);
  }

  return (
    <>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
      <div className="home-page-container">
        <CustomSlide>
          {rings.map(item => (
            <Card
              key={item.id}
              ringData={item}
              onEdit={() => navigate(`/edit/${item.id}`)}
              onDelete={() => handleOpenDeleteModal(item.id)}
            />
          ))}
        </CustomSlide>
        <Button
          width="350px"
          onClick={() => {
            navigate('/new');
          }}
        >
          Novo Anel
        </Button>
      </div>
    </>
  );
}
