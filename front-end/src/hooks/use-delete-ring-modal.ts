import { ringsService } from '@/services/ringsService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useToast } from './use-toast';

export const useDeleteRingModal = (ringId: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: async (ringId: string) => ringsService.remove(ringId),
  });

  const onSubmit = async () => {
    try {
      await mutateAsync(ringId);
      queryClient.invalidateQueries({ queryKey: ['rings'] });
      setIsOpen(false);
      toast({
        title: 'Anel deletado com sucesso!',
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
  };

  return { isOpen, setIsOpen, onSubmit };
};
