import { getRings } from "@/api/get-rings"
import { CardSkeleton } from "@/components/cardSkeleton"
import { PageTitle } from "@/components/pageTitle"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { RingCard } from "../../components/ringCard"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel"

function ListRings() {
  const navigate = useNavigate();
  const {data: rings} = useQuery({
    queryFn: getRings,
    queryKey: ['rings', 'list-rings']
  })

  return (
    <div className="h-screen w-full">
      <Button 
        type="button" 
        onClick={() => navigate('/create')}
        className="fixed top-5 right-5 px-16 py-5 rounded-xl bg-gray-700 text-white hover:bg-gray-900 transition-colors duration-300"
      >
        CRIAR
      </Button>
      <div className="w-full flex justify-center p-20">
        <PageTitle />
      </div>
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
    </div>
  )
}

export default ListRings
