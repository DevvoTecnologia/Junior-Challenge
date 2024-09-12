import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRegister } from '@/hooks/use-register';
import { Link } from 'react-router-dom';

const Register = () => {
  const { isPending, errors, register, onSubmit } = useRegister();

  return (
    <div className="w-full">
      <header className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-white  tracking-[-1px]">
          Crie sua conta
        </h1>
        <p className="space-x-2">
          <span className="text-gray-300 tracking-[-0.05px]">
            Já possui uma conta?
          </span>{' '}
          <Link
            to="/login"
            className="tracking-[-0.05px] font-medium text-[#fad785]"
          >
            Fazer login
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4" onSubmit={onSubmit}>
        <Input
          placeholder="Nome"
          type="text"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          placeholder="E-mail"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          placeholder="Senha"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <Button type="submit" className="mt-2" isLoading={isPending}>
          Criar conta
        </Button>
      </form>
    </div>
  );
};

export default Register;
