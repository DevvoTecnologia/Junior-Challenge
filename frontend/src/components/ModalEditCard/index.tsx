import React, { Dispatch, SetStateAction, useEffect } from 'react'
import ModalDialog from '../ModalDialog'
import { ContainerContentWrapper } from './styles'
import { ContainerButtons } from '../CardRing/styles'
import { useRings } from '../../contexts/rings/Rings'
import { IPropsInput } from '../../interfaces/IPropsInput'
import { IRings } from '../../interfaces/IRings'
import Form from '../Form'
import Buttons from '../Button'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface IProps {
  isShowModal: boolean
  setIsShowModal: Dispatch<SetStateAction<boolean>>
  ring: IRings
}

const ModalEditCard = ({ ring, isShowModal, setIsShowModal }: IProps) => {
  const { setValue, handleSubmit, handleUpdateRing, forgers, watch } = useRings()
  const isSmallScreen = useMediaQuery('(max-width: 478px)')
  const name = watch('name')
  const owner = watch('owner')
  const power = watch('power')
  const forgedBy = watch('forgedBy') || watch('ForgerId')

  const handlePopulateInfoCard = () => {
    setValue('name', ring?.name)
    setValue('owner', ring?.owner)
    setValue('power', ring?.power)
    setValue('forgedBy', ring?.forgedBy ?? ring?.ForgerId)
  }

  useEffect(() => {
    handlePopulateInfoCard()
  }, [isShowModal])

  const INPUTS: Array<IPropsInput> = [
    {
      size: 'medium',
      placeholder: 'Nome',
      type: 'text',
      value: name,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('name', event?.target.value)
      }
    },
    {
      size: 'medium',
      placeholder: 'Portador',
      type: 'text',
      value: owner,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('owner', event?.target.value)
      }
    },
    {
      size: 'medium',
      placeholder: 'Poder',
      type: 'text',
      value: power,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('power', event?.target.value)
      }
    },
    {
      size: 'medium',
      placeholder: 'Forjado por:',
      type: 'text',
      isSelect: true,
      options: forgers ?? [],
      value: forgedBy,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('forgedBy', event?.target.value)
      }
    }
  ]

  return (
    <ModalDialog
      title='Editar card'
      open={isShowModal}
      setOpen={setIsShowModal}
      closeIcon
      width='100%'
      maxWidth='500px'
      height={isSmallScreen ? '70vh' : 'auto'}
    >
      <ContainerContentWrapper>
        <Form
          isShowButton={false}
          handleSubmit={handleSubmit}
          method={'put'}
          title={'Editar anel'}
          onClickButton={handleUpdateRing}
          titleButton={'Editar'}
          textInformation={`Preencha as informações para ${'editar'} um anel`}
          inputs={INPUTS}
        />

        <ContainerButtons>
          <Buttons typeButton='outline' onClick={() => setIsShowModal((oldState) => !oldState)}>
            Cancelar
          </Buttons>

          <Buttons
            type='submit'
            onClick={() => {
              setValue('id', ring?.id)
              handleUpdateRing()
              setIsShowModal((oldState) => !oldState)
            }}
          >
            Editar
          </Buttons>
        </ContainerButtons>
      </ContainerContentWrapper>
    </ModalDialog>
  )
}

export default ModalEditCard
