"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

import catchErrorClient from "@/global/catchErrorClient";
import fetchClient from "@/lib/fetchClient";
import type { CreateRingSuccess, PermittedForgedBy } from "@/types/Ring";

import { LoadingIcon } from "../Loading";
import RingsInputForgedBy from "../RingsGeneralInputs/ForgedBy";
import RingsInputImage from "../RingsGeneralInputs/Image";
import RingsInputName from "../RingsGeneralInputs/Name";
import RingsInputOwner from "../RingsGeneralInputs/Owner";
import RingsInputPower from "../RingsGeneralInputs/Power";

interface RingsCreateFormProps {
  token: string | undefined;
}

const permittedForgedBy: PermittedForgedBy[] = [
  "Elfos",
  "Anões",
  "Homens",
  "Sauron",
];

export default function RingsCreateForm({
  token,
}: Readonly<RingsCreateFormProps>) {
  const { push, refresh } = useRouter();

  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  const [owner, setOwner] = useState("");
  const [forgedBy, setForgedBy] = useState<PermittedForgedBy>("Elfos");
  const [image, setImage] = useState<File | null>(null);

  const [isPending, startTransition] = useTransition();

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !name.trim() ||
      !power.trim() ||
      !owner.trim() ||
      !forgedBy.trim() ||
      !image
    ) {
      return toast.error("Please fill out all fields.");
    }

    if (name.length > 35) {
      return toast.error("The name must be less than 35 characters.");
    }

    if (power.length > 255) {
      return toast.error("The power must be less than 255 characters.");
    }

    if (owner.length > 20) {
      return toast.error("The owner must be less than 20 characters.");
    }

    if (!permittedForgedBy.includes(forgedBy)) {
      return toast.error(
        "The ring can only be forged by Elfos, Anões, Homens, or Sauron.",
      );
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("power", power);
    formData.append("owner", owner);
    formData.append("forgedBy", forgedBy);
    formData.append("image", image);

    try {
      await fetchClient.post<CreateRingSuccess>("/ring", formData, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      toast.success("Ring created successfully.");

      push("/rings");

      refresh();
    } catch (error) {
      return catchErrorClient(
        error,
        "An error occurred while creating the ring.",
      );
    }
  }

  return (
    <motion.form
      onSubmit={(e) => {
        startTransition(async () => {
          await submitForm(e);
        });
      }}
      method="POST"
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="w-full max-w-lg space-y-4 rounded-lg bg-white p-6 text-black shadow-md"
    >
      <RingsInputName
        name={name}
        setName={setName}
        placeholder="Ex. Ring of Power"
      />

      <RingsInputPower
        power={power}
        setPower={setPower}
        placeholder="Ex. Invisibility"
      />

      <RingsInputOwner
        owner={owner}
        setOwner={setOwner}
        placeholder="Ex. Frodo Baggins"
      />

      <RingsInputForgedBy
        forgedBy={forgedBy}
        setForgedBy={setForgedBy}
        forgedByList={permittedForgedBy}
      />

      <RingsInputImage setImage={setImage} />

      {isPending ? (
        <div className="flex justify-center">
          <LoadingIcon />
        </div>
      ) : (
        <motion.button
          disabled={isPending}
          type="submit"
          className="w-full rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
        >
          Create
        </motion.button>
      )}
    </motion.form>
  );
}
