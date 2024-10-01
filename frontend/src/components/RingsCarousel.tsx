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

import { RingsDeleteBtnIconBlack } from "./form/RingsDelete";

interface RingsCarouselProps {
  UserRings: User["rings"];
  isMyProfile?: boolean;
  token: string | undefined;
}

export default function RingsCarousel({
  UserRings,
  isMyProfile = false,
  token,
}: RingsCarouselProps) {
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
    <section className="rounded-lg bg-white p-6 shadow-lg">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {UserRings?.map((ring) => (
            <div
              key={ring.id}
              className="relative flex w-64 flex-none flex-col justify-between rounded-lg bg-gray-50 p-4 shadow-md transition-shadow duration-300 hover:shadow-xl"
            >
              {isMyProfile && (
                <div className="absolute right-2 top-2 flex flex-row items-center justify-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <Link href={`/rings/${ring.id}`}>
                      <FaEdit size={20} />
                    </Link>
                  </motion.button>

                  <RingsDeleteBtnIconBlack ring={ring} token={token} />
                </div>
              )}

              <div className="">
                <h3 className="mt-6 text-xl font-semibold text-gray-800 sm:mt-2">
                  <span className="font-semibold">Name:</span> {ring.name}
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Owner:</span> {ring.owner}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Power:</span> {ring.power}
                </p>
                <p className="mb-4 text-sm text-gray-600">
                  <span className="font-semibold">Forged By:</span>{" "}
                  {ring.forgedBy}
                </p>
              </div>
              <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-lg border-2 border-gray-200">
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
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        <motion.button
          datatype="move-carousel-left"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollPrev}
          className="text-gray-600 hover:text-gray-800"
        >
          <IoIosArrowDropleftCircle size={36} />
        </motion.button>
        <motion.button
          datatype="move-carousel-right"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollNext}
          className="text-gray-600 hover:text-gray-800"
        >
          <IoIosArrowDroprightCircle size={36} />
        </motion.button>
      </div>
    </section>
  );
}
