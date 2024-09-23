import React, { useState } from 'react';
import { createRing, updateRing } from '../services/api';
import '../styles/global.css';
import { IRing } from '../types/Ring'; 

interface RingFormProps {
  initialData?: IRing;
  onSubmitSuccess: () => void;
}

const defaultImages = [
  'https://lzd-img-global.slatic.net/g/p/564714ae43dde3f4372dc249ca293457.png_720x720q80.png',
  'https://www.nerdloja.com/cdn/shop/files/S46b308933f90460a9b44966fe92aa4b7j_9ba5cbbe-bf9f-4c78-bce7-3fa56493cda4_720x.jpg',
  'https://ae01.alicdn.com/kf/S459866ec6949454684d870144c26c1f2e/LOTR-Elrond-Vilya-Anel-de-Ar-Pedra-Azul-J-ias-da-Moda-Masculina-Presente-do-F.jpg'
];

const RingForm: React.FC<RingFormProps> = ({ initialData, onSubmitSuccess }) => {
  const [form, setForm] = useState(initialData || {
    nome: '',
    poder: '',
    portador: '',
    forjadoPor: '',
    imagem: defaultImages[0],
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (url: string) => {
    setForm({ ...form, imagem: url });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (initialData?._id) {
        await updateRing(initialData._id, form);
        setSuccessMessage('Anel atualizado com sucesso!');
      } else {
        await createRing(form);
        setSuccessMessage('Anel criado com sucesso!');
      }
      onSubmitSuccess();
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Erro ao salvar anel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>{initialData ? 'Atualizar Anel' : 'Criar Novo Anel'}</h2>

        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome do anel"
          required
        />
        <input
          name="poder"
          value={form.poder}
          onChange={handleChange}
          placeholder="Poder do anel"
          required
        />
        <input
          name="portador"
          value={form.portador}
          onChange={handleChange}
          placeholder="Portador"
          required
        />
        <input
          name="forjadoPor"
          value={form.forjadoPor}
          onChange={handleChange}
          placeholder="Forjado por"
          required
        />
        
        <div>
          <h3>Escolha uma imagem:</h3>
          {defaultImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Imagem ${index}`}
              style={{
                cursor: 'pointer',
                border: form.imagem === url ? '2px solid blue' : '2px solid transparent',
                margin: '10px',
                width: '100px',
                height: 'auto'
              }}
              onClick={() => handleImageSelect(url)}
            />
          ))}
        </div>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Processando...' : initialData ? 'Atualizar' : 'Criar'}
        </button>
      </div>
      
      {errorMessage && <p className="message error-message">{errorMessage}</p>}
      {successMessage && <p className="message success-message">{successMessage}</p>}
    </div>
  );
};

export default RingForm;
