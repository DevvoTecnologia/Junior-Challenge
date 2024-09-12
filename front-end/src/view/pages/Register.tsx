import { Link } from 'react-router-dom';

const Register = () => {
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

      <form></form>
    </div>
  );
};

export default Register;
