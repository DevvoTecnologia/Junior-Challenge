import styled from 'styled-components';

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding-top: 1rem;
  padding-right: 1.5rem;

  @media (max-width: 478px) {
    padding-top: 0;
  }
`;
