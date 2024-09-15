import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import RingForm from '../components/RingForm';

const EditRing = () => {
  const { id } = useParams<{ id: string }>();
  const [ringData, setRingData] = useState({
    nome: '',
    poder: '',
    portador: '',
    forjadoPor: '',
    imagem: ''
  });

  useEffect(() => {
    axiosInstance.get(`/rings/${id}`)
      .then(response => setRingData(response.data))
      .catch(error => console.error('Error fetching ring details:', error));
  }, [id]);

  const handleUpdate = async (form: {
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: string;
    imagem: string;
  }) => {
    await axiosInstance.put(`/rings/${id}`, form);
  };

  return <RingForm initialData={ringData} onSubmit={handleUpdate} isEditMode />;
};

export default EditRing;
