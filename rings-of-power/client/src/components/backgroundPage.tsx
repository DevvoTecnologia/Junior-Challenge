import styled from "styled-components";
import backgroundImage from "../assets/wallpaper-lord-of-rings.jpg";
import { useNavigate } from "react-router-dom";
import { FC, ReactElement, useEffect, useState } from "react";
const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: flex-end;
  background-color: var(--black);
  background-image: url(${backgroundImage});
  background-size: contain;
  background-position: left;
  background-repeat: no-repeat;
  gap: 1em;

  @media (max-width: 600px) {
    align-items: flex-start;
  }
`;

const BoxButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  width: 100%;
  height: 10vh;
  padding: 1em;

  > button {
    cursor: pointer;
    color: var(--green-dark);
    background: transparent;
    border: 1px solid var(--green-dark);
    border-radius: 0.5em;
    font-size: 1.2em;
    width: 8em;
    height: 2em;
    align-self: center;
    transition: all 0.4s ease-in-out;

    &:hover {
      background: var(--green-dark);
      color: var(--black);
    }
  }
`;

export const Background: FC<{
  children: ReactElement;
  page: string;
  redirect: string;
}> = ({ children, page, redirect }) => {
  const navigate = useNavigate();
  const [home, setHome] = useState(true);
  useEffect(() => {
    if (page !== "home") {
      setHome(false);
    }
  }, []);

  return (
    <Container>
      <BoxButton>
        <button onClick={() => navigate(redirect)}>
          {home ? "Criar um anel" : "Voltar"}
        </button>
      </BoxButton>
      {children}
    </Container>
  );
};
