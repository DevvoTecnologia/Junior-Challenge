import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Authenticate: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      localStorage.setItem('@LordOfTheRings:authToken', token);
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [navigate, location.search]);

  return <div>Autenticando...</div>;
};

export default Authenticate;
