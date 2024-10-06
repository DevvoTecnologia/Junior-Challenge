"use client";

import { motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

interface RingsInputImageProps {
  setImage: Dispatch<SetStateAction<File | null>>;
}

export default function RingsInputImage({
  setImage,
}: Readonly<RingsInputImageProps>) {
  return (
    <div className="flex cursor-pointer flex-col space-y-2">
      <motion.label htmlFor="image" className="font-semibold">
        Image
      </motion.label>
      <motion.input
        id="image"
        name="image"
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        accept="image/jpeg, image/png"
        className="cursor-pointer file:rounded-md file:border file:border-gray-300 file:p-2 file:text-sm file:text-gray-600"
      />
    </div>
  );
}
