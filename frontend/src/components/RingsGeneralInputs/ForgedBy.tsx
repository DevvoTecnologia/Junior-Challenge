"use client";

import { motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

import type { PermittedForgedBy } from "@/types/Ring";

interface RingsInputForgedByProps {
  forgedBy: PermittedForgedBy;
  setForgedBy: Dispatch<SetStateAction<PermittedForgedBy>>;
  forgedByList: PermittedForgedBy[];
}

export default function RingsInputForgedBy({
  forgedBy,
  setForgedBy,
  forgedByList,
}: Readonly<RingsInputForgedByProps>) {
  return (
    <div className="flex flex-col space-y-2">
      <motion.label
        htmlFor="forgedBy"
        className="text-lg font-semibold text-gray-700"
      >
        Forged By
      </motion.label>
      <div className="flex flex-col space-y-3">
        {forgedByList.map((option) => (
          <label
            key={option}
            className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors ${forgedBy === option ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"}`}
          >
            <input
              type="radio"
              name="forgedBy"
              value={option}
              checked={forgedBy === option}
              onChange={(e) => {
                setForgedBy(e.target.value as PermittedForgedBy);
              }}
              className="form-radio h-4 w-4 text-blue-600 transition-colors focus:ring-blue-500"
            />
            <span
              className={`font-medium ${forgedBy === option ? "text-blue-600" : "text-gray-700"}`}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
