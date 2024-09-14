import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RingForm from '../components/RingForm';
import '../styles/global.css';

const UpdateRingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ring } = location.state;

  const handleSuccess = () => {
    setTimeout(() => {
      navigate('/');

    }, 1500)
  };

  return (
    <div className="container">
      <h1>Bem Vindo à Página de Atualizar Anel</h1>
      <RingForm initialData={ring} onSubmitSuccess={handleSuccess} />
    </div>
  );
};

export default UpdateRingPage;
