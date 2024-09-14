import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnelForm from '../components/Form/RingForm';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/view');
  };

  return (
    <div>
      <h1>Gerenciamento de anéis</h1>
      <AnelForm onSuccess={handleSuccess} />
    </div>
  );
};

export default Home;
