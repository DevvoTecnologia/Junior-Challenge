import { useContext, useState, type ChangeEvent } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate()
  const [name, setName] = useState('');
 
  const [email, setEmail] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createPassword, setCreatePassword] = useState('');

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleNamelInput = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleCreateEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCreateEmail(event.target.value)
  }

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleCreatePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCreatePassword(event.target.value)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if(email && password) {
      const isLogged = await auth.signin(email, password);
      if(isLogged) {
        navigate('/');
        toast.success('Login feito com sucesso!');
      }else{
        toast.error('Não foi possível logar!');
      }
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if(createEmail && createPassword && name) {
      const register = await auth.register(createEmail, createPassword, name);
      if(register) {
        navigate('/');
        toast.success('Cadastro feito com sucesso!');
      }else{
        toast.error('Não foi possível logar!');
      }
    }else{
      toast.error('Preencha todos os campos!');
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-500">Bem-vindo ao Mundo dos Anéis</h1>

        <div className="grid gap-6">
          <form className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-300">Formulário de Login</h2>
            
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={email}
                onChange={handleEmailInput}
                placeholder="Digite seu e-mail"
                className="p-3 rounded-md border border-gray-600 bg-gray-800 placeholder-gray-400 text-white"
              />
              <input
                type="password"
                value={password}
                onChange={handlePasswordInput}
                placeholder="Digite sua senha"
                className="p-3 rounded-md border border-gray-600 bg-gray-800 placeholder-gray-400 text-white"
              />
              <button
                type="button"
                onClick={handleLogin}
                className="w-full py-3 bg-yellow-500 text-gray-900 rounded-md font-semibold hover:bg-yellow-600"
              >
                Fazer Login
              </button>
            </div>
          </form>

          <hr className="border-gray-600" />

          <form className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-300">Formulário de Cadastro</h2>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={name}
                onChange={handleNamelInput}
                placeholder="Digite seu nome"
                className="p-3 rounded-md border border-gray-600 bg-gray-800 placeholder-gray-400 text-white"
              />
              <input
                type="text"
                value={createEmail}
                onChange={handleCreateEmailInput}
                placeholder="Digite seu e-mail"
                className="p-3 rounded-md border border-gray-600 bg-gray-800 placeholder-gray-400 text-white"
              />
              <input
                type="password"
                value={createPassword}
                onChange={handleCreatePasswordInput}
                placeholder="Digite sua senha"
                className="p-3 rounded-md border border-gray-600 bg-gray-800 placeholder-gray-400 text-white"
              />
              <button
                type="button"
                onClick={handleRegister}
                className="w-full py-3 bg-yellow-500 text-gray-900 rounded-md font-semibold hover:bg-yellow-600"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}