// src/components/RingManager.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RingForm from './RingForm';

interface Ring {
  id: string;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem: string;
}

const RingManager: React.FC = () => {
  const [rings, setRings] = useState<Ring[]>([]);
  const [selectedRing, setSelectedRing] = useState<Ring | null>(null);

  useEffect(() => {
    const fetchRings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/rings');
        setRings(response.data);
      } catch (error) {
        console.error('Erro ao carregar anéis:', error);
      }
    };

    fetchRings();
  }, []);

  const handleRingSelect = (ring: Ring) => {
    setSelectedRing(ring);
  };

  const handleSuccess = () => {
    setSelectedRing(null);
    axios.get('http://localhost:3000/rings').then((response) => setRings(response.data));
  };

  return (
    <div>
      <h1>Gerenciar Anéis</h1>
      <div>
        <h2>Anéis existentes</h2>
        <ul>
          {rings.map((ring) => (
            <li key={ring.id}>
              {ring.nome} - {ring.portador}
              <button onClick={() => handleRingSelect(ring)}>Atualizar</button>
            </li>
          ))}
        </ul>
      </div>

      <RingForm currentRing={selectedRing || undefined} onSuccess={handleSuccess} />
    </div>
  );
};

export default RingManager;
