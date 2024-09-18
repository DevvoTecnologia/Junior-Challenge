import React, { useEffect, useState } from 'react';
import Header from '../components/Header.tsx';
import Container from '../components/Container.tsx';
import { useUser } from '../hooks/use-user.ts';
import { Bounce, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';

export default function Login() {
  const [active, setActive] = useState('login');
  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    class: '',
  });
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);

  const user = useUser((state) => state.user);
  const { login, register } = useUser();
  const classOptions = [
    {
      value: 'Elfo',
      label: 'Elfo',
    },
    {
      value: 'Anão',
      label: 'Anão',
    },
    {
      value: 'Homem',
      label: 'Homem',
    },
    {
      value: 'Sauron',
      label: 'Sauron',
    },
  ];
  useEffect(() => {
    if (user) {
      toast.success('Usuário logado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (active === 'cadastrar') {
      setRegisterFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setLoginFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const onLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const result = await login(loginFormData);

      if (!result) {
        throw new Error('Usuário ou senha inválidos.');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Erro ao fazer login.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
      } else {
        toast.error('Erro inesperado. Tente novamente mais tarde.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
      }
    }
  };

  const onRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const result = await register(registerFormData);
      if (!result) {
        throw new Error('Erro ao registrar.');
      }

      toast.success('Registro realizado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Erro inesperado. Tente novamente.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
        console.error('Register failed:', error.message);
      } else {
        toast.error('Erro inesperado. Tente novamente mais tarde.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {!user && (
        <Container>
          <div className="flex items-center justify-center h-full">
            <div className="bg-white rounded-lg shadow-lg border-[2px] border-gray overflow-hidden relative w-[768px] max-w-full min-h-[480px]">
              <div
                className={`absolute top-0 right-0 w-1/2 h-full p-10 transition-transform duration-600 ${active === 'cadastrar' ? 'opacity-100 z-10' : 'opacity-0 z-1'}`}
              >
                {active === 'cadastrar' && (
                  <form
                    className="bg-white flex items-center justify-center flex-col px-10 h-full"
                    onSubmit={onRegisterSubmit}
                  >
                    <h1 className="text-4xl font-bold">Criar conta</h1>
                    <input
                      className="bg-gray border-none my-2 py-2 px-3 text-sm rounded-lg w-full outline-none"
                      type="text"
                      name="username"
                      placeholder="Nome de usuário"
                      value={registerFormData.username}
                      onChange={handleChange}
                    />
                    <input
                      className="bg-gray border-none my-2 py-2 px-3 text-sm rounded-lg w-full outline-none"
                      name="email"
                      placeholder="Email de cadastro"
                      value={registerFormData.email}
                      onChange={handleChange}
                    />
                    <div className="relative w-full">
                      <input
                        className="bg-gray border-none my-2 py-2 px-3 text-sm rounded-lg w-full outline-none"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Senha"
                        value={registerFormData.password}
                        onChange={handleChange}
                      />
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                    <div className="relative w-full">
                      <input
                        className="bg-gray border-none my-2 py-2 px-3 text-sm rounded-lg w-full outline-none"
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirmar senha"
                        value={registerFormData.confirmPassword}
                        onChange={handleChange}
                      />
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="bg-gray border-none my-2 py-2 px-3 text-sm rounded-lg w-full outline-none"
                        >
                          {registerFormData.class
                            ? classOptions.find(
                                (classOption) =>
                                  classOption.value === registerFormData.class
                              )?.label
                            : 'Selecione a sua classe.'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Pesquisar classe" />
                          <CommandList>
                            <CommandEmpty>Classe não encontrada.</CommandEmpty>
                            <CommandGroup>
                              {classOptions.map((classOption) => (
                                <CommandItem
                                  key={classOption.value}
                                  value={classOption.value}
                                  onSelect={(currentValue) => {
                                    setRegisterFormData({
                                      ...registerFormData,
                                      class:
                                        currentValue === registerFormData.class
                                          ? ''
                                          : currentValue,
                                    });
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      registerFormData.class === classOption.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {classOption.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <button
                      data-testid="cadastro-submit"
                      type="submit"
                      className="bg-transparent border border-gray text-black text-sm font-semibold px-4 py-2 rounded-lg mt-4"
                      aria-label="Submit Cadastro"
                    >
                      Cadastrar
                    </button>
                  </form>
                )}
              </div>

              <div
                className={`absolute top-0 left-0 w-1/2 h-full p-10 transition-all duration-600 ${active === 'login' ? 'opacity-100 z-10' : 'opacity-0 z-1'}`}
              >
                {active === 'login' && (
                  <form
                    className="bg-white flex items-center justify-center flex-col px-10 h-full"
                    onSubmit={onLoginSubmit}
                  >
                    <h1 className="text-4xl font-bold">Login</h1>
                    <input
                      className="bg-gray border-none my-2 py-2 px-3 text-sm rounded-lg w-full outline-none"
                      name="email"
                      placeholder="Email de login"
                      value={loginFormData.email}
                      onChange={handleChange}
                    />
                    <div className="relative w-full">
                      <input
                        className="bg-gray border-none my-2 py-2 px-3 text-sm rounded-lg w-full outline-none"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Senha de login"
                        value={loginFormData.password}
                        onChange={handleChange}
                      />
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                    <a href="#" className="text-sm text-blue-400">
                      Esqueceu sua senha?
                    </a>
                    <button
                      type="submit"
                      className="bg-transparent border border-gray text-black text-sm font-semibold px-4 py-2 rounded-lg mt-4"
                      aria-label="Submit Login"
                    >
                      Login
                    </button>
                  </form>
                )}
              </div>

              {/* Seções para exibir erros */}
              {Object.keys(errors).map((key) => (
                <p key={key} className="text-red text-sm">
                  {errors[key]}
                </p>
              ))}

              <div
                className={`absolute top-0 ${active === 'cadastrar' ? 'left-0 rounded-r-[30%]' : 'rounded-l-[30%] left-1/2'} w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out z-50`}
              >
                <div
                  className={`bg-gradient-to-r left-0 
                  ${active === 'cadastrar' ? 'from-mainColor to-mainColor/70' : 'from-mainColor/70 to-mainColor '}
                      text-white relative right-0 w-full h-full transform transition-all duration-600 ease-in-out`}
                >
                  <div
                    className={`${active === 'cadastrar' ? 'hidden' : ''} flex items-center justify-center flex-col h-full w-full`}
                  >
                    <h1 className="text-3xl font-bold mb-4">Bem vindo de volta!</h1>
                    <p className="text-sm leading-5 tracking-tight my-5">
                      Faça o login para continuar
                    </p>
                    <div className="flex flex-col gap-1 justify-center items-center">
                      <p className="text-sm leading-5 tracking-tight my-5">
                        Não tem cadastro?
                      </p>
                      <button
                        data-testid="cadastro-toggle"
                        className="border rounded-xl p-2 px-6"
                        onClick={() => setActive('cadastrar')}
                        aria-label="Cadastrar"
                      >
                        Cadastrar
                      </button>
                    </div>
                  </div>
                  <div
                    className={`${active === 'login' ? 'hidden' : ''} flex items-center justify-center flex-col h-full w-full`}
                  >
                    <h1 className="text-3xl font-bold mb-4">Seja bem-vindo!</h1>
                    <p className="text-sm leading-5 tracking-tight my-5">
                      Faça o registro para continuar
                    </p>
                    <div className="flex flex-col gap-1 justify-center items-center">
                      <p className="text-sm leading-5 tracking-tight my-5">
                        Já tem cadastro?
                      </p>
                      <button
                        className="border rounded-xl p-2 px-6"
                        onClick={() => setActive('login')}
                        aria-label="Fazer Login"
                      >
                        Fazer Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
