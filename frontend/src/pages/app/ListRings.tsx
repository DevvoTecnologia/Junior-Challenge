import { getRings } from "@/api/get-rings"
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
        className=" fixed top-5 right-5 px-16 py-5 rounded-xl bg-gray-700 text-white hover:bg-gray-900 transition-colors duration-300"
      >
        CREATE
      </Button>
      <div className="w-full flex justify-center p-20">
        <img src="/assets/title.svg" alt="" />
      </div>
      <div className="w-full flex justify-center">
        <Carousel className="w-[270px] max-h-[200px] z-10" opts={{loop: false}}>
          <CarouselContent className="-ml-[50px]">
            {rings?.map(ring => {
              return (
                <CarouselItem className="pl-[50px]" ><RingCard ring={ring}/></CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <img src="/assets/crew.svg" alt="" className="absolute w-full bottom-0"/>
    </div>
  )
}

export default ListRings
