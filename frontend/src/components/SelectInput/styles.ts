import styled from 'styled-components'
import colors from '../../styles/colors'

interface IProps {
  borderColor?: string
  borderColorFocus: string
  backgroundColor?: string
  width?: string
  border?: string
  borderRadius?: string
}

export const InputSelectStyle = styled.select<IProps>`
  flex: 1;
  width: 97%;
  margin: 10px auto;
  padding: 5px;
  border-radius: ${(props) => props?.borderRadius ?? '4px'};
  border: ${(props) =>
    props?.border
      ? props?.border
      : props?.borderColor
      ? `1px solid ${props?.borderColor}`
      : 'none'};
  background: ${(props) => props?.backgroundColor ?? colors.white};
  font-size: 18px;
  min-height: 50px !important;
  border: 2px solid ${colors?.whiteGray};

  color: ${colors?.whiteGray};

  &:focus {
    outline: none;
    border: ${(props) => `2px solid ${props?.borderColorFocus}`};
  }

  @media (max-width: 360px) {
    width: 100%;
  }
`

export const ContainerFieldset = styled.fieldset`
  /* width: 100%; */
  border-radius: 8px;
  border: none;
  display: flex;

  &:focus {
    outline: none;
    border: 1px solid #f01 !important;
    box-shadow: 0 0 0 2px rgba(240, 1, 1, 0.5);
  }

  &:focus-visible {
    border: 1px solid #00f;
  }
`
