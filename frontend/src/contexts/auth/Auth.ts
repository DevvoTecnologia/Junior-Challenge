import { useContextSelector } from 'use-context-selector'
import { AuthContext, IAuthContextProps } from './useAuth'

export const useAuth = (): IAuthContextProps => {
  const user = useContextSelector(AuthContext, (auth) => auth.user)
  const login = useContextSelector(AuthContext, (auth) => auth.login)
  const registerUser = useContextSelector(AuthContext, (auth) => auth.registerUser)
  const logout = useContextSelector(AuthContext, (auth) => auth.logout)
  const watch = useContextSelector(AuthContext, (auth) => auth.watch)
  const handleSubmit = useContextSelector(AuthContext, (auth) => auth.handleSubmit)
  const register = useContextSelector(AuthContext, (auth) => auth.register)
  const getValues = useContextSelector(AuthContext, (auth) => auth.getValues)
  const setValue = useContextSelector(AuthContext, (auth) => auth.setValue)
  const control = useContextSelector(AuthContext, (auth) => auth.control)
  const clearErrors = useContextSelector(AuthContext, (auth) => auth.clearErrors)

  return {
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
  }
}
