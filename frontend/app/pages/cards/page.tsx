"use client";

import DrawerBasic from "@/app/components/sidebar";
import CarouselComponent from "@/app/components/slide";
import { motion } from "framer-motion";

export default function CardScreen() {
  return (
    <div className="h-full w-full items-center justify-center">
      <DrawerBasic />
      <video
        className="absolute -z-30 h-full w-full object-cover"
        src="/castle-background.mp4"
        autoPlay
        loop
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        }}
      >
        <CarouselComponent />
      </motion.div>
    </div>
  );
}
