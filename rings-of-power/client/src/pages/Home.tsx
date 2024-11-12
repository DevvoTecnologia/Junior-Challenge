import styled from "styled-components";
import backgroundImage from "../assets/wallpaper-lord-of-rings.jpg";
import { useRing } from "../Providers/Ring";
import { useEffect } from "react";
import { CardRing } from "../components/cardRing";
import { useNavigate } from "react-router-dom";
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
`;

const BoxButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  width: 75%;
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
const BoxItems = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Define até 3 colunas */
  gap: 1em;
  width: 75%;
  height: 85vh;
  overflow-y: auto;
  padding: 1em;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr; /* 2 colunas em telas menores */
  }
`;

export const Home = () => {
  const { loadRings, rings } = useRing();
  const navigate = useNavigate();

  return (
    <Container>
      <BoxButton>
        <button onClick={() => navigate("/register")}>Criar um anel</button>
      </BoxButton>
      <BoxItems>
        {rings
          ? rings.map((ring, i) => (
              <CardRing data={ring} key={`${ring.nome}+${i}`} />
            ))
          : null}
      </BoxItems>
    </Container>
  );
};
