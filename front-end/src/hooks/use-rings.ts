import { CarouselApi } from '@/components/ui/carousel';
import { useAuth } from '@/contexts/AuthContext';
import { ringsService } from '@/services/ringsService';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useRings = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { signOut } = useAuth();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const { data } = useQuery({
    queryKey: ['rings'],
    queryFn: () => ringsService.getAll(),
  });

  return {
    rings: data ?? [],
    current,
    setApi,
    signOut,
  };
};
