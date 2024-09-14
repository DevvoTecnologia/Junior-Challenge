'use client';

import type { ExistingRing } from '@/app/lib/definitions';
import ModalContent from '@/app/ui/modal/modal-content';
import Slide from '@/app/ui/slick/slide';
import { useState } from 'react';
import Slider from 'react-slick';
import ModalContainer from '../modal/modal-container';

type ModalState = { isOpen: false; ring: null } | { isOpen: true; ring: ExistingRing };

export default function RingsCarousel({ rings }: { rings: ExistingRing[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  const [modal, setModal] = useState<ModalState>({ isOpen: false, ring: null });

  const handleCloseModal = () => {
    setModal({ isOpen: false, ring: null });
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
      <ModalContainer isOpen={modal.isOpen} handleCloseModal={handleCloseModal}>
        {modal.isOpen && <ModalContent ring={modal.ring} handleCloseModal={handleCloseModal} />}
      </ModalContainer>
    </>
  );
}
