// pages/Login/index.tsx
import './styles.scss';
import { useState } from 'react';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import UserForm from '../../components/user-form/UserForm';
import { toast } from 'react-toastify'


const Login: React.FC = () => {
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (username: string, password: string) => {
        try {
            await login(username, password);
            toast.success('Login bem-sucedido, seja bem vindo')
            navigate('/aneis');
        } catch (error: any) {
            setError(error.message || "Erro ao fazer login. Verifique suas credenciais.");
            console.error("Erro ao fazer login:", error);
        }
    };

    return (
        <>
            <div className='login-container'>
                <UserForm
                    onSubmit={handleLogin}
                    formTitle="Login"
                    submitButtonText="Entrar"
                    errorMessage={error}
                    showRegisterButton={true}
                />
            </div>
        </>


    );
};

export default Login;
