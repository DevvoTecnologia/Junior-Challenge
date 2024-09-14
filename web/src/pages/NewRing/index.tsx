import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { RingForm } from '../../components/RingForm';
import { ringServiceInstance } from '../../services/ringService';
import { RequestRing } from '../../types/requestRing';

import './styles.css';

export function NewRing() {
  const navigate = useNavigate();

  async function handleCreateRing(ringData: RequestRing) {
    try {
      await ringServiceInstance.create(ringData);
      toast.success('Anel criado com sucesso');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao criar o anel';
      toast.error(errorMessage);
    } finally {
      navigate('/');
    }
  }

  return (
    <div className="new-page-container">
      <RingForm buttonLabel="Criar Anel" onSubmit={handleCreateRing} />
    </div>
  );
}
