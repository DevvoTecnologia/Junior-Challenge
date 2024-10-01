"use client";

import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

import fetchClient from "@/lib/fetchClient";
import type { UpdateRingSuccess } from "@/types/Ring";

import { LoadingIcon } from "../Loading";

interface RingsUpdateFormProps {
  token: string | undefined;
  ringId: string;
  responseName: string | undefined;
  responsePower: string | undefined;
  responseOwner: string | undefined;
  responseForgedBy: string | undefined;
}

const permittedForgedBy = ["Elfos", "Anões", "Homens", "Sauron"];

export default function RingsUpdateForm({
  token,
  ringId,
  responseName,
  responsePower,
  responseOwner,
  responseForgedBy,
}: RingsUpdateFormProps) {
  const { push, refresh } = useRouter();

  const defaultName = responseName || "";
  const defaultPower = responsePower || "";
  const defaultOwner = responseOwner || "";
  const defaultForgedBy = responseForgedBy || "";

  const [name, setName] = useState(defaultName);
  const [power, setPower] = useState(defaultPower);
  const [owner, setOwner] = useState(defaultOwner);
  const [forgedBy, setForgedBy] = useState(defaultForgedBy);

  const [image, setImage] = useState<File | null>(null);

  const [isPending, startTransition] = useTransition();

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
      if (error instanceof AxiosError) {
        if (Array.isArray(error.response?.data.message)) {
          return error.response?.data.message.forEach((message: string) => {
            toast.error(message);
          });
        }

        return toast.error(error.response?.data.message);
      }

      return toast.error("An error occurred while updating the ring.");
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
      <div className="flex flex-col space-y-2">
        <motion.label htmlFor="name" className="font-semibold">
          Name
        </motion.label>
        <motion.input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={responseName}
          className="rounded-md border border-gray-300 p-2 text-gray-900"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <motion.label htmlFor="power" className="font-semibold">
          Power
        </motion.label>
        <motion.input
          id="power"
          name="power"
          type="text"
          value={power}
          onChange={(e) => setPower(e.target.value)}
          placeholder={responsePower}
          className="rounded-md border border-gray-300 p-2 text-gray-900"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <motion.label htmlFor="owner" className="font-semibold">
          Owner
        </motion.label>
        <motion.input
          id="owner"
          name="owner"
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder={responseOwner}
          className="rounded-md border border-gray-300 p-2 text-gray-900"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <motion.label htmlFor="forgedBy" className="font-semibold">
          Forged By
        </motion.label>
        <motion.input
          id="forgedBy"
          name="forgedBy"
          type="text"
          value={forgedBy}
          onChange={(e) => setForgedBy(e.target.value)}
          placeholder={responseForgedBy}
          className="rounded-md border border-gray-300 p-2 text-gray-900"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <motion.label htmlFor="image" className="font-semibold">
          Image
        </motion.label>
        <motion.input
          id="image"
          name="image"
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          accept="image/*"
          className="cursor-pointer file:rounded-md file:border file:border-gray-300 file:p-2 file:text-sm file:text-gray-600"
        />
      </div>

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
