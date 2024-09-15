import styled from "styled-components";

export const Container = styled.div`
  max-width: 1240px;
  padding: 20px;
  margin: 0 auto;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2rem;
    color: #333;
    flex-grow: 1;
    text-align: center;
  }

  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const ListContainer = styled.div`
  .slick-slide {
    padding: 0 10px; /* Adiciona um espaço de 10px entre os slides */
  }

  .slick-list {
    margin: 0 -10px; /* Ajusta a margem do contêiner para compensar o padding */
  }
`;

export const ContainerRingNotFound = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  > p {
    font-size: 24px;
    color: red;
  }
`;
