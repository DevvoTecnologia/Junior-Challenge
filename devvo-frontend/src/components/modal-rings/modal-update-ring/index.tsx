import { EForger, RingType } from "@/src/@types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { capitalize } from "@/src/utils/capitalize";
import Image from "next/image";

import { useCreateOrUpdateForm } from "../../../hooks/use-create-or-update-form";
import { RingForm } from "../../form/ring-form";
import { UploadFileIcon } from "../../icons-svg/upload-file-icon";

export const ModalUpdateRing = ({ ring }: { ring: RingType }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`bg-blue-400/50 hover:bg-blue-400/80 p-2 rounded-md text-sm transition-all active:translate-y-1`}
        >
          Atualizar
        </button>
      </DialogTrigger>
      <DialogContent className="sofadi-font max-w-[350px] md:w-[600px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{ring.name}</DialogTitle>
        </DialogHeader>

        <UpdateRingForm ringId={ring.id} />
      </DialogContent>
    </Dialog>
  );
};

const UpdateRingForm = ({ ringId }: { ringId: string }) => {
  const { form, image, onSubmit, setImage, setRingId } = useCreateOrUpdateForm({
    typeForm: "update",
  });
  return (
    <RingForm.Root onSubmit={form.handleSubmit(onSubmit)}>
      <section className={`flex flex-wrap justify-start gap-5`}>
        <RingForm.Label htmlFor={`ring-name`}>
          <RingForm.FieldName>Nome do anel: </RingForm.FieldName>
          <input
            type="text"
            id="ring-name"
            {...form.register("name")}
            placeholder="Nome do anel"
            className="input"
          />
          {form.formState.errors.name && (
            <span className="text-red-500 text-sm mt-1.5">
              {form.formState.errors.name.message}
            </span>
          )}
        </RingForm.Label>

        <RingForm.Label htmlFor={`ring-power`}>
          <RingForm.FieldName>Poder do anel: </RingForm.FieldName>
          <input
            type="text"
            id="ring-power"
            {...form.register("power")}
            placeholder="Poder do anel"
            className="input"
          />
          {form.formState.errors.power && (
            <span className="text-red-500 text-sm mt-1.5">
              {form.formState.errors.power.message}
            </span>
          )}
        </RingForm.Label>

        <RingForm.Label htmlFor={`ring-carrier`}>
          <RingForm.FieldName>Portador do anel: </RingForm.FieldName>
          <input
            type="text"
            id="ring-carrier"
            {...form.register("carrier")}
            placeholder="Portador do anel"
            className="input"
          />
          {form.formState.errors.carrier && (
            <span className="text-red-500 text-sm mt-1.5">
              {form.formState.errors.carrier.message}
            </span>
          )}
        </RingForm.Label>

        <RingForm.Label htmlFor="forgedBy">
          <RingForm.FieldName>Forjado por: </RingForm.FieldName>
          <select
            id="forgedBy"
            {...form.register("forgedBy")}
            className="h-[35px] input !px-5 text-white"
          >
            {Object.values(EForger).map(forger => (
              <option key={forger} value={forger}>
                {capitalize(forger.toLowerCase())}
              </option>
            ))}
          </select>
        </RingForm.Label>
      </section>

      <label className="custum-file-upload " htmlFor="file">
        {!image ? (
          <>
            <div className="icon">
              <UploadFileIcon />
            </div>
            <div className="text">
              <span>Click to upload image</span>
            </div>
            <input
              type="file"
              id="file"
              onChange={e => setImage(e.target.files)}
              accept="image/*"
            />
          </>
        ) : (
          <figure className={`relative size-20 md:size-40`}>
            <Image
              src={URL.createObjectURL(image[0] as any)}
              alt="preview image uploaded"
              fill
            />
          </figure>
        )}
      </label>
      <DialogClose asChild>
        <button
          type="submit"
          onClick={() => setRingId(ringId)}
          className={`bg-blue-400/50 hover:bg-blue-400/80 p-2 rounded-md text-sm transition-all active:translate-y-1`}
        >
          Atualizar
        </button>
      </DialogClose>
    </RingForm.Root>
  );
};
