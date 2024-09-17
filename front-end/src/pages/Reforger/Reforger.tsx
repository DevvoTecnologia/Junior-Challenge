import React, { useState } from 'react';

// Components
import Menu from '../../components/Menu/Menu';

// Styles
import './reforger.css';
import '../../assets/styles/Buttons/button.css';

const Reforger: React.FC = () => {
  const [name, setName] = useState('');
  const [imageURL, setImage] = useState('');
  const [power, setPower] = useState('');
  const [carrier, setCarrier] = useState('');
  const [forger, setForger] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Primeiro, busque o anel pelo nome
    try {
      const searchResponse = await fetch(`http://localhost:3333/createrings/search?name=${encodeURIComponent(name)}`);
      if (!searchResponse.ok) {
        throw new Error('Não foi possível encontrar o anel.');
      }

      const ringData = await searchResponse.json();

      // Verifique se um anel foi encontrado
      if (!ringData || !ringData.id) {
        setError('Anel não encontrado.');
        return;
      }

      // Atualize o anel encontrado
      const anelData = { 
        imageURL: imageURL || '/default-image.png', 
        power, 
        carrier, 
        forger, 
        info 
      };

      const updateResponse = await fetch(`http://localhost:3333/updaterings/${ringData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(anelData),
      });

      if (updateResponse.ok) {
        alert('ANEL ATUALIZADO COM SUCESSO');
        // Limpar campos após sucesso
        setName('');
        setImage('');
        setPower('');
        setCarrier('');
        setForger('');
        setInfo('');
        setError(null);
      } else {
        const errorData = await updateResponse.json();
        setError(errorData.message || 'ERRO AO ATUALIZAR ANEL.');
      }
    } catch (error) {
      // Verificar se o erro é uma instância de Error
      if (error instanceof Error) {
        setError(error.message || 'ERRO DE REDE AO TENTAR ATUALIZAR O ANEL.');
      } else {
        setError('ERRO DESCONHECIDO AO TENTAR ATUALIZAR O ANEL.');
      }
    }
  };

  return (
    <div className="container">
      <Menu />

      <h1 className='title'>REFORJAR O ANEL</h1>
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
            placeholder="Poder do anel"
          />
        </div>

        <div className='form-box'>
          <label>Portador:</label>
          <input
            className="input-value"
            type="text"
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
            placeholder="Portador do anel"
          />
        </div>

        <div className='form-box'>
          <label>Forjado Por:</label>
          <select
            className="input-value"
            onChange={(e) => setForger(e.target.value)}
            value={forger}
          >
            <option value="">Selecione um forjador</option>
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

        <button className='btn-primary' type="submit">REFORJAR</button>
      </form>
    </div>
  );
};

export default Reforger;
