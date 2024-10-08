"use client";

import { motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

interface RingsInputPowerProps {
  power: string;
  setPower: Dispatch<SetStateAction<string>>;
  placeholder: string | undefined;
}

export default function RingsInputPower({
  power,
  setPower,
  placeholder,
}: Readonly<RingsInputPowerProps>) {
  return (
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
        placeholder={placeholder}
        className="rounded-md border border-gray-300 p-2 text-gray-900"
      />
    </div>
  );
}
