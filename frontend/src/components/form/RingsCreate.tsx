"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

import catchErrorClient from "@/global/catchErrorClient";
import fetchClient from "@/lib/fetchClient";
import type { CreateRingSuccess } from "@/types/Ring";

import { LoadingIcon } from "../Loading";

interface RingsCreateFormProps {
  token: string | undefined;
}

const permittedForgedBy = ["Elfos", "Anões", "Homens", "Sauron"];

export default function RingsCreateForm({ token }: RingsCreateFormProps) {
  const { push, refresh } = useRouter();

  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  const [owner, setOwner] = useState("");
  const [forgedBy, setForgedBy] = useState("");
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
          placeholder="Ex. Ring of Power"
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
          placeholder="Ex. Invisibility"
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
          placeholder="Ex. Frodo Baggins"
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
          placeholder="Ex. Sauron"
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
          Create
        </motion.button>
      )}
    </motion.form>
  );
}
