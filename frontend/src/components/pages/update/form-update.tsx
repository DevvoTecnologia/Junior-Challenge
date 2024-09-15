import { useForm } from "react-hook-form"
import { z } from "zod"

import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from "react-router-dom"
import { Ring } from "../../../types"

const schemaFormUpdate = z.object({
  name: z.string(),
  power: z.string(),
  proprietor: z.string(),
  forgerId: z.string(),
})

type FormUpdateData = z.infer<typeof schemaFormUpdate>

type FormUpdateProps = {
  ring: Ring
}

export function FormUpdate({ ring }: FormUpdateProps) {
  const { register, handleSubmit } = useForm<FormUpdateData>({
    resolver: zodResolver(schemaFormUpdate)
  })

  function onSubmit(data: FormUpdateData) {
    console.log(data)
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>

          <input
            type="text"
            id="name"
            required
            defaultValue={ring.name}
            className="px-4 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("name")}
          />
        </div>

        <div>
          <label htmlFor="power" className="block text-sm font-medium text-gray-700">Poder</label>

          <textarea
            id="power"
            required
            defaultValue={ring.power}
            className="px-4 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("power")}
          ></textarea>
        </div>

        <div>
          <label htmlFor="proprietor" className="block text-sm font-medium text-gray-700">Portador</label>

          <input
            type="text"
            id="proprietor"
            required
            defaultValue={ring.proprietor}
            className="px-4 p-2  mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("proprietor")}
          />
        </div>

        <div>
          <label htmlFor="forgedBy" className="block text-sm font-medium text-gray-700">Forjado por</label>

          <select
            id="forgedBy"
            required
            className="px-4 p-2  mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("forgerId")}
          >
            <option value="1">Elfos</option>
            <option value="2">Anões</option>
            <option value="3">Homens</option>
            <option value="4">Sauron</option>
          </select>
        </div>

        <div className="flex justify-between">
          <Link 
            to="/"  
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
              Cancelar
          </Link>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Atualizar anel
          </button>
        </div>
      </form>
  )
}