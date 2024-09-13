import React, { Dispatch, SetStateAction } from 'react'
import ModalDialog from '../ModalDialog'
import { ContainerContentWrapper, Subtitle, Title } from './styles'
import { ContainerButtons } from '../CardRing/styles'
import { useRings } from '../../contexts/rings/Rings'
import Buttons from '../Button'

interface IProps {
  isShowModal: boolean
  setIsShowModal: Dispatch<SetStateAction<boolean>>
  id: string
}

const ModalRemoveCard = ({ id, isShowModal, setIsShowModal }: IProps) => {
  const { handleDeleteRing, setValue } = useRings()

  return (
    <ModalDialog
      title='Deletar card'
      open={isShowModal}
      setOpen={setIsShowModal}
      closeIcon
      width='100%'
      maxWidth='500px'
    >
      <ContainerContentWrapper>
        <Title>Você tem certeza que deseja deletar?</Title>

        <Subtitle>Após concluir a ação o item será deletado permanentemente.</Subtitle>

        <ContainerButtons>
          <Buttons onClick={() => setIsShowModal((oldState) => !oldState)}>Cancelar</Buttons>

          <Buttons
            isDanger
            type='submit'
            onClick={() => {
              setValue('id', id)
              handleDeleteRing()
              setIsShowModal((oldState) => !oldState)
            }}
          >
            Excluir
          </Buttons>
        </ContainerButtons>
      </ContainerContentWrapper>
    </ModalDialog>
  )
}

export default ModalRemoveCard
