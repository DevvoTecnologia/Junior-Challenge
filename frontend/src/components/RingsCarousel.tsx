"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import type { User } from "@/types/User";

interface RingsCarouselProps {
  UserRings: User["rings"];
}

export default function RingsCarousel({ UserRings }: RingsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="rounded bg-gray-100 shadow-lg">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 p-2">
          {UserRings?.map((ring) => (
            <div
              className="w-5/6 min-w-0 flex-none rounded bg-white p-4 shadow-md"
              key={ring.id}
            >
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                {ring.name}
              </h3>
              <p className="mb-1 text-sm text-gray-600">
                <span className="font-semibold text-gray-700">Owner:</span>{" "}
                {ring.owner}
              </p>
              <p className="mb-1 text-sm text-gray-600">
                <span className="font-semibold text-gray-700">Power:</span>{" "}
                {ring.power}
              </p>
              <p className="mb-4 text-sm text-gray-600">
                <span className="font-semibold text-gray-700">Forged By:</span>{" "}
                {ring.forgedBy}
              </p>
              <div className="relative mx-auto h-64 w-5/6 overflow-hidden rounded-lg md:h-96">
                <Image
                  src={ring.url}
                  alt={ring.name}
                  className="h-full w-full"
                  width={0}
                  height={0}
                  priority
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex justify-center">
        <div className="mb-2 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="embla__prev"
            onClick={scrollPrev}
          >
            <IoIosArrowDropleftCircle size={32} color="black" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="embla__next"
            onClick={scrollNext}
          >
            <IoIosArrowDroprightCircle size={32} color="black" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
