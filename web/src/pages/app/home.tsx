import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { MdDelete, MdModeEdit } from 'react-icons/md'

import { Artifact } from '@/@types/artifact'
import { ErrorResponse } from '@/@types/error'
import { createArtifact, CreateArtifactRequest } from '@/api/create-artifact'
import { deleteArtifact } from '@/api/delete-artifact'
import { getArtifacts } from '@/api/get-artifacts'
import { getCharacters } from '@/api/get-characters'
import { getSmiths } from '@/api/get-smiths'
import { updateArtifact, UpdateArtifactRequest } from '@/api/update-artifact'
import home from '@/assets/images/home.png'
import { CreateArtifactForm } from '@/components/form-create-artifact'
import { UpdateArtifactForm } from '@/components/form-update-artifact'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Loader } from '@/components/ui/loader'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/hooks/use-toast'

export function Home() {
  const queryClient = useQueryClient()
  const [artifactToEdit, setArtifactToEdit] = useState<Artifact | null>(null)
  const [artifactToDelete, setArtifactToDelete] = useState<Artifact | null>(
    null,
  )

  const { data: artifacts, isPending: artifactsIsPending } = useQuery({
    queryKey: ['artifacts'],
    queryFn: getArtifacts,
  })
  const { data: smiths, isPending: smithsIsPending } = useQuery({
    queryKey: ['smiths'],
    queryFn: getSmiths,
  })
  const { data: characters, isPending: charactersIsPending } = useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  })

  const { mutateAsync: createArtifactFn, isPending: isCreating } = useMutation({
    mutationFn: createArtifact,
    onSuccess: (artifact) => {
      toast({
        title: 'Sucesso!',
        description: `${artifact.name} forjado com sucesso`,
      })
      queryClient.invalidateQueries({ queryKey: ['artifacts'] })
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const statusCode = error.response?.status
      const errorData = error.response?.data

      const description =
        statusCode === 500
          ? 'Falha ao criar artefato'
          : errorData?.errors?.[0]?.message || 'Erro desconhecido'

      toast({
        title: 'Algo deu errado',
        description,
        variant: 'destructive',
      })
    },
  })

  const { mutateAsync: updateArtifactFn, isPending: isUpdating } = useMutation({
    mutationFn: (data: { id: string; values: UpdateArtifactRequest }) =>
      updateArtifact(data.id, data.values),
    onSuccess: () => {
      toast({
        title: 'Atualizado com sucesso!',
        description: 'O artefato foi atualizado com sucesso.',
      })
      queryClient.invalidateQueries({ queryKey: ['artifacts'] })
    },
    onError: () => {
      toast({
        title: 'Erro ao atualizar',
        description: 'Falha ao atualizar artefato',
        variant: 'destructive',
      })
    },
  })

  const { mutateAsync: deleteArtifactFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteArtifact,
    onSuccess: () => {
      toast({
        title: 'Excluído com sucesso!',
        description: 'O artefato foi excluído com sucesso.',
      })
      queryClient.invalidateQueries({ queryKey: ['artifacts'] })
      setArtifactToDelete(null)
    },
    onError: () => {
      toast({
        title: 'Erro ao excluir',
        description: 'Falha ao excluir artefato',
        variant: 'destructive',
      })
    },
  })

  const handleCreateArtifact = async (values: CreateArtifactRequest) => {
    await createArtifactFn({
      name: values.name,
      power: values.power,
      bearer: values.bearer,
      forgedBy: values.forgedBy,
    })
  }

  const handleUpdateArtifact = async (values: UpdateArtifactRequest) => {
    if (artifactToEdit) {
      await updateArtifactFn({
        id: artifactToEdit.id,
        values: {
          name: values.name,
          power: values.power,
          bearer: values.bearer,
        },
      })
      setArtifactToEdit(null)
    }
  }

  const handleDeleteArtifact = async () => {
    if (artifactToDelete) {
      await deleteArtifactFn(artifactToDelete.id)
    }
  }

  return (
    <div className="mx-auto max-w-[90rem]">
      <main className="bg-gray-900 text-gray-300 mt-4 rounded-lg overflow-hidden">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex items-center flex-wrap">
            <div className="md:w-full lg:w-[55%] text-center lg:text-left p-8 min-h-[300px]">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
                Mergulhe na Magia dos Artefatos Ancestrais
              </h1>
              <p className="text-md lg:text-lg mb-6">
                Descubra os mistérios de artefatos poderosos forjados no coração
                de reinos lendários. De anéis encantados a espadas míticas,
                explore as maravilhas e segredos da magia ancestral.
              </p>
              <Button variant="secondary">Explorar</Button>
            </div>
            <img
              src={home}
              alt="Magia Escura"
              className="h-full md:w-full lg:w-[45%] object-cover"
            />
          </div>
        </div>
      </main>

      <section className="py-4 max-w-[90rem]">
        {/* Diálogo para Atualizar Artefato */}
        <Dialog
          open={!!artifactToEdit}
          onOpenChange={(open) => !open && setArtifactToEdit(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Atualizar Artefato</DialogTitle>
              {(smithsIsPending || charactersIsPending) && (
                <Skeleton className="w-full" />
              )}
              {artifactToEdit && smiths && characters && (
                <UpdateArtifactForm
                  initialValues={{
                    name: artifactToEdit.name,
                    power: artifactToEdit.power,
                    bearer: artifactToEdit.bearer,
                  }}
                  characters={characters}
                  isUpdating={isUpdating}
                  onSubmit={handleUpdateArtifact}
                />
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Diálogo para Confirmar Exclusão */}
        <Dialog
          open={!!artifactToDelete}
          onOpenChange={(open) => !open && setArtifactToDelete(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <p>Tem certeza de que deseja excluir o artefato?</p>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => setArtifactToDelete(null)}
                variant="outline"
                className="mr-2"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleDeleteArtifact}
                disabled={isDeleting}
                variant="destructive"
              >
                {isDeleting ? <Loader /> : 'Excluir'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <h1 className="scroll-m-20 my-4 text-3xl font-extrabold tracking-tight lg:text-5xl text-center dark:text-gray-400">
          Artefatos Mágicos
        </h1>

        <h2 className="mt-6 text-lg pl-6 text-center text font-semibold text-gray-600">
          O grande mago J.R.R. Tolkien disse:{' '}
          <span className="italic text-gray-700 dark:text-gray-500">
            {
              '"Ao passar o mouse sobre o artefato, os segredos escondidos nas sombras serão revelados apenas aos dignos."'
            }
          </span>
        </h2>
        <Carousel className="w-[80%] mx-auto my-4">
          <CarouselContent className="-ml-2">
            {artifactsIsPending &&
              Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:basis-1/3 lg:basis-1/5"
                >
                  <div className="p-1">
                    <Skeleton className="w-full rounded-lg aspect-square" />
                  </div>
                </CarouselItem>
              ))}

            {artifacts?.map((artifact) => (
              <CarouselItem
                key={artifact.id}
                className="pl-2 md:basis-1/3 lg:basis-1/5"
              >
                <HoverCard>
                  <HoverCardTrigger>
                    <div className="p-1">
                      <img
                        src={artifact.imageUrl}
                        className="w-full rounded-lg aspect-square shadow-md cursor-pointer hover:brightness-90 ease-linear duration-100"
                        alt="Artifact image"
                      />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-gradient-to-r from-sky-600 to-gray-800 rounded-lg shadow-lg border-none">
                    <div className="flex justify-between space-x-4 p-4 transition-transform transform hover:scale-105">
                      <div className="space-y-1 text-white">
                        <h4 className="text-lg font-bold text-shadow-md tracking-tight">
                          {artifact.name}
                        </h4>
                        <p className="text-sm font-medium text-gray-300">
                          {artifact.power}
                        </p>
                        <div className="pt-2">
                          <span className="text-xs italic text-gray-200">
                            Forjado por: {artifact.forgedBy}
                          </span>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Button
                            onClick={() => setArtifactToEdit(artifact)}
                            className="mt-4"
                            size="icon"
                            variant="secondary"
                          >
                            <MdModeEdit className="w-5 h-5" />
                          </Button>
                          <Button
                            onClick={() => setArtifactToDelete(artifact)}
                            className="mt-4"
                            size="icon"
                            variant="destructive"
                          >
                            <MdDelete className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {/* Diálogo para Adicionar Artefato */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="relative left-1/2 -translate-x-1/2" size="lg">
              Adicionar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Artefato</DialogTitle>
              {(smithsIsPending || charactersIsPending) && (
                <Skeleton className="w-full" />
              )}
              {smiths && characters && (
                <CreateArtifactForm
                  onSubmit={handleCreateArtifact}
                  smiths={smiths}
                  characters={characters}
                  isCreating={isCreating}
                />
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}
