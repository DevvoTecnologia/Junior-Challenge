import styled from 'styled-components'
import colors from '../../styles/colors'

export const ContainerFormLogin = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 20px 10px;
  min-height: 60vh;

  h2 {
    font-size: 30px;
    color: ${colors?.blue};
  }

  span {
    font-size: 14px;
    color: ${colors?.gray};
  }
`

export const ButtonLogin = styled.button`
  margin-top: 30px;
  border: none;
  background-color: ${colors.blue};
  width: 100%;
  padding: 10px 20px;
  border-radius: 32px;
  color: ${colors.white} !important;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: ${colors.blue};
    filter: brightness(80%);
  }

  &:disabled {
    background-color: ${colors.disabled};
    color: #aaa;

    span {
      color: #aaa;
    }
  }

  span {
    color: ${colors.white};
    font-size: 14px;
  }
`
export const ContainerText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px auto;
  gap: 5px;
`

export const TextHighlighted = styled.span`
  font-size: 14px;
  color: ${colors.blue} !important;
  text-align: center;
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
`
