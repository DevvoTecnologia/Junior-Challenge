import { ringsService } from '@/services/ringsService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useDeleteRingModal = (ringId: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (ringId: string) => ringsService.remove(ringId),
  });

  const onSubmit = async () => {
    try {
      await mutateAsync(ringId);
      queryClient.invalidateQueries({ queryKey: ['rings'] });
      setIsOpen(false);
    } catch {
      // TODO: toast
    }
  };

  return { isOpen, setIsOpen, onSubmit };
};
