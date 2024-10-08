"use client";

import { motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

interface RingsInputOwnerProps {
  owner: string;
  setOwner: Dispatch<SetStateAction<string>>;
  placeholder: string | undefined;
}

export default function RingsInputOwner({
  owner,
  setOwner,
  placeholder,
}: Readonly<RingsInputOwnerProps>) {
  return (
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
        placeholder={placeholder}
        className="rounded-md border border-gray-300 p-2 text-gray-900"
      />
    </div>
  );
}
