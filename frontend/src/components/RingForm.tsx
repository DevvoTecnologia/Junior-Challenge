import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useApi } from '../hooks/useApi';
import { RingFormState, RingFormProps } from '../types/Rings';
import { AxiosError } from 'axios';

export const RingForm: React.FC<RingFormProps> = ({ ring, onSave }) => {
  const [formData, setFormData] = useState<RingFormState>({
    ringname: '',
    forgedby: '',
    carrier: '',
    description: '',
    image: '',
  });

  const api = useApi();

  useEffect(() => {
    if (ring) {
      setFormData({ 
        ringname: ring.ringname,
        forgedby: ring.forgedby,
        carrier: ring.carrier,
        description: ring.description, 
        image: ring.image || '',
      });
    }
  }, [ring]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createRing(formData);
      toast.success('Anel salvo com sucesso!');
      if (onSave) onSave(); // Chama a função para atualizar a lista
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'Não foi possível cadastrar o anel';
        toast.error(message);
      } else {
        toast.error('Não foi possível cadastrar o anel');
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (ring._id) {
        await api.updateRing(ring._id, formData);
        toast.success('Anel atualizado com sucesso!');
        if (onSave) onSave(); // Chama a função para atualizar a lista
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'Não foi possível cadastrar o anel';
        toast.error(message);
      } else {
        toast.error('Não foi possível cadastrar o anel');
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (ring._id) {
        await api.deleteRing(ring._id);
        toast.success('Anel excluído com sucesso!');
        if (onSave) onSave(); // Chama a função para atualizar a lista
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'Não foi possível cadastrar o anel';
        toast.error(message);
      } else {
        toast.error('Não foi possível cadastrar o anel');
      }
    }
  };

  const isNewRing = !ring._id;

  return (
    <form className="flex flex-col gap-6 p-6 bg-gray-900 text-white rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">Formulário do Anel</h2>

      <label className="flex flex-col">
        <span className="mb-2 text-lg font-semibold text-yellow-300">Nome do Anel:</span>
        <input
          type="text"
          name="ringname"
          value={formData.ringname}
          onChange={handleChange}
          placeholder="Digite o nome do anel"
          className="border border-gray-600 p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-2 text-lg font-semibold text-yellow-300">Forjado por:</span>
        <select
          name="forgedby"
          value={formData.forgedby}
          onChange={handleChange}
          className="border border-gray-600 p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        >
          <option value="">Selecione o forjador</option>
          <option value="Humanos">Humanos</option>
          <option value="Elfos">Elfos</option>
          <option value="Anões">Anões</option>
          <option value="Sauron">Sauron</option>
        </select>
      </label>

      <label className="flex flex-col">
        <span className="mb-2 text-lg font-semibold text-yellow-300">Portador:</span>
        <input
          type="text"
          name="carrier"
          value={formData.carrier}
          onChange={handleChange}
          placeholder="Digite o portador do anel"
          className="border border-gray-600 p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-2 text-lg font-semibold text-yellow-300">Descrição:</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descreva o anel"
          className="border border-gray-600 p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </label>

      {isNewRing ? (
        <button
          type="submit"
          onClick={handleSave}
          className="bg-green-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-600 transition-all"
        >
          Salvar
        </button>
      ) : (
        <div className="flex justify-between gap-4">
          <button
            type="submit"
            onClick={handleUpdate}
            className="bg-blue-500 w-full text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-600 transition-all"
          >
            Atualizar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 w-full text-white py-3 px-6 rounded-md font-semibold hover:bg-red-600 transition-all"
          >
            Excluir
          </button>
        </div>
      )}
    </form>
  );
};
