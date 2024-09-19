import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { GetCharactersResponse } from '@/api/get-characters'
import { GetSmithsResponse } from '@/api/get-smiths'
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
  forgedBy: z.string().min(1, { message: 'O forjador é obrigatório.' }),
})

type FormValues = z.infer<typeof formSchema>

interface CreateArtifactFormProps {
  isCreating: boolean
  smiths: GetSmithsResponse
  characters: GetCharactersResponse
  onSubmit: (values: FormValues) => void
}

export function CreateArtifactForm({
  isCreating,
  smiths,
  characters,
  onSubmit,
}: CreateArtifactFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      power: '',
      bearer: '',
      forgedBy: '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do artefato</FormLabel>
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
              <FormLabel>Instruções do poder</FormLabel>
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
        <FormField
          control={form.control}
          name="forgedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Forjador</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um Forjador" />
                  </SelectTrigger>
                  <SelectContent>
                    {smiths.map((smith) => (
                      <SelectItem key={smith.id} value={smith.id}>
                        {smith.name}
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
          disabled={isCreating}
          className="flex items-center mb-4"
        >
          {isCreating ? <Loader /> : 'Criar Artefato'}
        </Button>
      </form>
      {isCreating && (
        <span className="text-center py-4 font-semibold text-muted-foreground">
          ❗ Isso pode demorar cerca de{' '}
          <b className="text-foreground">1 minuto</b> pois a imagem é gerada por
          IA
        </span>
      )}
    </Form>
  )
}
