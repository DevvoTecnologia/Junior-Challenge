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
import { IUser } from '../../interfaces/IUser'
import { useMutation } from '@tanstack/react-query'
import postLogin from '../../services/users/post/postLogin'
import toasts from '../../utils/toasts'
import backendMessagesConvert from '../../utils/backendMessagesConvert'
import { IError } from '../../interfaces/IError'
import { IPropsLogin, IPropsResponseLogin } from '../../services/users/post/postLogin/types'
import { getTokenLocalStorage, setTokenLocalStorage } from '../../utils'
import postRegister from '../../services/users/post/postRegister'
import {
  IPropsRegister,
  IPropsResponseRegister
} from '../../services/users/post/postRegister/types'
import { INVALID_DATA, LOGIN_DONE, SUCCESSFUL_REGISTRATION } from '../../utils/messages'

export interface IAuthContextProps {
  user: IUser | null
  login: () => void
  registerUser: () => void
  logout: () => void
  watch: UseFormWatch<FormValues>
  handleSubmit: UseFormHandleSubmit<FormValues>
  register: UseFormRegister<FormValues>
  getValues: UseFormGetValues<FormValues>
  setValue: UseFormSetValue<FormValues>
  control: Control<FormValues>
  clearErrors: UseFormClearErrors<FormValues>
}

type AuthProviderProps = {
  children: ReactNode
}

type FormValues = {
  email: string
  password: string
}

const getCurrentUser = async () => {
  const token = getTokenLocalStorage()
  return token ? { id: '1', name: 'John Doe', email: 'john@teste.com', token } : null
}

export const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps)

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const { watch, handleSubmit, register, getValues, setValue, control, clearErrors } =
    useForm<FormValues>({
      mode: 'onChange'
    })

  const [user, setUser] = useState<IUser | null>(null)

  const { mutate: mutatePostLogin } = useMutation<IPropsResponseLogin, IError, IPropsLogin>({
    mutationFn: postLogin,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      toasts.success(LOGIN_DONE)
      const token = data?.data?.token
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john@teste.com',
        token
      })
      setTokenLocalStorage(data?.data?.token)
      setTimeout(() => {
        window.location.replace('/')
      }, 4000)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toasts.error(backendMessagesConvert(error?.response?.data?.error?.message))
    }
  })
  const { mutate: mutatePostRegister } = useMutation<
    IPropsResponseRegister,
    IError,
    IPropsRegister
  >({
    mutationFn: postRegister,
    onSuccess: () => {
      toasts.success(SUCCESSFUL_REGISTRATION)
      setTimeout(() => {
        window.location.replace('/login')
      }, 4000)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log('error', error)
      toasts.error(backendMessagesConvert(error?.response?.data?.error?.message))
    }
  })

  const login = async () => {
    try {
      const email = getValues('email')
      const password = getValues('password')

      console.log('email', email, password)

      if (!email?.length || !password?.length) {
        toasts.error(INVALID_DATA)
        return
      }

      const credentials: IPropsLogin = {
        email,
        password
      }
      await mutatePostLogin(credentials)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
  }

  const registerUser = async () => {
    try {
      const email = getValues('email')
      const password = getValues('password')

      console.log('email', email, password)

      if (!email?.length || !password?.length) {
        toasts.error(INVALID_DATA)
        return
      }

      const credentials: IPropsLogin = {
        email,
        password
      }
      await mutatePostRegister(credentials)
    } catch (error) {
      console.error('Register error:', error)
    }
  }

  const fetchUser = async () => {
    const authenticatedUser = await getCurrentUser()
    setUser(authenticatedUser)
  }
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        watch,
        handleSubmit,
        register,
        getValues,
        setValue,
        control,
        clearErrors,
        registerUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
