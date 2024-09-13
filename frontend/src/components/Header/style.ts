import styled from 'styled-components'
import colors from '../../styles/colors'
import LogoutIcon from '@mui/icons-material/Logout'

export const Container = styled.div`
  width: 100%;
  height: 10vh;
  padding: 10px;
  background-color: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    color: ${colors.white};
    font-size: 32px;
    margin-left: 50px;
  }
`
export const ContainerLinks = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  color: ${colors?.white};
  font-size: 16px;

  @media (max-width: 478px) {
    display: none;
  }

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    list-style: none;

    li a {
      text-decoration: none;
      color: ${colors?.white};
    }
  }

  :hover {
    cursor: pointer;
  }
`

export const Logout = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  color: ${colors?.white};
  font-size: 16px;
  border: none;
  text-decoration: none;
  background-color: transparent;
  margin: 0 10px;

  :hover {
    cursor: pointer;
  }
`
export const IconLogout = styled(LogoutIcon)`
  color: ${colors?.white};
  font-size: 20px;
`
