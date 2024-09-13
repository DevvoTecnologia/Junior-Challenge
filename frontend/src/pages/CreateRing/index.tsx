import { Container, ContentFormLogin } from './style'
import Form from '../../components/Form'
import { IPropsInput } from '../../interfaces/IPropsInput'
import { useRings } from '../../contexts/rings/Rings'
import { useLocation } from 'react-router-dom'
import Template from '../../components/Template'

const CreateRing = () => {
  const { setValue, handleSubmit, handleCreateRings, handleUpdateRing, forgers, watch } = useRings()
  const location = useLocation()
  const forgedBy = watch('forgedBy') ?? ''

  const isUpdatingRings = location.pathname.includes('/aneis/atualizar')

  const INPUTS: Array<IPropsInput> = [
    {
      size: 'medium',
      placeholder: 'Nome',
      type: 'text',
      // value={email},
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('name', event?.target.value)
      }
    },
    {
      size: 'medium',
      placeholder: 'Portador',
      type: 'text',
      // value={password},
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('owner', event?.target.value)
      }
    },
    {
      size: 'medium',
      placeholder: 'Poder',
      type: 'text',
      // value={password},
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
    <Template>
      <Container>
        <ContentFormLogin>
          <Form
            handleSubmit={handleSubmit}
            method={isUpdatingRings ? 'put' : 'post'}
            title={isUpdatingRings ? 'Editar anel' : 'Criar anel'}
            onClickButton={isUpdatingRings ? handleUpdateRing : handleCreateRings}
            titleButton={isUpdatingRings ? 'Editar' : 'Criar'}
            textInformation={`Preencha as informações para ${
              isUpdatingRings ? 'editar' : 'cadastrar'
            } um anel`}
            inputs={INPUTS}
          />
        </ContentFormLogin>
      </Container>
    </Template>
  )
}

export default CreateRing
