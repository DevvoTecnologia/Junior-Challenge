import { useState, useEffect, useCallback } from 'react'
import { Ring, RingFormData } from '@/types/ring'
import { createRing } from '@/services/create-ring'
import { updateRing } from '@/services/update-ring'
import { deleteRing } from '@/services/delete-ring'
import { getRings } from '@/services/get-rings'
import { toast } from 'sonner'

export function useRings() {
  const [rings, setRings] = useState<Ring[]>([])
  const [editingRing, setEditingRing] = useState<Ring | undefined>(undefined)

  const fetchRings = useCallback(async () => {
    try {
      const fetchedRings = await getRings()
      setRings(fetchedRings)
    } catch (error) {
      toast.error('Erro ao buscar anéis')
    }
  }, [])

  useEffect(() => {
    fetchRings()
  }, [fetchRings])

  const handleCreateRing = async (data: RingFormData) => {
    try {
      const newRing = await createRing(data)
      setRings((prevRings) => [...prevRings, newRing])
      toast.success('Anel criado com sucesso!')
    } catch (error) {
      toast.error('Erro ao criar o anel')
    }
  }

  const handleUpdateRing = async (data: RingFormData) => {
    if (editingRing) {
      try {
        const updatedRing = await updateRing(editingRing.id, data)
        setRings((prevRings) =>
          prevRings.map((ring) => (ring.id === updatedRing.id ? updatedRing : ring))
        )
        setEditingRing(undefined)
        toast.success('Anel atualizado com sucesso!')
      } catch (error) {
        toast.error('Erro ao atualizar o anel')
      }
    }
  }

  const handleDeleteRing = async (id: string) => {
    try {
      await deleteRing(id)
      setRings((prevRings) => prevRings.filter((ring) => ring.id !== id))
      toast.success('Anel deletado com sucesso!')
    } catch (error) {
      toast.error('Erro ao excluir o anel')
    }
  }

  const handleEditRing = (ring: Ring) => {
    setEditingRing(ring)
  }

  const handleSubmit = (data: RingFormData) => {
    if (editingRing) {
      handleUpdateRing(data)
    } else {
      handleCreateRing(data)
    }
  }

  return {
    rings,
    editingRing,
    handleSubmit,
    handleEditRing,
    handleDeleteRing,
  }
}