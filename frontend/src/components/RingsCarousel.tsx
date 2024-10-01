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
    <section className="rounded bg-gray-100 shadow-lg">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 p-2">
          {UserRings?.map((ring) => (
            <div
              className="relative w-4/6 min-w-0 flex-none rounded bg-white p-4 shadow-md"
              key={ring.id}
            >
              {isMyProfile && (
                <div className="absolute right-2 top-2">
                  <Link href={`/rings/${ring.id}`} className="mr-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaEdit size={24} color="black" />
                    </motion.button>
                  </Link>

                  <RingsDeleteBtnIconBlack ring={ring} token={token} />
                </div>
              )}

              <h3 className="mb-2 mt-6 text-lg font-semibold text-gray-800 sm:mt-2">
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
              <div className="relative mx-auto h-28 w-32 overflow-hidden rounded-lg sm:h-32 sm:w-1/3 md:h-[12rem] md:w-2/3 lg:h-[14rem] lg:w-3/5 xl:w-4/12">
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
            datatype="move-carousel-left"
          >
            <IoIosArrowDropleftCircle size={32} color="black" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="embla__next"
            onClick={scrollNext}
            datatype="move-carousel-right"
          >
            <IoIosArrowDroprightCircle size={32} color="black" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
