import { useNavigate } from 'react-router-dom'
import CarrouselCards from '../../components/CarrouselCards'
import EmptyMessage from '../../components/EmptyMessage'
import Template from '../../components/Template'
import { useRings } from '../../contexts/rings/Rings'

import {
  Container,
  ContainerCarrossel,
  ContainerContent,
  ContainerHeaderSubtitle,
  Subtitle
} from './style'
import Buttons from '../../components/Button'

const Home = () => {
  const { rings } = useRings()
  const navigate = useNavigate()
  return (
    <Template>
      <Container>
        <ContainerContent>
          <h1>Visão geral</h1>
          <ContainerHeaderSubtitle>
            <Subtitle>Aqui você vai conseguir visualizar todos os aneis criados.</Subtitle>
            <Buttons onClick={() => navigate('/aneis/cadastro')}>Cadastrar</Buttons>
          </ContainerHeaderSubtitle>

          <ContainerCarrossel>
            {rings?.length ? (
              <CarrouselCards rings={rings} />
            ) : (
              <EmptyMessage message='Nenhum anel cadastrado!' />
            )}
          </ContainerCarrossel>
        </ContainerContent>
      </Container>
    </Template>
  )
}

export default Home
