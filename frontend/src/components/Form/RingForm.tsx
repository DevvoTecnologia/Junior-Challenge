import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

interface AnelFormProps {
  anelId?: number;
  onSuccess: () => void;
}

const AnelForm: React.FC<AnelFormProps> = ({ anelId, onSuccess }) => {
  const [nome, setNome] = useState('');
  const [poder, setPoder] = useState('');
  const [portador, setPortador] = useState('');
  const [forjadoPor, setForjadoPor] = useState('Elfos');
  const [imagem, setImagem] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    if (anelId) {
      api.get(`/aneis/${anelId}`).then(response => {
        const { nome, poder, portador, forjadoPor, imagem } = response.data;
        setNome(nome);
        setPoder(poder);
        setPortador(portador);
        setForjadoPor(forjadoPor);
        setImagem(imagem);
      });
    }
  }, [anelId]);

  const handleCreate = async () => {
    const data = { nome, poder, portador, forjadoPor, imagem };
    try {
      await api.post('/aneis', data);
      console.log('Anel criado com sucesso');
      navigate('/view'); 
    } catch (error) {
      console.error('Erro ao criar o anel:', error);
    }
  };

  const handleUpdate = async () => {
    const data = { nome, poder, portador, forjadoPor, imagem };
    try {
      if (anelId) {
        await api.put(`/aneis/${anelId}`, data);
        console.log('Anel atualizado com sucesso');
        navigate('/view'); 
      }
    } catch (error) {
      console.error('Erro ao atualizar o anel:', error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />
      <input type="text" value={poder} onChange={(e) => setPoder(e.target.value)} placeholder="Poder" required />
      <input type="text" value={portador} onChange={(e) => setPortador(e.target.value)} placeholder="Portador" required />
      <select value={forjadoPor} onChange={(e) => setForjadoPor(e.target.value)} required>
        <option value="Elfos">Elfos</option>
        <option value="Anões">Anões</option>
        <option value="Homens">Homens</option>
        <option value="Sauron">Sauron</option>
      </select>
      <input type="text" value={imagem} onChange={(e) => setImagem(e.target.value)} placeholder="Imagem (URL)" />
      <div>
        <button type="button" onClick={handleCreate}>Criar</button>
        <button type="button" onClick={handleUpdate}>Atualizar</button>
      </div>
    </form>
  );
};

export default AnelForm;
