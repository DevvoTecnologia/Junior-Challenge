import { useQuery } from '@tanstack/react-query'

import { getArtifacts } from '@/api/getArtifacts'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Skeleton } from '@/components/ui/skeleton'

export function Home() {
  const { data: artifacts, isPending: artifactsIsPending } = useQuery({
    queryKey: ['artifacts'],
    queryFn: getArtifacts,
  })

  return (
    <div className="mx-auto max-w-[90rem]">
      <main className="h-[65vh]">a</main>
      <section className="py-4">
        <h1 className="scroll-m-20 my-4 text-3xl font-extrabold tracking-tight lg:text-5xl text-center dark:text-gray-400">
          Anéis do poder
        </h1>
        <h2 className="mt-6 text-lg pl-6  text-center text font-semibold text-gray-600">
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
                    <Skeleton className="w-full  rounded-lg aspect-square" />
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
                        <h4 className="text-lg font-bold text-shadow-md">
                          {artifact.name}
                        </h4>
                        <p className="text-sm font-medium">{artifact.power}</p>
                        <div className="flex items-center pt-2">
                          <span className="text-xs italic text-gray-200">
                            Forjado por: {artifact.forgedBy}
                          </span>
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
      </section>
    </div>
  )
}
