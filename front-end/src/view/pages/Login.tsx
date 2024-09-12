import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="w-full">
      <header className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-white tracking-[-1px]">
          Entre em sua conta
        </h1>
        <p className="space-x-2">
          <span className="text-gray-300 tracking-[-0.05px]">
            Novo por aqui?
          </span>{' '}
          <Link
            to="/register"
            className="tracking-[-0.05px] font-medium text-[#fad785]"
          >
            Crie uma conta
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4">
        <Input placeholder="E-mail" type="email" />
        <Input placeholder="Senha" type="password" />
        <Button type="submit" className="mt-2">
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default Login;
