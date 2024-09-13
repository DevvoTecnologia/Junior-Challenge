import React, { useState } from 'react'
import { IRings } from '../../interfaces/IRings'
import {
  ContainerButtons,
  ContainerCardRings,
  ContainerDescription,
  ContainerHeaderCard,
  ContainerImage,
  ContainerOptions,
  ContainerStart
} from './styles'
import { useRings } from '../../contexts/rings/Rings'
import StarIcon from '@mui/icons-material/Star'
import colors from '../../styles/colors'
import ModalRemoveCard from '../ModalRemoveCard'
import ModalEditCard from '../ModalEditCard'
import { IForgers } from '../../services/forgers/get/getForgers/types'
import Buttons from '../Button'

interface IProps {
  ring: IRings
}

const CardRing = ({ ring }: IProps) => {
  const { forgers } = useRings()
  const [isShowModalDeleteCard, setIsShowModalDeleteCard] = useState<boolean>(false)
  const [isShowModalUpdateCard, setIsShowModalUpdateCard] = useState<boolean>(false)

  return (
    <>
      <ModalRemoveCard
        setIsShowModal={setIsShowModalDeleteCard}
        isShowModal={isShowModalDeleteCard}
        id={ring?.id}
      />
      <ModalEditCard
        setIsShowModal={setIsShowModalUpdateCard}
        isShowModal={isShowModalUpdateCard}
        ring={ring}
      />
      <ContainerOptions>
        <ContainerCardRings>
          <ContainerHeaderCard>
            <h4 className='title'>{ring?.name}</h4>
          </ContainerHeaderCard>

          <ContainerStart>
            {[1, 2, 3, 4, 5]?.map((item: number) => (
              <StarIcon key={item} sx={{ color: colors?.titleCard }} />
            ))}
          </ContainerStart>

          <ContainerImage>
            <img src={ring?.imagem} alt='' />
          </ContainerImage>

          <ContainerDescription>
            <p className='title'>Descrição:</p>

            <p className='description'>{ring?.power}</p>
          </ContainerDescription>

          <ContainerStart>
            <span className='text'>Forjado por:</span>
            <span className='author'>
              {forgers?.find((item: IForgers) => item?.id === ring?.ForgerId)?.name}
            </span>
          </ContainerStart>
        </ContainerCardRings>

        <ContainerButtons>
          <Buttons onClick={() => setIsShowModalUpdateCard((oldState) => !oldState)}>
            Editar
          </Buttons>
          <Buttons isDanger onClick={() => setIsShowModalDeleteCard((oldState) => !oldState)}>
            Deletar
          </Buttons>
        </ContainerButtons>
      </ContainerOptions>
    </>
  )
}

export default CardRing
