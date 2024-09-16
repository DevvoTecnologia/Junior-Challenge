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
import { Ban, Pencil } from "lucide-react";
import useMutationDelete from "@/hooks/rings/mutations/useMutationDelete";

export default function RingsList() {
  const { data: rings, isLoading } = useQueryGetAll();
  const { mutateAsync: deleteRing } = useMutationDelete();

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 mt-32">
        <Skeleton className="rounded-full h-9 w-9" />
        <Skeleton className="h-80 w-80 rounded-xl aspect-square" />
        <Skeleton className="rounded-full h-9 w-9" />
      </div>
    );
  }

  return (
    <>
      {rings && rings.length > 0 ? (
        <div className="mt-32 w-full max-w-6xl">
          <Carousel className="w-full max-w-6xl">
            <CarouselContent>
              {rings.map((ring, index) => (
                <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
                  <div className="p-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>{ring.nome}</CardTitle>
                        <CardDescription>{ring.poder}</CardDescription>
                      </CardHeader>
                      <Separator className="mb-4" />
                      <CardContent className="flex flex-col space-y-4">
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
                      <Separator className="mb-4" />
                      <CardFooter className="flex space-x-2">
                        <Tooltip text="Editar anel">
                          <Button variant="outline">
                            <Pencil className="h-4" />
                          </Button>
                        </Tooltip>
                        <Tooltip text="Banir anel">
                          <Button
                            variant="outline"
                            onClick={(e) => {
                              e.preventDefault();
                              // deleteRing(ring._id);
                              deleteRing("asd");
                            }}
                          >
                            <Ban className="h-4" />
                          </Button>
                        </Tooltip>
                      </CardFooter>{" "}
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <p className="mt-2 text-muted-foreground italic text-center">
            {rings.length === 1
              ? `Existe apenas ${rings.length} anel`
              : `${rings.length} anéis encontrados`}
          </p>{" "}
        </div>
      ) : (
        <Card className="mt-32 bg-muted-foreground border-none">
          <CardContent className="flex h-80 aspect-square items-center justify-center p-6">
            <p className="font-bold">No rings found</p>
          </CardContent>
        </Card>
      )}{" "}
      {/* <pre>ppp{JSON.stringify(rings, null, 2)}</pre> */}
    </>
  );
}
