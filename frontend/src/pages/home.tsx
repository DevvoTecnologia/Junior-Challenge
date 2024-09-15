import { useState } from 'react'

import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { toast } from 'sonner'
import { Plus } from 'lucide-react'

import { Ring } from '../types'
import { RingCard } from '../components/pages/home'
import { initialRings } from '../constants/initial-rings'


export function HomePage() {
  const [rings, setRings] = useState<Ring[]>([...initialRings])

  function handleDelete(ringId: number) {
    const updatedRings = rings.filter(ring => ring.id !== ringId)
    setRings(updatedRings)

    toast.success('Anel deletado com sucesso!')
  }
  
  const ringsLengthGreaterThanZero = rings.length > 0

  return (
      <>
        <Helmet title="Anéis" />

        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-center mb-10">Os Anéis de Poder</h1>

          {ringsLengthGreaterThanZero ? (
            <>
              <div className="mb-10 flex justify-between gap-3 flex-wrap">
                {rings.map((ring) => (
                  <RingCard handleDelete={handleDelete} ring={ring} key={ring.id} />
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