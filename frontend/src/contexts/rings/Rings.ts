import { useContextSelector } from 'use-context-selector'
import { IRingsContextProps, RingsContext } from './useRings'

export const useRings = (): IRingsContextProps => {
  const rings = useContextSelector(RingsContext, (rings) => rings.rings)
  const watch = useContextSelector(RingsContext, (rings) => rings.watch)
  const handleSubmit = useContextSelector(RingsContext, (rings) => rings.handleSubmit)
  const register = useContextSelector(RingsContext, (rings) => rings.register)
  const getValues = useContextSelector(RingsContext, (rings) => rings.getValues)
  const setValue = useContextSelector(RingsContext, (rings) => rings.setValue)
  const control = useContextSelector(RingsContext, (rings) => rings.control)
  const clearErrors = useContextSelector(RingsContext, (rings) => rings.clearErrors)
  const handleCreateRings = useContextSelector(RingsContext, (rings) => rings.handleCreateRings)
  const handleUpdateRing = useContextSelector(RingsContext, (rings) => rings.handleUpdateRing)
  const handleDeleteRing = useContextSelector(RingsContext, (rings) => rings.handleDeleteRing)
  const forgers = useContextSelector(RingsContext, (rings) => rings.forgers)

  return {
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
  }
}
