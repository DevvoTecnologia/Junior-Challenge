import React, { useState } from 'react';
import { Textarea } from './ui/textarea.tsx';
import { Input } from './ui/input.tsx';
import { Button } from './ui/button.tsx';
import { z } from 'zod';
import { useRings } from '@/hooks/use-rings.ts';
import { CreateRingType } from '@/types/Ring.ts';

const createRingSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  power: z.string().min(1, 'Poder é obrigatório'),
  image: z.string().url('Deve ser URL'),
});

export default function CreateRing() {
  const [formData, setFormData] = useState<CreateRingType>({
    name: '',
    power: '',
    image: '',
  });
  const [errors, setErrors] = useState<z.ZodError | null>(null);

  const { createRing } = useRings();

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
      createRingSchema.parse(formData);

      const result = await createRing(formData);
      if (result) {
      }
      setErrors(null);

      setFormData({ name: '', power: '', image: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-black/20 p-3 flex flex-col gap-3 rounded-lg shadow-lg"
    >
      <h2 className="font-semibold text-lg">Criar Anel</h2>
      <div className="flex items-center gap-4">
        <Input
          type="text"
          name="name"
          placeholder="Nome do anel"
          className="w-1/3"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="image"
          placeholder="URL da imagem"
          className="w-1/3"
          onChange={handleChange}
        />
      </div>
      {errors?.issues.find((err) => err.path[0] === 'name') && (
        <p className="text-red">
          {errors.issues.find((err) => err.path[0] === 'name')?.message}
        </p>
      )}
      <Textarea
        name="power"
        placeholder="Poder do anel"
        className="resize-none"
        onChange={handleChange}
      />
      {errors?.issues.find((err) => err.path[0] === 'power') && (
        <p className="text-red">
          {errors.issues.find((err) => err.path[0] === 'power')?.message}
        </p>
      )}
      <div className="flex justify-end">
        <Button type="submit" className="bg-green text-white rounded-lg p-2">
          Criar Anel
        </Button>
      </div>
    </form>
  );
}
