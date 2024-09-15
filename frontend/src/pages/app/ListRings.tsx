import { getRings } from "@/api/get-rings"
import { CardSkeleton } from "@/components/cardSkeleton"
import { RingCard } from "@/components/RingCard"
import { useQuery } from "@tanstack/react-query"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../../components/ui/carousel"

function ListRings() {
  const {data: rings} = useQuery({
    queryFn: getRings,
    queryKey: ['rings', 'list-rings']
  })

  return (
    <div className="w-full flex justify-center">
      <Carousel className="w-[270px] max-h-[200px] z-10" opts={{loop: false}}>
        <CarouselContent className="-ml-[50px]">
          {rings ? rings?.map(ring => {
            return (
              <CarouselItem className="pl-[50px]" key={ring.ring_id}><RingCard ring={ring}/></CarouselItem>
            )
          }): <CarouselItem className="pl-[50px]"><CardSkeleton/></CarouselItem>}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default ListRings
