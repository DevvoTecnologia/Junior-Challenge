// src/components/RingForm.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Input from '../Input';
import Button from '../Button';
import './ring-form.scss';

const RingSchema = z.object({
  nome: z.string().nonempty(),
  poder: z.string().nonempty(),
  portador: z.string().nonempty(),
  forjadoPor: z.string().nonempty(),
  imagem: z.string().nonempty(),
});

interface RingFormProps {
  initialData?: {
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: string;
    imagem: string;
  };
  onSubmit: (form: {
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: string;
    imagem: string;
  }) => Promise<void>;
  isEditMode?: boolean;
}

const RingForm: React.FC<RingFormProps> = ({ initialData, onSubmit, isEditMode = false }) => {
  const [form, setForm] = useState(initialData || {
    nome: '',
    poder: '',
    portador: '',
    forjadoPor: '',
    imagem: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      RingSchema.parse(form);
      await onSubmit(form);
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="ring-form-container">
      <h1>{isEditMode ? 'Edit Ring' : 'Create New Ring'}</h1>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: 'Narya, o anel do fogo'" />
        <Input type="text" name="poder" value={form.poder} onChange={handleChange} placeholder="Ex: 'Seu portador ganha resistência ao fogo'" />
        <Input type="text" name="portador" value={form.portador} onChange={handleChange} placeholder="Ex: Gandalf" />
        <Input type="text" name="forjadoPor" value={form.forjadoPor} onChange={handleChange} placeholder="Ex: Elfos" />
        <Input type="text" name="imagem" value={form.imagem} onChange={handleChange} placeholder="URL da Imagem" />
        <div className="submit-button">
          <Button type="submit" children={isEditMode ? 'Update Ring' : 'Create Ring'}/>
        </div>
      </form>
    </div>
  );
};

export default RingForm;
