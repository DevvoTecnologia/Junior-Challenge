"use client";
import { EForger } from "@/src/@types";
import { capitalize } from "@/src/utils/capitalize";
import Image from "next/image";

import { useCreateOrUpdateForm } from "../../../hooks/use-create-or-update-form";
import { GoldenButton } from "../../buttons/golden-button";
import { UploadFileIcon } from "../../icons-svg/upload-file-icon";
import { RingFormFieldName } from "./form-parts/ring-form-field-name";
import { RingFormLabel } from "./form-parts/ring-form-label";
import { RingFormRoot } from "./form-parts/ring-form-root";

export const RingForm = {
  Root: RingFormRoot,
  Label: RingFormLabel,
  FieldName: RingFormFieldName,
};
export const RingFormLayout = () => {
  const { form, image, onSubmit, setImage } = useCreateOrUpdateForm({
    typeForm: "create",
  });

  return (
    <RingForm.Root
      onSubmit={form.handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
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

      <label className="custum-file-upload" htmlFor="file">
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

      <GoldenButton>Criar</GoldenButton>
    </RingForm.Root>
  );
};
