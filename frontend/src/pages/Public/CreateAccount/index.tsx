import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as yup from "yup";
import InputForm from "../../../components/InputForm";
import { Container, ContainerSignUp, Content } from "./styles";
import CustomButton from "../../../components/CustomButton";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const CreateAccount = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const { register } = useAuth();

  const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("Senha é obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "As senhas devem ser iguais!")
      .required("Confirmação de senha é obrigatória"),
  });

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await schema.validate(
        { name, email, password, confirmPassword },
        { abortEarly: false }
      );
      // await register(name, email, password, confirmPassword);
      toast.success("Registro realizado com sucesso!");
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast.error(err.message || "Registro falhou. Tente novamente.");
      }
    }
  };

  return (
    <>
      <Container>
        <Content>
          <h1>Faça seu registro</h1>

          <form onSubmit={handleRegister}>
            <InputForm
              label="Nome"
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              icon={<FaUser />}
            />

            <InputForm
              label="Email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<FaEnvelope />}
              error={errors.email}
            />

            <InputForm
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<FaLock />}
              error={errors.password}
            />

            <InputForm
              label="Confirme sua senha"
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<FaLock />}
              error={errors.confirmPassword}
            />

            <ContainerSignUp>
              <p>Já tem uma conta?</p>
              <Link to="/login">
                <span>Entrar</span>
              </Link>
            </ContainerSignUp>

            <CustomButton type="submit">Registrar</CustomButton>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default CreateAccount;
