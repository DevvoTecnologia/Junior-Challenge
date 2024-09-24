import React, { useState } from "react";
import { useRings } from "../../hooks/useRings";
import * as S from "./styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RingForm } from "../RingForm";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slideToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "40px",
};

export function RingCarousel() {
  const { rings, deleteRing } = useRings();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRing, setSelectedRing] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = (id: number) => {
    setSelectedRing(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRing(null);
  };

  const openDeleteModal = (id: number) => {
    setSelectedRing(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRing(null);
  };

  const confirmDelete = () => {
    if (selectedRing !== null) {
      deleteRing(selectedRing);
    }
    closeDeleteModal();
  };

  return (
    <S.Container>
      <Slider {...settings}>
        {rings.map((ring) => (
          <S.RowSlider key={ring.id}>
            <S.SliderText>{ring.name}</S.SliderText>
            <S.SliderText>{ring.power}</S.SliderText>
            <S.SliderText>{ring.carrier}</S.SliderText>
            <S.SliderText>{ring.forgedBy}</S.SliderText>
            <button onClick={() => openDeleteModal(Number(ring.id))}>
              Deletar
            </button>
            <button onClick={() => openModal(Number(ring.id))}>Editar</button>
          </S.RowSlider>
        ))}
      </Slider>

      <S.StyledModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Anel"
        ariaHideApp={false}
      >
        <h2>Editar Anel</h2>
        {selectedRing !== null && (
          <RingForm idEdit={selectedRing} closeModal={closeModal} />
        )}
        <button onClick={closeModal}>Fechar</button>
      </S.StyledModal>

      <S.StyledModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirmar Exclusão"
        ariaHideApp={false}
      >
        <h2>Tem certeza que deseja deletar este anel</h2>
        <button onClick={confirmDelete}>Sim</button>
        <button onClick={closeDeleteModal}>Não</button>
      </S.StyledModal>
    </S.Container>
  );
}
