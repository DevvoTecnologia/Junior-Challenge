import styled from "styled-components";
import { Ring, useRing } from "../Providers/Ring";
import { Background } from "../components/backgroundPage";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../services/api";
import { useState } from "react";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const FormContainer = styled.div`
  display: flex;
  width: 75%;
  height: 100%;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-content: flex-start;
  overflow: auto;
  @media (max-width: 600px) {
    width: 90%;
  }
  > h2 {
    color: var(--light);
  }
  > form {
    display: flex;
    flex-direction: column;
    min-width: 60%;
    height: auto;
    gap: 1em;
    max-width: 75%;
    @media (max-width: 600px) {
      max-width: 100%;
      width: 90%;
    }
    > label {
      font-size: 1em;
      color: var(--light);
      margin-bottom: -1em;
    }

    > input {
      border-radius: 1em;
      border: 0.1em solid;
      border-color: var(--black);
      height: 2.5em;
      padding: 1em;

      background: var(--light);
      font-weight: 300;
      font-size: 1em;
      line-height: 1em;

      @media (max-width: 500px) {
        font-size: 1.2em;
      }
      @media (min-width: 1200px) {
        font-size: 1.5em;
      }
      @media (min-width: 1800px) {
        font-size: 2em;
      }

      @media (min-width: 3000px) {
        font-size: 3em;
      }
    }
    > span {
      text-align: start;
      color: var(--red);
      font-size: 1em;
      margin-top: -1em;
    }

    > select {
      border-radius: 1em;
      border: 0.1em solid;
      height: 2.5em;
      padding: 0 1em;

      background: var(--light);
      font-weight: 300;
      font-size: 1em;
      line-height: 1em;
      @media (max-width: 500px) {
        font-size: 1.2em;
      }
      @media (min-width: 1200px) {
        font-size: 1.5em;
      }
      @media (min-width: 1800px) {
        font-size: 2em;
      }

      @media (min-width: 3000px) {
        font-size: 3em;
      }
    }

    .submit-button {
      cursor: pointer;
      color: var(--light);
      background: transparent;
      border: 1px solid var(--light);
      border-radius: 0.5em;
      font-size: 1.2em;
      width: 8em;
      height: 2em;
      align-self: center;
      transition: all 0.4s ease-in-out;

      &:hover {
        background: var(--light);
        color: var(--black);
      }
    }
  }
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
  width: 100%;
  color: var(--green-dark);

  > img {
    width: 20em;
    height: 10em;
    object-fit: cover;
    border-radius: 0.5em;
  }
`;
const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  color: var(--red);
  background-color: var(--red-opacity);
  padding: 1em;
  border-radius: 0.5em;
  margin-bottom: 1em;
  font-size: 0.9em;
  line-height: 1.2em;

  > p {
    margin: 0.2em 0;
  }
`;
export const Register = () => {
  const defaultUrlImage =
    "https://ovicio.com.br/wp-content/uploads/2022/01/20220119-ovicio-lord-of-the-ring-rise-to-war.jpg";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Ring>();
  const [apiErrors, setApiErrors] = useState<string[]>([]);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Estado para controlar o alerta

  const onSubmit: SubmitHandler<Ring> = (data) => {
    const formattedData = {
      nome: data.nome,
      poder: data.poder,
      imagem: data.imagem,
      forjadoPorId: Number(data.forjadoPor),
      portador: { nome: data.portador },
    };
    api
      .post("/ring", formattedData)
      .then((response) => {
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000);
        setApiErrors([]);
      })
      .catch((error) => {
        const apiErrorMessages = Array.isArray(error.response?.data?.errors)
          ? error.response.data.errors.map(
              (err: { message: string }) => err.message
            )
          : [error.response?.data?.message || "Erro desconhecido"];

        setApiErrors(apiErrorMessages);
      });
  };

  const imageUrl = watch("imagem") || defaultUrlImage;

  return (
    <Background page="register" redirect="/">
      <FormContainer>
        {showSuccessAlert && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            O anel foi criado com sucesso!
          </Alert>
        )}
        <h2>Criar um anel</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="nome">Nome do Anel</label>
          <input
            id="nome"
            placeholder="Nome do anel"
            {...register("nome", { required: "Nome é obrigatório" })}
          />
          {errors.nome && <span>{errors.nome.message}</span>}

          <label htmlFor="portador">Portador</label>
          <input
            id="portador"
            placeholder="Portador"
            {...register("portador", { required: "Portador é obrigatório" })}
          />
          {errors.portador && <span>{errors.portador.message}</span>}

          <label htmlFor="poder">Poder do Anel</label>
          <input
            id="poder"
            placeholder="Poder do anel"
            {...register("poder", { required: "Poder é obrigatório" })}
          />
          {errors.poder && <span>{errors.poder.message}</span>}

          <label htmlFor="imagem">URL da Imagem</label>
          <input
            id="imagem"
            defaultValue={defaultUrlImage}
            placeholder="Url da imagem"
            {...register("imagem", { required: "Imagem é obrigatório" })}
          />
          {errors.imagem && <span>{errors.imagem.message}</span>}

          <ImgBox>
            <img src={imageUrl} alt="Visualização do anel" />
            <p>Pré-visualização da imagem</p>
          </ImgBox>

          <label htmlFor="forjadoPor">Forjado por</label>
          <select
            id="forjadoPor"
            {...register("forjadoPor", { required: "Forjador é obrigatório" })}
          >
            <option value="" disabled hidden>
              Escolha um forjador
            </option>
            <option value={1}>Elfos</option>
            <option value={2}>Anões</option>
            <option value={3}>Homens</option>
            <option value={4}>Sauron</option>
          </select>
          {errors.forjadoPor && <span>{errors.forjadoPor.message}</span>}

          <button className="submit-button" type="submit">
            Enviar
          </button>
        </form>

        {apiErrors.length > 0 && (
          <ErrorBox>
            {apiErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </ErrorBox>
        )}
      </FormContainer>
    </Background>
  );
};
