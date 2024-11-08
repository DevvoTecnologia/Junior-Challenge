import React, { useEffect, useState } from 'react';
import { deleteAnel, getAneis } from '../services/AnelService';
import { useNavigate } from 'react-router-dom';

const AneisTable = () => {
  const [aneis, setAneis] = useState([]);
  const navigate = useNavigate();

  const getAneisData = async () => {
    try {
      const aneisData = await getAneis();

      setAneis(aneisData);
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao retornar os aneis');
    }
  };

  const handleDeleteAnel = async (id) => {
    try {
      await deleteAnel(id);
      getAneisData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!aneis.length) getAneisData();
  }, []);

  if (aneis.length)
    return (
      <div className="mt-4">
        <h2>Tabela de anéis</h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Poder</th>
                <th scope="col">Forjador</th>
                <th scope="col">Portador</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {aneis.map((anel) => {
                return (
                  <tr key={anel._id}>
                    <td>{anel.nome}</td>
                    <td>
                      {anel.poder.length > 20
                        ? `${anel.poder.substring(0, 20)}...`
                        : anel.poder}
                    </td>
                    <td>{anel.forjadoPor.nome}</td>
                    <td>{anel.portador.nome}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/anel/update/${anel._id}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteAnel(anel._id)}
                      >
                        Apagar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AneisTable;
