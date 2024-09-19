import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { GetCharactersResponse } from '@/api/get-characters'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader } from '@/components/ui/loader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'O nome do artefato deve ter pelo menos 2 caracteres.' })
    .max(255, {
      message: 'O nome do artefato pode ter no máximo 255 caracteres.',
    }),
  power: z
    .string()
    .min(5, { message: 'O poder deve ter pelo menos 5 caracteres.' })
    .max(255, { message: 'O poder pode ter no máximo 255 caracteres.' }),
  bearer: z.string().min(1, { message: 'O portador é obrigatório.' }),
})
type FormValues = z.infer<typeof formSchema>

interface UpdateArtifactFormProps {
  isUpdating: boolean
  characters: GetCharactersResponse
  initialValues: FormValues
  onSubmit: (values: FormValues) => void
}

export function UpdateArtifactForm({
  isUpdating,
  characters,
  initialValues,
  onSubmit,
}: UpdateArtifactFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do artefato" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="power"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poder</FormLabel>
              <FormControl>
                <Textarea
                  id="power"
                  placeholder="Poder do artefato"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bearer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portador</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um Portador" />
                  </SelectTrigger>
                  <SelectContent>
                    {characters.map((character) => (
                      <SelectItem key={character.id} value={character.id}>
                        {character.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isUpdating}
          className="flex items-center"
        >
          {isUpdating ? <Loader /> : 'Atualizar Artefato'}
        </Button>
      </form>
    </Form>
  )
}
