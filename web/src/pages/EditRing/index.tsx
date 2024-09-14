import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ringServiceInstance } from '../../services/ringService';
import { RequestRing } from '../../types/requestRing';
import { RingForm } from '../../components/RingForm';
import { ResponseRing } from '../../types/resposneRing';

import './styles.css';

export function EditRing() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [ring, setRing] = useState<ResponseRing>();

  useEffect(() => {
    if (!id) {
      toast.error('ID do anel não foi encontrado');
      navigate('/');
      return;
    }

    ringServiceInstance
      .getById(id)
      .then(ringData => setRing(ringData))
      .catch(error => toast.error(error.message));
  }, [id, navigate]);

  async function handleEditRing(ringData: RequestRing) {
    console.log(ringData);
    try {
      await ringServiceInstance.update(id || '', ringData);
      toast.success('Anel editado com sucesso');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao editar o anel';
      toast.error(errorMessage);
    } finally {
      navigate('/');
    }
  }

  return (
    <div className="edit-page-container">
      <RingForm
        initialData={ring}
        buttonLabel="Salvar"
        onSubmit={handleEditRing}
      />
    </div>
  );
}
