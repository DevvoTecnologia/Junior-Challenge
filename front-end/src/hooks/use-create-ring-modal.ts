import { ringsService } from '@/services/ringsService';
import { CreateRingParams } from '@/services/ringsService/create';
import { ringSchema } from '@/validation/ring-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from './use-toast';

type FormData = z.infer<typeof ringSchema>;

export const useCreateRingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ringSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: CreateRingParams) => ringsService.create(data),
  });

  const onSubmit = handleSubmit(async data => {
    try {
      await mutateAsync(data);
      queryClient.invalidateQueries({ queryKey: ['rings'] });
      reset();
      setIsOpen(false);
      toast({
        title: 'Anel criado com sucesso!',
        duration: 3000,
      });
    } catch (e: any) {
      toast({
        title: 'Algo deu errado!',
        description: e.response.data.error,
        variant: 'destructive',
        duration: 3000,
      });
    }
  });

  return {
    errors,
    isOpen,
    setIsOpen,
    clearErrors,
    setValue,
    register,
    onSubmit,
  };
};
