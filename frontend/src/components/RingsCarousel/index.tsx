"use client";

import "@/css/ringsCarousel/embla.css";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import type { User } from "@/types/User";

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

interface RingsCarouselProps {
  UserRings: User["rings"];
}

export default function RingsCarousel({ UserRings }: RingsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla rounded-lg bg-gray-100 shadow-lg">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container gap-4">
          {UserRings?.map((ring) => (
            <div
              className="embla__slide rounded bg-white p-4 shadow-md"
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
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
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

      <div className="embla__controls mt-2 flex justify-center">
        <div className="embla__buttons flex">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
}
