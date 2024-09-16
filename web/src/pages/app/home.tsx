import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'

import { Artifact } from '@/@types/artifact'
import { createArtifact, CreateArtifactRequest } from '@/api/create-artifact'
import { getArtifacts } from '@/api/get-artifacts'
import { getCharacters } from '@/api/get-characters'
import { getSmiths } from '@/api/get-smiths'
import { updateArtifact, UpdateArtifactRequest } from '@/api/update-artifact'
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/hooks/use-toast'

export function Home() {
  const queryClient = useQueryClient()
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(
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
    onError: () => {
      toast({
        title: 'Algo deu errado',
        description: 'Falha ao criar artefato',
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
    if (selectedArtifact) {
      await updateArtifactFn({
        id: selectedArtifact.id,
        values: {
          name: values.name,
          power: values.power,
          bearer: values.bearer,
        },
      })
      setSelectedArtifact(null)
    }
  }

  return (
    <div className="mx-auto max-w-[90rem]">
      <main className="h-[65vh]">main</main>
      <section className="py-4 max-w-[90rem]">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Adicionar</Button>
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

        <Dialog
          open={!!selectedArtifact}
          onOpenChange={(open) => !open && setSelectedArtifact(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Atualizar Artefato</DialogTitle>
              {(smithsIsPending || charactersIsPending) && (
                <Skeleton className="w-full" />
              )}
              {selectedArtifact && smiths && characters && (
                <UpdateArtifactForm
                  initialValues={{
                    name: selectedArtifact.name,
                    power: selectedArtifact.power,
                    bearer: selectedArtifact.bearer,
                  }}
                  characters={characters}
                  isUpdating={isUpdating}
                  onSubmit={handleUpdateArtifact}
                />
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <h1 className="scroll-m-20 my-4 text-3xl font-extrabold tracking-tight lg:text-5xl text-center dark:text-gray-400">
          Anéis do poder
        </h1>
        <h2 className="mt-6 text-lg pl-6 text-center text font-semibold text-gray-600">
          O grande mago J.R.R. Tolkien disse:{' '}
          <span className="italic text-gray-700">
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
                  <HoverCardContent className="bg-gradient-to-r from-sky-600 to-gray-800 rounded-lg shadow-lg">
                    <div className="flex justify-between space-x-4 p-4 transition-transform transform hover:scale-105">
                      <div className="space-y-1 text-white">
                        <h4 className="text-lg font-bold text-shadow-md tracking-tight">
                          {artifact.name}
                        </h4>
                        <p className="text-sm font-medium">{artifact.power}</p>
                        <div className="pt-2">
                          <span className="text-xs italic text-gray-200">
                            Forjado por: {artifact.forgedBy}
                          </span>
                        </div>
                        <Button
                          onClick={() => setSelectedArtifact(artifact)}
                          className="mt-4"
                          size="icon"
                          variant="secondary"
                        >
                          <MdModeEdit className="w-5 h-5" />
                        </Button>
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
      </section>
    </div>
  )
}
