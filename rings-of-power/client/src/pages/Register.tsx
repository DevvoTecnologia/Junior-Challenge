import styled from "styled-components";
import backgroundImage from "../assets/wallpaper-lord-of-rings.jpg";
import { useRing } from "../Providers/Ring";
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

export const Register = () => {
  const { loadRings, rings } = useRing();
  const navigate = useNavigate();

  return <Container></Container>;
};
