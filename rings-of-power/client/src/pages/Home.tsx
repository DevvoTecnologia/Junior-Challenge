import styled from "styled-components";
import { useRing } from "../Providers/Ring";
import { CardRing } from "../components/cardRing";
import { Background } from "../components/backgroundPage";
import { useEffect } from "react";

const BoxItems = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  width: 75%;
  height: 85vh;
  overflow-y: auto;
  padding: 1em;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: row;
    gap: 1em;
    overflow-x: auto;
    overflow-y: hidden;
    align-items: center;
    width: 100%;
  }

  > h2 {
    color: var(--green-dark);
  }
`;

const NotFound = styled.div`
  display: flex;
  width: 75%;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  > h1 {
    color: var(--green-dark);
  }
`;

export const Home = () => {
  const { loadRings, rings } = useRing();
  console.log({ rings });
  useEffect(() => loadRings, []);

  return (
    <Background page="home" redirect="/register">
      <>
        {rings.length && (
          <BoxItems>
            {rings.map((ring, i) => (
              <CardRing
                data={ring}
                loadRings={loadRings}
                key={`${ring.nome}+${i}`}
              />
            ))}
          </BoxItems>
        )}
        {!rings.length && (
          <NotFound>
            <h1>Sem anéis cadastrados no momento</h1>
          </NotFound>
        )}
      </>
    </Background>
  );
};
