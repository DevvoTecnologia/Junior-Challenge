"use client";
import { RingType } from "@/src/@types";
import { deleteRing } from "@/src/actions/action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { apiURLForImages } from "@/src/utils/constants";
import { useRouter } from "next/navigation";

import { ModalUpdateRing } from "./modal-update-ring";

export const ModalRings = ({ ring }: { ring: RingType }) => {
  const router = useRouter();
  return (
    <Dialog key={ring.id}>
      <DialogTrigger asChild>
        <div
          className={`cursor-pointer flex sofadi-font text-center rounded-lg flex-col items-center bg-background/50 p-4 border-2 border-border w-[340px] gap-5 hover:scale-105 transition-all`}
        >
          <article>
            <h1 className={`text-lg`}>{ring.name}</h1>
            <span
              className={`text-sm max-w-[300px] whitespace-nowrap overflow-hidden text-ellipsis`}
            >
              {ring.power}
            </span>
          </article>

          <img
            src={apiURLForImages + ring.image}
            alt={ring.name}
            className={`size-40 aspect-square`}
          />

          <div className={`flex gap-6 text-base`}>
            <span>
              <span className={`gold-text`}>Forjado por:</span> <br />
              {ring.forgedBy}
            </span>
            <span>
              <span className={`gold-text`}>Portador:</span> <br />
              {ring.carrier?.name}
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sofadi-font max-w-[350px] md:w-[600px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{ring.name}</DialogTitle>
          <DialogDescription className={`text-base`}>
            {ring.power}
          </DialogDescription>
        </DialogHeader>
        <div
          className={`w-full flex justify-center items-center flex-col gap-10 my-10`}
        >
          <img
            src={apiURLForImages + ring.image}
            alt={ring.name}
            className={`size-40 aspect-square`}
          />

          <div className={`flex text-center gap-6`}>
            <span>
              <span className={`gold-text`}>Forjado por:</span> {ring.forgedBy}
            </span>
            <span>
              <span className={`gold-text`}>Portador:</span>{" "}
              {ring.carrier?.name}
            </span>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <ModalUpdateRing ring={ring} />

          <button
            onClick={() => {
              deleteRing(ring.id);
              router.refresh();
            }}
            className={`bg-red-400/50 hover:bg-red-400/80 p-2 rounded-md text-sm transition-all active:translate-y-1`}
          >
            Excluir
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
