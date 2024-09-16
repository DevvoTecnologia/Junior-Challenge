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
      <section className="py-4">
        <h1 className="scroll-m-20 my-4 text-3xl font-extrabold tracking-tight lg:text-5xl text-center dark:text-gray-400">
          Anéis do poder
        </h1>
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
                  <HoverCardContent className="h-11 w-32">
                    The React Framework – created and maintained by @vercel.
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
