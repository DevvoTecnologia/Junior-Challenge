"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useQueryGetAll from "@/hooks/rings/useQueryGetAll";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Tooltip from "@/components/tooltip/Tooltip";
import { Button } from "@/components/ui/button";
import { Ban, Pencil, SearchX } from "lucide-react";
import useMutationDelete from "@/hooks/rings/mutations/useMutationDelete";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function RingsList() {
  const { data: rings, isLoading, refetch } = useQueryGetAll();
  const { mutateAsync: deleteRing, isPending: isDeleting } =
    useMutationDelete();

  if (isLoading || isDeleting) {
    return (
      <div className="flex flex-col items-center gap-4 mt-8 sm:mt-12 md:mt-16">
        <Skeleton className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16" />
        <Skeleton className="h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80 rounded-xl" />
        <Skeleton className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16" />
      </div>
    );
  }

  return (
    <>
      {rings && rings.length > 0 ? (
        <div className="mt-8 sm:mt-12 md:mt-14 w-full max-w-full overflow-x-hidden">
          <p className="text-muted-foreground italic text-center text-sm sm:text-base">
            {rings.length === 1
              ? `Existe apenas ${rings.length} anel`
              : `${rings.length} anéis encontrados`}
          </p>{" "}
          <Carousel className="w-full">
            <CarouselContent>
              {rings.map((ring, index) => (
                <CarouselItem
                  className="flex-shrink-0 sm:basis-1/2 lg:basis-1/3 px-2"
                  key={index}
                >
                  <div className="p-2">
                    <Card>
                      <CardHeader className="text-center">
                        <CardTitle className="text-lg sm:text-xl md:text-2xl">
                          {ring.nome}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                          {ring.poder}
                        </CardDescription>
                        <Avatar className="mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 border-4">
                          <AvatarImage src={ring.imagem} alt={ring.nome} />
                          <AvatarFallback>RN</AvatarFallback>
                        </Avatar>
                      </CardHeader>
                      <Separator className="mb-2 sm:mb-4" />
                      <CardContent className="flex flex-col space-y-2 text-sm sm:text-base">
                        <div>
                          <p className="text-muted-foreground">Portado por: </p>
                          <span className="text-primary font-bold">
                            {ring.portador}
                          </span>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Forjado por: </p>
                          <span className="text-primary font-bold">
                            {ring.forjadoPor}
                          </span>
                        </div>
                      </CardContent>
                      <Separator className="mb-2 sm:mb-4" />
                      <CardFooter className="flex justify-center space-x-2">
                        <Tooltip text="Reforjar anel">
                          <Link href={`/home/forgeRing/${ring._id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="sm:h-10 sm:px-4 sm:py-2"
                            >
                              <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </Link>
                        </Tooltip>
                        <Tooltip text="Banir anel">
                          <Button
                            variant="outline"
                            size="sm"
                            className="sm:h-10 sm:px-4 sm:py-2"
                            onClick={async (e) => {
                              e.preventDefault();
                              await deleteRing(ring._id);
                              await refetch();
                            }}
                          >
                            <Ban className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </Tooltip>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ) : (
        <div className="mt-8 text-center text-muted-foreground">
          <SearchX className="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-muted-foreground" />
          <p className="italic text-sm sm:text-base">
            Os olhos de Sauron vasculharam, mas nenhum Anel foi encontrado.
          </p>
          <p className="italic text-sm sm:text-base">
            O destino de todos permanece seguro... por agora.
          </p>
        </div>
      )}
    </>
  );
}
