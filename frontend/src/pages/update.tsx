import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { FormUpdate } from '../components/pages/update'
import { useQuery } from '@tanstack/react-query'
import { fetchRing } from '../api'
import { NotFoundPage } from './404'

export function UpdateRingPage() {
  const { ringId } = useParams()

  if (!ringId) {
    return <NotFoundPage />
  }

  const {
    data,
  } = useQuery({
    queryKey: ['rings', 'get'],
    queryFn: fetchRing,
  })

  const ring = data?.find(item => item.ringId === ringId)

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