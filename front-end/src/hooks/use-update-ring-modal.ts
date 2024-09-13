import { ringsService } from '@/services/ringsService';
import { UpdateRingParams } from '@/services/ringsService/update';
import { updateRingSchema } from '@/validation/ring-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type FormData = z.infer<typeof updateRingSchema>;

export const useUpdateRingModal = (ringId: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const fetchRingData = async () => {
    const ring = await ringsService.getById(ringId);
    setValue('name', ring.name || '');
    setValue('power', ring.power || '');
    setValue('bearer', ring.bearer || '');
    setValue('forgedBy', ring.forgedBy || '');
    setValue('image', ring.image || '');
  };

  useEffect(() => {
    if (isOpen) {
      fetchRingData();
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(updateRingSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: UpdateRingParams) =>
      ringsService.update({ ...data, id: ringId }),
  });

  const onSubmit = handleSubmit(async data => {
    try {
      await mutateAsync({ ...data, id: ringId });
      queryClient.invalidateQueries({ queryKey: ['rings'] });
    } catch {
      // TODO: toast
    }
  });

  return {
    errors,
    isOpen,
    setIsOpen,
    register,
    setValue,
    clearErrors,
    onSubmit,
  };
};
