import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

import { api } from '../../api/axios';
import { ERROR, SUCCESS } from '../../constants';

import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      await api.post('/login', { email });

      toast("Um link foi enviado para seu e-mail!", SUCCESS);
    } catch (error) {
      console.log(error);
      toast("Erro ao enviar o link", ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.container_main}>
      <ToastContainer />
      <h1 className={styles.title}>
        Autenticação via e-mail
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="Digite seu e-mail"
          required
        />
        <button className={styles.button} type="submit">
          {isLoading ? (
            <ClipLoader color="#FFF" size={24} />
          ) : (
            'Enviar Link Mágico'
          )}
        </button>

      </form>
    </section>
  );
};

export default Login;
