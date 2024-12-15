import React from 'react';

const Home: React.FC = () => {
  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center text-white"
      style={{
        minHeight: '100vh',       
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="text-center p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
          borderRadius: '10px',
          padding: '30px',
        }}
      >
        <h1 className="display-4 mb-4">Bem-vindo ao Desafio Anéis do Poder</h1>
        <p className="lead mb-5">Gerencie seus anéis e mergulhe no mundo épico da Terra-Média!</p>
        <div className="d-flex gap-3 justify-content-center">
          <a href="/view" className="btn btn-primary btn-lg">
            Ver Anéis
          </a>
          <a href="/create" className="btn btn-success btn-lg">
            Criar Novo Anel
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
