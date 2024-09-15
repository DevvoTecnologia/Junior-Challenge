import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { NotFoundPage } from './404'

import { FormUpdate } from '../components/pages/update'
import { initialRings } from '../constants/initial-rings'

import { Ring } from '../types/ring'
import { Helmet } from 'react-helmet-async'

export function UpdateRingPage() {
  const { ringId } = useParams()
  const [ring, setRing] = useState<Ring | null>(null)

  useEffect(() => {
    const ringPerIndex = initialRings.find(item => item.id === Number(ringId))

    setRing(ringPerIndex || null)
  }, [ringId])

  if (!ring) {
    return <NotFoundPage />
  }

  return (
    <>
      <Helmet title="Atualizar anel" />

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-96 mx-auto bg-slate-50 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Atualizar Anel</h1>
          
          <FormUpdate ring={ring} />
        </div>
      </div>
    </>
  )
}