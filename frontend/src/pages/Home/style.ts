import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  margin: 10px auto;
  width: 95%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    flex-direction: column-reverse;
  }
`

export const Subtitle = styled.h4`
  font-weight: 100;
  font-size: 16px;
`

export const ContainerContent = styled.div`
  width: 100%;
  max-width: 1300px;
  min-height: 65vh;
  margin: 0 auto;
  padding: 10px;

  @media (max-width: 1200px) {
    width: 95%;
  }
`

export const ContainerCarrossel = styled.div`
  width: 100%;

  margin: 20px 0;
`

export const ContainerHeaderSubtitle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;

  .buttonRegister {
    border: none;
    display: flex;
    padding: 7px 15px;
    align-items: center;
    border-radius: 4px;
    justify-content: center;
    color: ${colors?.white};
    background-color: ${colors?.blue};

    :hover {
      cursor: pointer;
    }
  }
`
