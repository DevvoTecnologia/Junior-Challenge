import React, { useState } from 'react';
import './styles.scss'
import { useNavigate } from 'react-router-dom';

interface UserFormProps {
    onSubmit: (username: string, password: string) => Promise<void>;
    formTitle: string;
    submitButtonText: string;
    errorMessage?: string;
    showRegisterButton?: boolean;
    showBackButton?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, formTitle, submitButtonText, errorMessage, showRegisterButton = false, showBackButton = false }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit(username, password);
    };

    return (
        <div className="user-form-container">
            <h2>{formTitle}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuário:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}

                <div className="buttons-container">
                    {showRegisterButton && (
                        <button className="register-btn" type='button' onClick={() => navigate('/register')}>Registrar</button>
                    )}
                    {showBackButton && (
                        <button className="back-btn" type='button' onClick={() => navigate('/')}>Voltar</button>
                    )}
                    <button className="login-btn" type="submit">{submitButtonText}</button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
