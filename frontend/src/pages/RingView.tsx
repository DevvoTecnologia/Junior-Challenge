import React, { useEffect, useState } from 'react';
import api from '../service/api';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../styles/carousel.css';

interface Ring {
  id: number;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem: string;
}

const RingsView: React.FC = () => {
  const [rings, setRings] = useState<Ring[]>([]);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/rings')
      .then(response => {
        setRings(response.data);
      })
      .catch(error => {
        console.error('Erro ao listar anéis:', error);
      });
  }, []);

  const handleCreate = () => {
    navigate('/create');
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/rings/${id}`);
      setRings(rings.filter(ring => ring.id !== id));
      setAlert({ type: 'success', message: 'Anel deletado com sucesso!' });

      // Remove o alerta após 3 segundos
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Erro ao deletar anel:', error);
      setAlert({ type: 'danger', message: 'Erro ao tentar deletar o anel.' });

     
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="display-4">Listagem de Anéis</h2>
        <button
          className="btn btn-success mt-3"
          onClick={handleCreate}
        >
          Criar Novo Anel
        </button>
      </div>

      
      {alert && (
        <div className={`alert alert-${alert.type} text-center`} role="alert">
          {alert.message}
        </div>
      )}

      <div>
        {rings.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            Nenhum anel cadastrado.
          </div>
        ) : (
          <Carousel
            interval={null}
            indicators={true}
            className="shadow-lg"
            style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: 'transparent' }}
          >
            {rings.map((ring) => (
              <Carousel.Item key={ring.id}>
                <div
                  className="d-flex flex-column align-items-center text-white p-4"
                  style={{
                    border: '1px solid #444',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  }}
                >
                  <img
                    src={ring.imagem}
                    alt={ring.nome}
                    className="img-fluid rounded-circle mb-3"
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      border: '4px solid #fff',
                    }}
                  />
                  <h3 className="text-white mb-2">{ring.nome}</h3>
                  <p className="mb-1">
                    <strong>Poder:</strong> {ring.poder}
                  </p>
                  <p className="mb-1">
                    <strong>Portador:</strong> {ring.portador}
                  </p>
                  <p className="mb-3">
                    <strong>Forjado Por:</strong> {ring.forjadoPor}
                  </p>
                  <div className="d-flex gap-3">
                    <button
                      className="btn btn-outline-light btn-sm"
                      onClick={() => handleEdit(ring.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(ring.id)}
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default RingsView;
