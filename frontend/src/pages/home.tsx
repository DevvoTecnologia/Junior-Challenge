import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { toast } from 'sonner'
import { Plus } from 'lucide-react'

import { RingCard } from '../components/pages/home'
import { fetchRing, deleteRing } from '../api'
import { AxiosError } from 'axios'

export function HomePage() {
  const navigate = useNavigate()

  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ['rings', 'get'],
    queryFn: fetchRing,
  })
  
  async function handleDelete(ringId: string) {
    try {
      await deleteRing({ ringId })
      
      toast.success("Anel deletado com sucesso.")
      navigate("/")
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          toast.error(err.response.data.message)

          return
        }
      }

      toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.')
    }
  }

  if (isLoading) {
    return (
      <div className="text-center p-12 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Carregando...</h2>
        <p>Estamos buscando os anéis de poder, por favor aguarde.</p>
      </div>
    )
  }

  return (
      <>
        <Helmet title="Anéis" />

        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-center mb-10">Os Anéis de Poder</h1>

          {data && data.length > 0 ? (
            <>
              <div className="mb-10 flex justify-between gap-3 flex-wrap">
                {data.map((ring) => (
                  <RingCard handleDelete={handleDelete} ring={ring} key={ring.ringId} />
                ))}
              </div>
              
              <div className="text-center">
                <Link to="/create" className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-lg font-semibold">
                  <Plus className="inline-block mr-2 h-5 w-5" /> Criar anel
                </Link>
              </div>
            </>
            ) : (
              <div className="text-center p-12 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Nenhum anel encontrado</h2>
                <p className="text-gray-600 mb-8">Parece que ainda não há anéis de poder. Gostaria de criar um?</p>

                <Link to="/create" className="flex items-center justify-between px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-lg font-semibold">
                  <Plus className="inline-block mr-2 h-5 w-5" /> Criar meu primeiro anel
                </Link>
              </div>
          )}
        </div>
      </>
  )
}