import { CreateRingModal } from '@/components/modals/create-ring-modal';
import { DeleteRingModal } from '@/components/modals/delete-ring-modal';
import { UpdateRingModal } from '@/components/modals/update-ring-modal';
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
import { Edit } from 'lucide-react';

const Home = () => {
  const { rings, current, setApi, signOut } = useRings();

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
                <div className="bg-[#1c111f] flex flex-col justify-between items-center p-3 pb-0 rounded-xl w-full h-[400px] max-w-xs">
                  <div className="relative w-full h-[60%]">
                    <DeleteRingModal ringId={ring.id} />
                    <UpdateRingModal ringId={ring.id} />
                    <img
                      src={ring.image}
                      alt={ring.name}
                      className="w-full h-full object-cover z-[1] rounded-t-xl relative"
                    />
                  </div>
                  <div className="w-full flex flex-col flex-1 z-[2] bg-[#231826] p-3 rounded-t-xl text-white">
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
