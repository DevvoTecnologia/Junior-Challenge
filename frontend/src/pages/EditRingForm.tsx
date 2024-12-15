import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../service/api';

interface Ring {
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem: string;
}

const EditRing: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Pegamos o ID da URL
  const navigate = useNavigate();

  const [form, setForm] = useState<Ring>({
    nome: '',
    poder: '',
    portador: '',
    forjadoPor: '',
    imagem: ''
  });

  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get<Ring>(`/rings/${id}`)
        .then((response) => {
          setForm(response.data);
        })
        .catch((error) => {
          console.error('Erro ao carregar anel:', error);
          setAlert({ type: 'danger', message: 'Erro ao carregar os dados do anel.' });
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nome || !form.poder || !form.portador || !form.forjadoPor) {
      setAlert({ type: 'danger', message: 'Por favor, preencha todos os campos obrigatórios.' });
      return;
    }

    try {
      await api.put(`/rings/${id}`, form);
      setAlert({ type: 'success', message: 'Anel atualizado com sucesso!' });
      setTimeout(() => navigate('/view'), 2000); // Redireciona após 2 segundos
    } catch (error) {
      console.error('Erro ao atualizar anel:', error);
      setAlert({ type: 'danger', message: 'Erro ao atualizar o anel.' });
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Anel</h2>

     
      {alert && (
        <div className={`alert alert-${alert.type} text-center`} role="alert">
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-dark text-white p-4 rounded shadow" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome do Anel</label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="form-control"
            placeholder="Ex: Narya, o anel do fogo"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="poder" className="form-label">Poder do Anel</label>
          <input
            type="text"
            id="poder"
            name="poder"
            className="form-control"
            placeholder="Ex: Resistência ao fogo"
            value={form.poder}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="portador" className="form-label">Portador do Anel</label>
          <input
            type="text"
            id="portador"
            name="portador"
            className="form-control"
            placeholder="Ex: Gandalf"
            value={form.portador}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="forjadoPor" className="form-label">Forjado Por</label>
          <select
            id="forjadoPor"
            name="forjadoPor"
            className="form-select"
            value={form.forjadoPor}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma opção</option>
            <option value="Elfos">Elfos</option>
            <option value="Anões">Anões</option>
            <option value="Homens">Homens</option>
            <option value="Sauron">Sauron</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="imagem" className="form-label">URL da Imagem (opcional)</label>
          <input
            type="text"
            id="imagem"
            name="imagem"
            className="form-control"
            placeholder="URL para imagem do anel"
            value={form.imagem}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Atualizar</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/view')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditRing;
