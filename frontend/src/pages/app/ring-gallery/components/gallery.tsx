import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRingList, Ring } from "@/api/get-ring-list";
import { deleteRing } from "@/api/delete-ring";
import { useToast } from "@/hooks/use-toast";
import { CarouselCardActions } from "./carousel-card-actions";
import { GalleryEmpty } from "./gallery-empty";
import { forgedByNameTranslate } from "@/utils/forged-by-translate.utils";

type GalleryProps = {
  handleSetSelectedRing: (ring: Ring) => void;
  handleOpenEditDialog: () => void;
};

export const Gallery = ({
  handleSetSelectedRing,
  handleOpenEditDialog,
}: GalleryProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data } = useQuery({
    queryKey: ["ringList"],
    queryFn: getRingList,
  });

  const handleOpenDialog = (ring: Ring) => {
    handleSetSelectedRing(ring);
    handleOpenEditDialog();
  };

  const { mutateAsync: deleteRingFn } = useMutation({
    mutationFn: deleteRing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ringList"] });
    },
  });

  const handleDeleteRing = async (ringId: string) => {
    try {
      await deleteRingFn({
        id: ringId,
      });

      toast({
        variant: "default",
        title: "Anel Excluído",
        description:
          "A exclusão foi realizada com sucesso. O item foi removido da sua coleção.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Algo Deu Errado",
        description:
          "Não foi possível concluir a operação. Por favor, tente novamente mais tarde.",
      });
    }
  };

  const hasRings = !!data?.length;

  return (
    <>
      {hasRings ? (
        <Carousel className="w-full max-w-xs pt-6 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <CarouselContent>
            {data?.map((ring) => (
              <CarouselItem key={ring.id}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CarouselCardActions
                      editAction={() => handleOpenDialog(ring)}
                      deleteAction={() => handleDeleteRing(ring.id)}
                    />
                  </CardHeader>
                  <CardContent className="p-x-4 flex aspect-square flex-col items-center justify-center">
                    <img
                      className="mx-auto h-40 w-40 rounded-full sm:h-48 sm:w-48 md:h-56 md:w-56"
                      src={ring.imageUrl}
                      alt="ring"
                    />
                    <p className="mb-3 mt-2 text-xl font-semibold">
                      {ring.name}
                    </p>
                    <div className="w-full px-2">
                      <div className="flex flex-col">
                        <small className="text-sm">Poder</small>
                        <small className="pb-2 text-base text-gray-400">
                          {ring.power}
                        </small>
                      </div>

                      <div className="flex flex-col">
                        <small className="text-sm">Portador</small>
                        <small className="pb-2 text-base text-gray-400">
                          {ring.bearer}
                        </small>
                      </div>

                      <div className="flex flex-col">
                        <small className="text-sm">Forjado por</small>
                        <small className="text-base text-gray-400">
                          {forgedByNameTranslate[ring.forgedBy]}
                        </small>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <GalleryEmpty />
      )}
    </>
  );
};
