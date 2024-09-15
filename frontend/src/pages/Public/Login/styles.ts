import styled from "styled-components";
import background from "../../../assets/image/background.jpg";

export const Container = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  justify-content: center;

  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Content = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  padding: 32px;
  width: 100%;
  max-width: 400px;
  text-align: center;

  h1 {
    font-size: 28px;
    color: #5c5c5c;

    margin-bottom: 20px;
  }
`;

export const ContainerSignUp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  margin-bottom: 10px;

  > p {
    font-size: 14px;

    color: #333;
  }

  > a {
    text-decoration: none;

    > span {
      font-size: 14px;

      color: #333;

      &:hover {
        color: #aaa;
      }
    }
  }
`;
