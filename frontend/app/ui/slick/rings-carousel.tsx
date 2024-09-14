'use client';

import type { ExistingRing } from '@/app/lib/definitions';
import Modal from '@/app/ui/modal/modal';
import Slide from '@/app/ui/slick/slide';
import { useState } from 'react';
import Slider from 'react-slick';

const closeModalState = {
  isOpen: false,
  ring: null,
};

type openModalState = {
  isOpen: true;
  ring: ExistingRing;
};

export default function RingsCarousel({ rings }: { rings: ExistingRing[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  const [modal, setModal] = useState<typeof closeModalState | openModalState>(closeModalState);

  const handleCloseModal = () => {
    setModal(closeModalState);
  };

  const handleOpenModal = (ring: ExistingRing) => {
    setModal({
      isOpen: true,
      ring,
    });
  };

  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          {rings.map((ring) => (
            <Slide key={ring.id} ring={ring} handleOpenModal={handleOpenModal} />
          ))}
        </Slider>
      </div>
      <Modal isOpen={modal.isOpen} ring={modal.ring} handleCloseModal={handleCloseModal} />
    </>
  );
}
