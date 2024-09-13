import React from 'react'
import { Container, ContainerLinks, IconLogout, Logout } from './style'
import { useAuth } from '../../contexts/auth/Auth'

const Header = () => {
  const { logout } = useAuth()

  const OPTIONS_MENU = [
    {
      title: 'Cadastrar',
      link: '/aneis/cadastro'
    }
  ]

  return (
    <Container>
      <h1>Devvo</h1>

      <ContainerLinks>
        <ul>
          {OPTIONS_MENU?.map((option: { title: string; link: string }, index: number) => (
            <li key={index}>
              <a href={option?.link}>{option?.title}</a>
            </li>
          ))}
        </ul>
      </ContainerLinks>

      <Logout onClick={logout}>
        <span>Sair</span>
        <IconLogout />
      </Logout>
    </Container>
  )
}
export default Header
