"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { FaEdit } from "react-icons/fa";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import type { User } from "@/types/User";

import RingsDeleteBtnIconYellow from "./form/RingsDelete/RingsDeleteBtnIconYellow";

interface RingsCarouselProps {
  UserRings: User["rings"];
  isMyProfile?: boolean;
  token: string | undefined;
}

export default function RingsCarousel({
  UserRings,
  isMyProfile = false,
  token,
}: Readonly<RingsCarouselProps>) {
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
    <section className="rounded-lg border-[1px] border-yellow-600 bg-gradient-to-b from-gray-900 to-gray-800 p-6 shadow-lg">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {UserRings?.map((ring) => (
            <motion.div
              key={ring.id}
              className="relative flex w-64 flex-none flex-col justify-between rounded-lg border-2 border-yellow-600 bg-gray-700 p-4 shadow-md transition-shadow duration-300 hover:shadow-xl"
              style={{ visibility: "visible" }} // Adicione esta linha
            >
              {isMyProfile && (
                <div className="absolute right-2 top-2 flex flex-row items-center justify-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-yellow-400 hover:text-yellow-500"
                  >
                    <Link href={`/rings/${ring.id}`}>
                      <FaEdit size={20} />
                    </Link>
                  </motion.button>

                  <RingsDeleteBtnIconYellow ring={ring} token={token} />
                </div>
              )}

              <div className="text-yellow-200 sm:mt-2">
                <h3 className="mt-6 font-serif text-xl text-yellow-300 sm:mt-2">
                  <span className="font-semibold">Name:</span> {ring.name}
                </h3>
                <p className="text-sm">
                  <span className="font-semibold">Owner:</span> {ring.owner}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Power:</span> {ring.power}
                </p>
                <p className="mb-4 text-sm">
                  <span className="font-semibold">Forged By:</span>{" "}
                  {ring.forgedBy}
                </p>
              </div>
              <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-lg border-2 border-yellow-600 shadow-lg">
                <Image
                  src={ring.url}
                  alt={ring.name}
                  className="h-full w-full object-cover"
                  width={128}
                  height={128}
                  priority
                  unoptimized
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {UserRings && UserRings.length > 1 && (
        <div className="mt-4 flex justify-center space-x-4">
          <motion.button
            datatype="move-carousel-left"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollPrev}
            className="text-yellow-500 hover:text-yellow-600"
          >
            <IoIosArrowDropleftCircle size={36} />
          </motion.button>
          <motion.button
            datatype="move-carousel-right"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollNext}
            className="text-yellow-500 hover:text-yellow-600"
          >
            <IoIosArrowDroprightCircle size={36} />
          </motion.button>
        </div>
      )}
    </section>
  );
}
