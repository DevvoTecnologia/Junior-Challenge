import { Container, ContentFormLogin } from './style'
import Form from '../../components/Form'
import { IPropsInput } from '../../interfaces/IPropsInput'
import { useAuth } from '../../contexts/auth/Auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { setValue, login, handleSubmit, watch } = useAuth()
  const navigate = useNavigate()
  const email = watch('email')
  const password = watch('password')

  const handleLogin = async () => {
    try {
      await login()
      navigate('/')
    } catch (error) {
      console.error('Login falhou', error)
    }
  }

  const INPUTS: Array<IPropsInput> = [
    {
      size: 'medium',
      placeholder: 'E-mail',
      type: 'text',
      value: email,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('email', event?.target.value)
      }
    },
    {
      size: 'medium',
      placeholder: 'Senha',
      type: 'password',
      value: password,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('password', event?.target.value)
      }
    }
  ]

  return (
    <Container>
      <ContentFormLogin>
        <Form
          handleSubmit={handleSubmit}
          method='post'
          title='Entrar'
          onClickButton={handleLogin}
          titleButton='Entrar'
          isTextRegister
          textInformation='Digite seu e-mail e senha cadastrados'
          inputs={INPUTS}
        ></Form>
      </ContentFormLogin>
    </Container>
  )
}

export default Login
