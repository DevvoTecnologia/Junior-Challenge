import './styles.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../../components/user-form/UserForm';
import { addUser } from '../../api/user';
import { toast } from 'react-toastify'

const Register: React.FC = () => {
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleRegister = async (username: string, password: string) => {

        try {
            await addUser(username, password);
            toast.success('Registro bem-sucedido');
            navigate('/');
        } catch (error: any) {
            setError(error.message || "Erro ao registrar. Tente novamente.");
            console.error("Erro ao registrar:", error);
        }
    };

    return (
        <>
            <div className="register-container">
                <UserForm
                    onSubmit={handleRegister}
                    formTitle="Registrar"
                    submitButtonText="Cadastrar"
                    errorMessage={error}
                    showBackButton={true}
                />
            </div>
        </>

    );
};

export default Register;
