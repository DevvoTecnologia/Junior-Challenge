import { useNavigate } from 'react-router-dom'
import Form from '../../components/Form'
import { ContainerText, TextHighlighted } from '../../components/Form/styles'
import { IPropsInput } from '../../interfaces/IPropsInput'
import { Container, ContentFormLogin } from '../Login/style'
import { useAuth } from '../../contexts/auth/Auth'

const Register = () => {
  const navigate = useNavigate()
  const { setValue, handleSubmit, registerUser } = useAuth()
  const INPUTS: Array<IPropsInput> = [
    {
      size: 'medium',
      placeholder: 'E-mail',
      type: 'text',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('email', event?.target.value)
      }
    },
    {
      size: 'medium',
      placeholder: 'Senha',
      type: 'password',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('password', event?.target.value)
      }
    }
  ]

  return (
    <Container>
      <ContentFormLogin>
        <ContainerText>
          <span>Já tenho uma conta? </span>
          <TextHighlighted onClick={() => navigate('/login')}>Entrar agora!</TextHighlighted>
        </ContainerText>
        <Form
          handleSubmit={handleSubmit}
          method='post'
          // title='Entrar'
          onClickButton={registerUser}
          titleButton='Cadastrar'
          isTextRegister={false}
          textInformation='Preencha os dados para relizar o cadastro'
          inputs={INPUTS}
        ></Form>
      </ContentFormLogin>
    </Container>
  )
}

export default Register
