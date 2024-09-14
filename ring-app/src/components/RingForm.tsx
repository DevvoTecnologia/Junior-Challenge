// src/components/RingForm.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface RingFormProps {
  currentRing?: Ring;
  onSuccess: () => void;
}

interface Ring {
  id?: string;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem?: string;
}

const RingForm: React.FC<RingFormProps> = ({ currentRing, onSuccess }) => {
  const [formData, setFormData] = useState<Ring>({
    nome: '',
    poder: '',
    portador: '',
    forjadoPor: '',
    imagem: 'https://exemplo.com/imagem-default.jpg',
  });

  useEffect(() => {
    if (currentRing) {
      setFormData(currentRing);
    }
  }, [currentRing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentRing && currentRing.id) {
        await axios.put(`http://localhost:3000/rings/${currentRing.id}`, formData);
        alert('Anel atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:3000/rings', formData);
        alert('Anel criado com sucesso!');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar o anel:', error);
      alert('Falha ao salvar o anel.');
    }
  };

  return (
    <div>
      <h2>{currentRing ? 'Atualizar Anel' : 'Criar Anel'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Poder:</label>
          <input
            type="text"
            name="poder"
            value={formData.poder}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Portador:</label>
          <input
            type="text"
            name="portador"
            value={formData.portador}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Forjado por:</label>
          <input
            type="text"
            name="forjadoPor"
            value={formData.forjadoPor}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Imagem:</label>
          <select
            name="imagem"
            value={formData.imagem}
            onChange={handleInputChange}
          >
            <option value="https://exemplo.com/imagem-default.jpg">Imagem Padrão</option>
            <option value="https://exemplo.com/imagem-anel1.jpg">Imagem 1</option>
            <option value="https://exemplo.com/imagem-anel2.jpg">Imagem 2</option>
          </select>
        </div>

        <button type="submit">
          {currentRing ? 'Atualizar' : 'Criar'}
        </button>
      </form>
    </div>
  );
};

export default RingForm;
