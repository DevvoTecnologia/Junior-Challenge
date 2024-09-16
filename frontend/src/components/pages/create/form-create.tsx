import { useForm } from "react-hook-form"
import { z } from "zod"

import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { createRing } from "../../../api"
import { getForgerByName } from "../../../utils"

const schemaFormCreate = z.object({
  name: z.string(),
  power: z.string(),
  proprietor: z.string(),
  forgerName: z.string(),
})

type FormCreateData = z.infer<typeof schemaFormCreate>

export function FormCreate() {
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<FormCreateData>({
    resolver: zodResolver(schemaFormCreate)
  })

  async function onSubmit(data: FormCreateData) {
    try {
      const forgerId = await getForgerByName({ name: data.forgerName }) || ""

      await createRing({ 
        ring: {
          name: data.name,
          proprietor: data.proprietor,
          forgerId,
          power: data.power,
          image: "imagem",
        }
      })

      toast.success('Anel criado com sucesso.')
      navigate('/')
    } catch (err: any) {
      if (err instanceof AxiosError) {
        if (err.response) {
          toast.error(err.response.data.message)

          return
        }
      }

      console.log(err.message)
      toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.')
    }
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>

          <input
            type="text"
            id="name"
            required
            className="px-4 p-2 mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("name")}
          />
        </div>

        <div>
          <label htmlFor="power" className="block text-sm font-medium text-gray-700">Poder</label>

          <textarea
            id="power"
            required
            className="px-4 p-2 mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("power")}
          ></textarea>
        </div>

        <div>
          <label htmlFor="proprietor" className="block text-sm font-medium text-gray-700">Portador</label>

          <input
            type="text"
            id="proprietor"
            required
            className="px-4 p-2  mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("proprietor")}
          />
        </div>

        <div>
          <label htmlFor="forgedBy" className="block text-sm font-medium text-gray-700">Forjado por</label>

          <select
            id="forgedBy"
            required
            className="px-4 p-2  mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("forgerName")}
          >
            <option value="Elfos">Elfos</option>
            <option value="Anões">Anões</option>
            <option value="Homens">Homens</option>
            <option value="Sauron">Sauron</option>
          </select>
        </div>

        <div className="flex justify-between">
          <Link 
            to="/"  
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
              Voltar
          </Link>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Criar anel
          </button>
        </div>
      </form>
  )
}