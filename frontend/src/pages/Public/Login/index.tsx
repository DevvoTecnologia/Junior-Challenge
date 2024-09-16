import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as yup from "yup";
import InputForm from "../../../components/InputForm";
import { Container, ContainerSignUp, Content } from "./styles";
import CustomButton from "../../../components/CustomButton";
import { useAuth } from "../../../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const { login } = useAuth();

  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("Senha é obrigatória"),
  });

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await schema.validate({ email, password }, { abortEarly: false });
      // await login(email, password);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        setErrors({ global: "Credenciais inválidas. Tente novamente." });
      }
    }
  };

  return (
    <Container>
      <Content>
        <h1>Faça seu login</h1>

        <form onSubmit={handleLogin}>
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

          <ContainerSignUp>
            <p>Não tem uma conta?</p>
            <Link to="/create-account">
              <span>Criar conta</span>
            </Link>
          </ContainerSignUp>

          <CustomButton type="submit">Entrar</CustomButton>
        </form>
      </Content>
    </Container>
  );
};

export default Login;
