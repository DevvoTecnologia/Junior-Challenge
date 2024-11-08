import React, { useEffect, useState } from 'react';
import styles from './css/Form.module.css';
import { getPortadores } from '../services/PortadorService';
import { getEtnias } from '../services/EtniaService';
import { useForm } from 'react-hook-form';
import {
  createAnel,
  deleteAnel,
  getAnelById,
  updateAnel,
} from '../services/AnelService';
import { useNavigate } from 'react-router-dom';

const Form = ({ id = '' }) => {
  const [anel, setAnel] = useState();
  const [portadores, setPortadores] = useState([]);
  const [etnias, setEtnias] = useState([]);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [alert, setAlert] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = id
        ? await updateAnel(data, id, setAlert)
        : await createAnel(data, setAlert);

      if (response) navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAnel = async (id) => {
    try {
      await deleteAnel(id);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const getPortadoresData = async () => {
    try {
      const portadores = await getPortadores();

      setPortadores(portadores);
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao retornar os portadores');
    }
  };

  const getEtniasData = async () => {
    try {
      const etnias = await getEtnias();

      setEtnias(etnias);
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao retornar as etnias');
    }
  };

  const getAnelByIdData = async () => {
    try {
      const anelData = await getAnelById(id);

      setAnel(anelData);
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao retornar as etnias');
    }
  };

  useEffect(() => {
    if (!portadores.length) getPortadoresData();
    if (!etnias.length) getEtniasData();
    if (id && !anel) getAnelByIdData();
  }, [anel]);

  if (id && !anel)
    return (
      <div>
        <span>Carregando...</span>
      </div>
    );

  return (
    <>
      {alert && (
        <div className="alert alert-warning" role="alert">
          <span>{alert}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form} p-3 d-flex flex-column`}
      >
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-1">
          <div className="form-floating mb-3 w-100">
            <input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              placeholder="Nome do anel"
              {...register('nome')}
              defaultValue={anel ? anel.nome : ''}
              required
            />
            <label htmlFor="nome">Nome</label>
          </div>
          <div className="form-floating mb-3 w-100">
            <input
              type="text"
              className="form-control"
              id="imagem_url"
              name="imagem_url"
              placeholder="Url da imagem"
              {...register('imagem_url')}
              defaultValue={anel ? anel.imagem_url : ''}
              required
            />
            <label htmlFor="imagem_url">Imagem URL</label>
          </div>
        </div>
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-1 ">
          <div className="form-floating mb-3 w-100">
            <select
              className="form-select"
              id="forjadoPor"
              name="forjadoPor"
              {...register('forjadoPor')}
              required
            >
              <option value="">Selecione o forjador</option>
              {etnias.map((etnia) => {
                return (
                  <option
                    value={etnia._id}
                    key={etnia._id}
                    selected={etnia._id === (anel ? anel.forjadoPor : '')}
                  >
                    {etnia.nome}
                  </option>
                );
              })}
            </select>
            <label htmlFor="forjadoPor">Forjador por</label>
          </div>
          <div className="form-floating mb-3 w-100">
            <select
              className="form-select"
              id="portador"
              name="portador"
              {...register('portador')}
              required
            >
              <option value="">Selecione um portador</option>
              {portadores.map((portador) => {
                return (
                  <option
                    value={portador._id}
                    key={portador._id}
                    selected={portador._id === (anel ? anel.portador._id : '')}
                  >
                    {portador.nome} - {portador.etnia.nome}
                  </option>
                );
              })}
            </select>
            <label htmlFor="portador">Portador</label>
          </div>
        </div>
        <div>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Poder"
              id="poder"
              name="poder"
              {...register('poder')}
              defaultValue={anel ? anel.poder : ''}
              required
            ></textarea>
            <label htmlFor="poder">Descreva o poder</label>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3 gap-3">
          <button type="submit" className="btn btn-primary ">
            {id ? 'Atualizar' : 'Cadastrar'}
          </button>
          {id && (
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteAnel(anel._id)}
            >
              Apagar
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Form;
