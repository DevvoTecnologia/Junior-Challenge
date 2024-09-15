import axiosInstance from '../axiosConfig';
import RingForm from '../components/RingForm';

const CreateRing = () => {
  const handleCreate = async (form: {
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: string;
    imagem: string;
  }) => {
    await axiosInstance.post('/rings', form);
  };

  return <RingForm onSubmit={handleCreate} />;
};

export default CreateRing;
