import React from 'react'
import { ButtonLogin, ContainerFormLogin, ContainerText, TextHighlighted } from './styles'
import Input from '../Input'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import { useNavigate } from 'react-router-dom'
import { IPropsInput } from '../../interfaces/IPropsInput'
import { UseFormHandleSubmit } from 'react-hook-form'
import SelectInput from '../SelectInput'

interface IProps<T> {
  title?: string
  textInformation?: string
  inputs: Array<IPropsInput>
  titleButton: string
  onClickButton: () => void
  isTextRegister?: boolean
  method: 'post' | 'get' | 'put' | 'delete' | 'patch'
  handleSubmit: UseFormHandleSubmit<T>
  isShowButton?: boolean
}

const Form = <T,>({
  title,
  textInformation,
  inputs,
  onClickButton,
  titleButton,
  isTextRegister,
  method,
  handleSubmit,
  isShowButton = true
}: IProps<T>) => {
  const navigate = useNavigate()

  return (
    <ContainerFormLogin method={method} onSubmit={handleSubmit(onClickButton)}>
      {title && <h2>{title}</h2>}
      {textInformation && <span>{textInformation}</span>}
      {inputs?.length > 0 &&
        inputs.map((input: IPropsInput, index: number) =>
          input?.isSelect ? (
            <SelectInput
              key={index}
              id={'select'}
              placeholder={input.placeholder}
              value={input.value}
              onChange={input.onChange}
              options={input.options}
              width='100%'
              optionDisabled={'Selecione'}
              style={{ maxHeight: '40px' }}
            />
          ) : (
            <Input
              key={index || input?.placeholder}
              onChange={input.onChange}
              size={input.size ?? 'medium'}
              placeholder={input.placeholder}
              type={input.type ?? 'text'}
              value={input.value}
              inputProps={{ maxLength: input?.maxLength ?? 30 }}
            />
          )
        )}
      {isShowButton ? (
        <ButtonLogin type='submit'>
          <span>{titleButton}</span>
          <ArrowForwardOutlinedIcon sx={{ fontSize: '20px', marginLeft: '5px' }} />
        </ButtonLogin>
      ) : null}
      {isTextRegister && (
        <ContainerText>
          <span>Ainda não tem conta? </span>
          <TextHighlighted onClick={() => navigate('/cadastro')}>Crie uma</TextHighlighted>
        </ContainerText>
      )}
    </ContainerFormLogin>
  )
}

export default Form
