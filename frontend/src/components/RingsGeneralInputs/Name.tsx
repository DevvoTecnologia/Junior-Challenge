"use client";

import { motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

interface RingsInputNameProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  placeholder: string | undefined;
}

export default function RingsInputName({
  name,
  setName,
  placeholder,
}: Readonly<RingsInputNameProps>) {
  return (
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
        placeholder={placeholder}
        className="rounded-md border border-gray-300 p-2 text-gray-900"
      />
    </div>
  );
}
