import { CreateRingModal } from '@/components/modals/create-ring-modal';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useRings } from '@/hooks/use-rings';
import { ExitIcon } from '@radix-ui/react-icons';
import { Edit, Trash2 } from 'lucide-react';

const Home = () => {
  const { rings, current, isLoading, refetchRings, setApi, signOut } =
    useRings();

  return (
    <main className="h-screen relative overflow-hidden">
      <Button
        onClick={signOut}
        size="icon"
        variant="destructive"
        className="absolute left-3 top-3"
      >
        <ExitIcon className="size-5" />
      </Button>
      <section className="h-full flex flex-col justify-center items-center">
        <Carousel setApi={setApi} className="w-full max-w-xs">
          <CarouselContent>
            {rings.map(ring => (
              <CarouselItem key={ring.id}>
                <div className="bg-[#1c111f] flex flex-col justify-center items-center p-3 pb-0 rounded-xl">
                  <div className="relative">
                    <Button
                      className="absolute top-3 right-3 z-[3]"
                      size="icon"
                    >
                      <Edit className="text-gray-800 size-5" />
                    </Button>
                    <Button
                      className="absolute top-3 left-3 z-[3]"
                      size="icon"
                      variant="destructive"
                    >
                      <Trash2 className="text-black size-5" />
                    </Button>
                    <img
                      src={ring.image}
                      alt={ring.name}
                      className="w-full z-[1] rounded-t-xl relative"
                    />
                  </div>
                  <div className="flex flex-col -mt-10 z-[2] bg-[#231826] p-3 rounded-t-xl text-white">
                    <strong>{ring.name}</strong>
                    <span>{ring.power}</span>
                    <div className="flex justify-between text-xs mt-3.5">
                      <strong className="text-[#fad785]">
                        Portador:{' '}
                        <span className="text-gray-300">{ring.bearer}</span>
                      </strong>
                      <strong className="text-[#fad785]">
                        Forjado por:{' '}
                        <span className="text-gray-300">{ring.forgedBy}</span>
                      </strong>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious children />
          <CarouselNext children />
        </Carousel>
        <div className="py-2 text-center text-sm text-gray-300">
          {current} de {rings.length}
        </div>
      </section>

      <CreateRingModal />
    </main>
  );
};

export default Home;
