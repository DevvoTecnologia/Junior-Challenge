import { ReactNode, useEffect, useState } from 'react'
import {
  Control,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useForm
} from 'react-hook-form'
import { createContext } from 'use-context-selector'
import { IRings } from '../../interfaces/IRings'
import { useMutation } from '@tanstack/react-query'
import postCreateRing from '../../services/rings/post/postCreateRing'
import {
  IPropsCreateRing,
  IPropsResponseCreateRing
} from '../../services/rings/post/postCreateRing/types'
import { IError } from '../../interfaces/IError'
import toasts from '../../utils/toasts'
import backendMessagesConvert from '../../utils/backendMessagesConvert'
import putRing from '../../services/rings/put/putEditRing'
import { IPropsEditRing, IPropsResponseEditRing } from '../../services/rings/put/putEditRing/types'
import getAllRings from '../../services/rings/get/getAllRings'
import { IPropsResponseAllRings } from '../../services/rings/get/getAllRings/types'
import deleteRing from '../../services/rings/delete/deleteRing'
import {
  IPropsDeleteRing,
  IPropsResponseDeleteRing
} from '../../services/rings/delete/deleteRing/types'
import { IForgers, IPropsResponseAllForgers } from '../../services/forgers/get/getForgers/types'
import getForgers from '../../services/forgers/get/getForgers'
import {
  CREATE_CARRIED,
  FILL_ALL_FIELDS,
  ITEM_REMOVED,
  SELECT_ITEM_DELETE,
  UPDATE_CARRIED
} from '../../utils/messages'

export interface IRingsContextProps {
  rings: Array<IRings>
  forgers: Array<IForgers>
  watch: UseFormWatch<IRings>
  handleSubmit: UseFormHandleSubmit<IRings>
  register: UseFormRegister<IRings>
  getValues: UseFormGetValues<IRings>
  setValue: UseFormSetValue<IRings>
  control: Control<IRings>
  clearErrors: UseFormClearErrors<IRings>
  handleCreateRings: () => void
  handleUpdateRing: () => void
  handleDeleteRing: () => void
}

type RingsProviderProps = {
  children: ReactNode
}

export const RingsContext = createContext<IRingsContextProps>({} as IRingsContextProps)

export function RingsProvider({ children }: RingsProviderProps): JSX.Element {
  const [rings, setRings] = useState<Array<IRings>>([])
  const [forgers, setForgers] = useState<Array<IForgers>>([])
  const [informationsNewRing, setInformationsNewRing] = useState<IPropsEditRing>()

  const { watch, handleSubmit, register, getValues, setValue, control, clearErrors } =
    useForm<IRings>({
      mode: 'onChange'
    })

  const { mutate: mutatePostCreateRing } = useMutation<
    IPropsResponseCreateRing,
    IError,
    IPropsCreateRing
  >({
    mutationFn: postCreateRing,
    onSuccess: () => {
      toasts.success(CREATE_CARRIED)
      setTimeout(() => {
        window.location.replace('/')
      }, 4000)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toasts.error(backendMessagesConvert(error?.response?.data?.error?.message))
    }
  })
  const { mutate: mutatePutRing } = useMutation<IPropsResponseEditRing, IError, IPropsEditRing>({
    mutationFn: putRing,
    onSuccess: () => {
      toasts.success(UPDATE_CARRIED)
      const id = getValues('id')

      setRings((oldState) =>
        oldState?.map((ring: IRings) =>
          ring?.id === id ? { ...ring, ...informationsNewRing } : ring
        )
      )
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toasts.error(backendMessagesConvert(error?.response?.data?.error?.message))
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate: mutateAllRings } = useMutation<IPropsResponseAllRings, IError, any>({
    mutationFn: getAllRings,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      const rings = data?.data?.rings
      setRings(rings)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toasts.error(backendMessagesConvert(error?.response?.data?.error?.message))
    }
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate: mutateForgers } = useMutation<IPropsResponseAllForgers, IError, any>({
    mutationFn: getForgers,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      const forgers = data?.data?.forgers
      setForgers(forgers)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toasts.error(backendMessagesConvert(error?.response?.data?.error?.message))
    }
  })

  useEffect(() => {
    mutateAllRings({})
    mutateForgers({})
  }, [])

  const { mutate: mutateDeleteRing } = useMutation<
    IPropsResponseDeleteRing,
    IError,
    IPropsDeleteRing
  >({
    mutationFn: deleteRing,
    onSuccess: () => {
      toasts.success(ITEM_REMOVED)
      const id = getValues('id')
      setRings((oldState) => oldState?.filter((ring: IRings) => ring?.id !== id))
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toasts.error(backendMessagesConvert(error?.response?.data?.error?.message))
    }
  })

  const handleCreateRings = () => {
    const name = getValues('name')
    const power = getValues('power')
    const owner = getValues('owner')
    const forgedBy = getValues('forgedBy')
    const image = 'https://i.pinimg.com/originals/a8/df/a2/a8dfa2ee82e4e653df79431b957df07e.jpg'

    if (!name?.length || !power?.length || !owner?.length || !forgedBy) {
      toasts.error(FILL_ALL_FIELDS)
      return
    }

    const payload: IPropsCreateRing = {
      name,
      power,
      owner,
      forgedBy,
      imagem: image
    }

    mutatePostCreateRing(payload)
  }

  const handleDeleteRing = () => {
    const id = getValues('id')

    if (!id) {
      toasts.error(SELECT_ITEM_DELETE)
      return
    }

    mutateDeleteRing({ id })
  }

  const handleUpdateRing = () => {
    const id = getValues('id')
    const name = getValues('name')
    const power = getValues('power')
    const owner = getValues('owner')
    const forgedBy = getValues('forgedBy')

    const payload: IPropsEditRing = {
      name,
      power,
      owner,
      forgedBy,
      id
    }

    setInformationsNewRing(payload)

    mutatePutRing(payload)
  }

  return (
    <RingsContext.Provider
      value={{
        rings,
        watch,
        handleSubmit,
        register,
        getValues,
        setValue,
        control,
        clearErrors,
        handleCreateRings,
        handleUpdateRing,
        handleDeleteRing,
        forgers
      }}
    >
      {children}
    </RingsContext.Provider>
  )
}
