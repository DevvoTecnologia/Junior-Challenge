import React, { ReactNode } from 'react'
import Footer from '../Footer'
import Header from '../Header'
import { Container } from './styles'

interface IProps {
  children: ReactNode
}

const Template = ({ children }: IProps) => (
  <Container>
    <Header />
    {children}
    <Footer />
  </Container>
)

export default Template
