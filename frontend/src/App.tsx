import { RingCard } from "./components/ringCard"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./components/ui/carousel"

function App() {
  return (
    <div className="h-screen w-full bg_Image">
      <div className="w-full flex justify-center p-20">
        <img src="/assets/title.svg" alt="" />
      </div>
      <div className="w-full flex justify-center">
        <Carousel className="w-[270px] z-10" opts={{loop: true}}>
          <CarouselContent className="-ml-[50px]">
            <CarouselItem className="pl-[50px]"><RingCard/></CarouselItem>
            <CarouselItem className="pl-[50px]"><RingCard/></CarouselItem>
            <CarouselItem className="pl-[50px]"><RingCard/></CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <img src="/assets/crew.svg" alt="" className="absolute w-full bottom-0"/>
    </div>
  )
}

export default App
