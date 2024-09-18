import React, { useState } from 'react';
import { Textarea } from './ui/textarea.tsx';
import { Input } from './ui/input.tsx';
import { Button } from './ui/button.tsx';
import { z } from 'zod';
import { useRings } from '@/hooks/use-rings.ts';
import { useUser } from '@/hooks/use-user.ts';
import { ringSchema } from '@/schemas/createRing-schema.ts';
import { Bounce, toast } from 'react-toastify';

const CreateRing = () => {
  const [formData, setFormData] = useState({
    name: '',
    power: '',
    image: '',
  });
  const [errors, setErrors] = useState<z.ZodError | null>(null);

  const user = useUser((state) => state.user);
  const { createRing } = useRings();

  if (!user) {
    return <p>Você precisa estar logado para criar um anel.</p>;
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      ringSchema.parse(formData);
      const ringData = {
        ...formData,
        bearer: user.user.id,
        forgedBy: user.user.id,
      };

      const result = await createRing(ringData);
      if (result) {
        toast.success('Anel criado com sucesso!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
      }

      setErrors(null);
      setFormData({ name: '', power: '', image: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error);
      } else {
        toast.error('Erro ao criar anel: ' + error, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
      }
    }
  };

  const getErrorMessage = (field: string) => {
    return errors?.issues.find((err) => err.path[0] === field)?.message;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-black/20 bg-white p-3 flex flex-col gap-3 rounded-lg shadow-lg"
    >
      <h2 className="font-semibold text-lg">Criar Anel</h2>
      <div className="flex items-center gap-4">
        <div className="flex flex-col w-1/3">
          <Input
            type="text"
            name="name"
            placeholder="Nome do anel"
            onChange={handleChange}
            value={formData.name}
          />
          {getErrorMessage('name') ? (
            <p className="text-red h-5">{getErrorMessage('name')}</p>
          ) : (
            <p className="h-5"></p>
          )}
        </div>
        <div className="flex flex-col w-1/3">
          <Input
            type="text"
            name="image"
            placeholder="URL da imagem"
            onChange={handleChange}
            value={formData.image}
          />
          {getErrorMessage('image') ? (
            <p className="text-red h-5">{getErrorMessage('image')}</p>
          ) : (
            <p className="h-5"></p>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <Textarea
          name="power"
          placeholder="Poder do anel"
          className="resize-none"
          onChange={handleChange}
          value={formData.power}
        />
        {getErrorMessage('power') ? (
          <p className="text-red h-5">{getErrorMessage('power')}</p>
        ) : (
          <p className="h-5"></p>
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="bg-green text-white rounded-lg p-2">
          Criar Anel
        </Button>
      </div>
    </form>
  );
};

export default CreateRing;
