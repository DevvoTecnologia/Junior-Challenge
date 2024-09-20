"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ringSchema, { CreateRing } from "./schemas/ring-schema";

import RingForm from "@/components/RingForm/RingForm";

export default function Component() {
  const form = useForm<CreateRing>({
    resolver: zodResolver(ringSchema),
  });

  return <RingForm type="Create" form={form} />;
}
