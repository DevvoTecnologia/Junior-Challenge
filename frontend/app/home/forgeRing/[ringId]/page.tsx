"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ringSchema, { CreateRing } from "../schemas/ring-schema";
import useQueryGetById from "@/hooks/rings/useQueryGetById";
import RingForm from "@/components/RingForm/RingForm";
import { useEffect } from "react";

export default function Page({
  params: { ringId },
}: {
  params: { ringId: string };
}) {
  const { data: ring, isLoading } = useQueryGetById(ringId);

  const form = useForm<CreateRing>({
    values: ring
      ? {
          ...ring,
          forjadoPor: ring.forjadoPor,
        }
      : undefined,
    resolver: zodResolver(ringSchema),
  });

  useEffect(() => {
    form.setValue("forjadoPor", ring ? ring.forjadoPor : "");
  }, [ring, form]);

  if (isLoading) {
    return (
      <>
        <p>Sauron está procurando pelo anel...</p>
      </>
    );
  }

  return (
    <>
      <RingForm type="Edit" form={form} _id={ringId} />
    </>
  );
}
