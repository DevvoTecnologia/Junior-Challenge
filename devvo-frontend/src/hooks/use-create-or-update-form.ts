"use client";
import { createRing, updateRing } from "@/src/actions/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const createRingSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  power: z.string().min(1, "O poder é obrigatório"),
  carrier: z.string().min(1, "O portador é obrigatório"),
  forgedBy: z.string().min(1, "O forjado é obrigatório"),
});

export type TcreateRingSchema = z.infer<typeof createRingSchema>;

export const useCreateOrUpdateForm = ({
  typeForm,
}: {
  typeForm: "create" | "update";
}) => {
  const router = useRouter();
  const [image, setImage] = useState<any>(undefined);
  const [ringId, setRingId] = useState<string>("undefined");

  const form = useForm<TcreateRingSchema>({
    resolver: zodResolver(createRingSchema),
    defaultValues: {
      carrier: "",
      forgedBy: "HOMEM",
      name: "",
      power: "",
    },
  });

  const onSubmit = async (data: TcreateRingSchema) => {
    const formData = new FormData();
    let response;
    formData.append("name", data.name);
    formData.append("power", data.power);
    formData.append("carrier", data.carrier);
    formData.append("forgedBy", data.forgedBy);

    console.log(`image`, image);

    if (image && image.length > 0) {
      formData.append("image", image[0]);
    } else {
      formData.append("image", "default");
    }

    if (typeForm === "update") {
      response = await updateRing(formData, ringId);
    }

    if (typeForm === "create") {
      response = await createRing(formData);
    }

    if (response && response?.statusCode >= 400) {
      return toast.error(response?.body?.error);
    }

    router.refresh();
    if (typeForm === "create") {
      router.push("/see-rings");
    }
    return toast.success("Anel criado com sucesso");
  };

  return { form, onSubmit, setImage, image, setRingId };
};
