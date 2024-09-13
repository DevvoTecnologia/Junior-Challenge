import styled from 'styled-components'
import colors from '../../styles/colors'

export const ContainerContentWrapper = styled.div`
  width: 100%;
  max-width: 630px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  color: ${colors?.black};
  text-align: center;
  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`

export const Subtitle = styled.p`
  color: #585858;
  text-align: center;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  margin: 10px;

  .emphasis {
    color: ${colors?.red};
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
  }

  @media (max-width: 600px) {
    font-size: 18px;

    .emphasis {
      font-size: 18px;
    }
  }
`
