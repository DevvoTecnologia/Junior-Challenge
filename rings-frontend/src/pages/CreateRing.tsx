import React from 'react';
import RingForm from '../components/RingForm';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const CreateRingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    setTimeout(() => {
      navigate('/');

    }, 1500)
  };

  return (
    <div className="container">
      <h1>Bem vindo à Página de Criar Anel</h1>
      <RingForm onSubmitSuccess={handleSuccess} />
    </div>
  );
};

export default CreateRingPage;
