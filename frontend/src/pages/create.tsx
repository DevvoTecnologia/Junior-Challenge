import { Helmet } from 'react-helmet-async'
import { FormCreate } from '../components/pages/create'

export function CreateRingPage() {
  return (
    <>  
      <Helmet title="Criar anel" />

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-96 mx-auto bg-slate-50 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Criar um Anel</h1>
          
          <FormCreate />
        </div>
      </div>
    </>
  )
}