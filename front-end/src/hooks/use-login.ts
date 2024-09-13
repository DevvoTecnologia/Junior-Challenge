import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';
import { SigninParams } from '@/services/authService/signin';
import { loginSchema } from '@/validation/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from './use-toast';

type FormData = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const { signIn } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const onSubmit = handleSubmit(async data => {
    try {
      const { accessToken } = await mutateAsync(data);
      signIn(accessToken);
      toast({
        title: 'Bem-vindo!',
        duration: 3000,
      });
    } catch (e: any) {
      toast({
        title: 'Erro!',
        description: e.response.data.error,
        variant: 'destructive',
        duration: 3000,
      });
    }
  });

  return { isPending, errors, register, onSubmit };
};
