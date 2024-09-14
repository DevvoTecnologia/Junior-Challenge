import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bem-vindo ao Gerenciador de Anéis</h1>
      <nav>
        <ul>
          <li>
            <Link to="/view-rings">Visualizar Anéis</Link>
          </li>
          <li>
            <Link to="/manage-rings">Gerenciar Anéis</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
