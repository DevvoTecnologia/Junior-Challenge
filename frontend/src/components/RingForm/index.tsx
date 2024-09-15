import React from "react";
import * as S from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRings } from "../../hooks/useRings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ringSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  power: z.string().min(1, { message: "O poder é obrigatório" }),
  carrier: z.string().min(1, { message: "O portador é obrigatório" }),
  forgedBy: z.enum(["Elves", "Dwarves", "Men", "Sauron"], {
    message: "Seleção inválida",
  }),
  image: z.string().url({ message: "A URL da imagem é inválida" }),
});

type RingFormData = z.infer<typeof ringSchema>;

interface RingFormProps {
  idEdit?: number | null;
  closeModal?: () => void;
}

export function RingForm({ idEdit, closeModal }: RingFormProps) {
  const { rings, addRing, updateRing } = useRings();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RingFormData>({
    resolver: zodResolver(ringSchema),
  });

  const ringId = idEdit || id;

  const onSubmit = (data: RingFormData) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    if (ringId) {
      updateRing(Number(ringId), data);
      if (closeModal) closeModal();
      return;
    }
    addRing(data);
  };

  useEffect(() => {
    if (ringId) {
      const ring = rings.find((ring) => ring.id === Number(ringId));

      if (ring) {
        setValue("name", ring.name);
        setValue("power", ring.power);
        setValue("carrier", ring.carrier);
        setValue(
          "forgedBy",
          ring.forgedBy as "Elves" | "Dwarves" | "Men" | "Sauron"
        );
        setValue("image", ring.image);
      }
    }
  }, [ringId, rings, setValue]);

  return (
    <>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.FormControl>
          <label>Nome do Anel</label>
          <input {...register("name")} />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </S.FormControl>
        <S.FormControl>
          <label>Poder</label>
          <input {...register("power")} />
          {errors.power && (
            <p style={{ color: "red" }}>{errors.power.message}</p>
          )}
        </S.FormControl>
        <S.FormControl>
          <label>Portador</label>
          <input {...register("carrier")} />
          {errors.carrier && (
            <p style={{ color: "red" }}>{errors.carrier.message}</p>
          )}
        </S.FormControl>
        <S.FormControl>
          <label>Forjado por</label>
          <select {...register("forgedBy")}>
            <option value="Elves">Elfos</option>
            <option value="Dwarves">Anões</option>
            <option value="Men">Homens</option>
            <option value="Sauron">Sauron</option>
          </select>
          {errors.forgedBy && (
            <p style={{ color: "red" }}>{errors.forgedBy.message}</p>
          )}
        </S.FormControl>
        <S.FormControl>
          <label>Imagem</label>
          <input {...register("image")} />
          {errors.image && (
            <p style={{ color: "red" }}>{errors.image.message}</p>
          )}
        </S.FormControl>
        <button type="submit">{ringId ? "Atualizar" : "Criar"}</button>
      </S.Form>
      <ToastContainer />
    </>
  );
}
