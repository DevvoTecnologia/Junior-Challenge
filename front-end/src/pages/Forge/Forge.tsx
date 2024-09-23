import React, { useState } from 'react';

// Components
import Menu from '../../components/Menu/Menu';

// Styles
import './forge.css';
import '../../assets/styles/Buttons/button.css';

interface RingFormProps {
  ring?: {
    id?: string;
    imageURL: string;
    name: string;
    power: string;
    carrier: string;
    forger: string;
    info: string;
  };
}

const ForgeForm: React.FC<RingFormProps> = ({ ring }) => {
  const [imageURL, setImage] = useState(ring?.imageURL || '');
  const [name, setName] = useState(ring?.name || '');
  const [power, setPower] = useState(ring?.power || '');
  const [carrier, setCarrier] = useState(ring?.carrier || '');
  const [forger, setForger] = useState(ring?.forger || '');
  const [info, setInfo] = useState(ring?.info || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const anelData = { imageURL: imageURL || '/default-image.png', name, power, carrier, forger, info };

    try {
      const response = await fetch(ring?.id ? `https://junior-challenge-seven.vercel.app/updaterings/${ring.id}` : 'https://junior-challenge-seven.vercel.app/createrings', {
        method: ring?.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(anelData),
      });

      if (response.ok) {
        alert('ANEL FORJADO COM SUCESSO');
        setImage('');
        setName('');
        setPower('');
        setCarrier('');
        setForger('');
        setInfo('');
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'ERRO AO FORJAR ANEL.');
      }
    } catch (error) {
      setError('ERRO DE REDE AO TENTAR FORJAR O ANEL.');
    }
  };

  return (
    <div className="container">
      <Menu />

      <h1 className='title'>FORGE O ANEL DO PODER</h1>
      <form className='container-form' onSubmit={handleSubmit}>
        <div className='form-box'>
          <label>Nome:</label>
          <input
            className="input-value"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='form-box'>
          <label>Poder:</label>
          <input
            className="input-value"
            type="text"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            required
          />
        </div>

        <div className='form-box'>
          <label>Portador:</label>
          <input
            className="input-value"
            type="text"
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
            required
          />
        </div>

        <div className='form-box'>
          <label>Forjado Por:</label>
          <select
            name="forger" className="input-value"
            onChange={(e) => setForger(e.target.value)}
            value={forger}
            required
          >
            <option value="Anoes">Anões</option>
            <option value="Homens">Homens</option>
            <option value="Elfos">Elfos</option>
            <option value="Sauron">Sauron</option>
          </select>
        </div>

        <div className='form-box'>
          <label>Imagem (opcional):</label>
          <input
            className="input-value"
            type="text"
            value={imageURL}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL da imagem ou deixar vazio para default"
          />
        </div>

        <div className='form-box'>
          <label>Sobre o Anel:</label>
          <textarea
            className="input-value"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            placeholder="Fale sobre o poder do anel..."
            rows={4}
            cols={50}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className='btn-primary' type="submit">{ring ? 'Atualizar' : 'FORJAR'}</button>
      </form>
    </div>
  );
};

export default ForgeForm;
