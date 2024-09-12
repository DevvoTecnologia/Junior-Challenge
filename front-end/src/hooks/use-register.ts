import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';
import { SignUpParams } from '@/services/authService/signup';
import { registerSchema } from '@/validation/register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type FormData = z.infer<typeof registerSchema>;

export const useRegister = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignUpParams) => {
      return authService.signup(data);
    },
  });

  const onSubmit = handleSubmit(async data => {
    try {
      const { accessToken } = await mutateAsync(data);
      signIn(accessToken);
    } catch {
      // TODO: toast
    }
  });

  return { isPending, errors, register, onSubmit };
};
