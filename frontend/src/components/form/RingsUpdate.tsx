"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

import catchErrorClient from "@/global/catchErrorClient";
import fetchClient from "@/lib/fetchClient";
import type { PermittedForgedBy, UpdateRingSuccess } from "@/types/Ring";

import { LoadingIcon } from "../Loading";
import RingsInputForgedBy from "../RingsGeneralInputs/ForgedBy";
import RingsInputImage from "../RingsGeneralInputs/Image";
import RingsInputName from "../RingsGeneralInputs/Name";
import RingsInputOwner from "../RingsGeneralInputs/Owner";
import RingsInputPower from "../RingsGeneralInputs/Power";

interface RingsUpdateFormProps {
  token: string | undefined;
  ringId: string;
  responseName: string | undefined;
  responsePower: string | undefined;
  responseOwner: string | undefined;
  responseForgedBy: PermittedForgedBy | undefined;
}

const permittedForgedBy: PermittedForgedBy[] = [
  "Elfos",
  "Anões",
  "Homens",
  "Sauron",
];

export default function RingsUpdateForm({
  token,
  ringId,
  responseName,
  responsePower,
  responseOwner,
  responseForgedBy,
}: Readonly<RingsUpdateFormProps>) {
  const { push, refresh } = useRouter();

  const defaultName = responseName || ""; // nosonar
  const defaultPower = responsePower || ""; // nosonar
  const defaultOwner = responseOwner || ""; // nosonar
  const defaultForgedBy = responseForgedBy || "Elfos"; // nosonar

  const [name, setName] = useState(defaultName);
  const [power, setPower] = useState(defaultPower);
  const [owner, setOwner] = useState(defaultOwner);
  const [forgedBy, setForgedBy] = useState<PermittedForgedBy>(defaultForgedBy);

  const [image, setImage] = useState<File | null>(null);

  const [isPending, startTransition] = useTransition();

  // Sort the permittedForgedBy initiating with the defaultForgedBy
  const sortedForgedBy = responseForgedBy
    ? [
        responseForgedBy,
        ...permittedForgedBy.filter((item) => item !== responseForgedBy),
      ]
    : permittedForgedBy;

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !name.trim() &&
      !power.trim() &&
      !owner.trim() &&
      !forgedBy.trim() &&
      !image
    ) {
      return toast.error("Please fill in at least one field.");
    }

    if (!permittedForgedBy.includes(forgedBy)) {
      return toast.error(
        "The ring can only be forged by Elfos, Anões, Homens, or Sauron.",
      );
    }

    const formData = new FormData();

    if (name) {
      formData.append("name", name);
    }
    if (power) {
      formData.append("power", power);
    }
    if (owner) {
      formData.append("owner", owner);
    }
    if (forgedBy) {
      formData.append("forgedBy", forgedBy);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      await fetchClient.put<UpdateRingSuccess>(`/ring/${ringId}`, formData, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      toast.success("Ring updated successfully.");

      push("/rings");

      refresh();
    } catch (error) {
      return catchErrorClient(
        error,
        "An error occurred while updating the ring.",
      );
    }
  }

  return (
    <motion.form
      onSubmit={(e) => {
        startTransition(async () => await submitForm(e));
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
        placeholder={responseName}
      />

      <RingsInputPower
        power={power}
        setPower={setPower}
        placeholder={responsePower}
      />

      <RingsInputOwner
        owner={owner}
        setOwner={setOwner}
        placeholder={responseOwner}
      />

      <RingsInputForgedBy
        forgedBy={forgedBy}
        setForgedBy={setForgedBy}
        forgedByList={sortedForgedBy}
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
          Save
        </motion.button>
      )}
    </motion.form>
  );
}
