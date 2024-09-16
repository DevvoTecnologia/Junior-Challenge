import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Virtual,
} from "swiper/modules";
import "./styles.css";
import { Card } from "../Card";
import { ringsProvider } from "../../provider/ringsProvider";
import { IAnel } from "../../interfaces/IAnel";
import { useState } from "react";
import { Check, PlusCircle } from "lucide-react";
import styled from "styled-components";
import { OverlayStyled } from "../../styles/Overlay";
import { ContainerIconStyled } from "../../styles/CardContainer";

const ButtonStyled = styled.button`
  position: fixed;
  top: 0;
  padding: 0rem;
  border-radius: 100%;
  border: 0px solid transparent;
  text-align: center;
  display: flex;
  width: fit-content;
  align-self: center;
  margin-left: 18rem;
  margin-top: 1rem;
  z-index: 99;

  .lucide {
    cursor: pointer;
  }
`;

const ContainerApp = styled.div`
  display: flex;
  padding-top: 1rem;
  flex-direction: column-reverse;
  align-items: center;
`;

export const CardSlider = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [lastSlide, setLastSlide] = useState(0);
  const [editSlide, setEditSlide] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [modalMessage, setModalMessage] = useState(false);

  const pagination = {
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 1,
    shortSwipes: false,
  };

  const { data } = ringsProvider();

  const slideTo = (index: number): void => {
    const swipe = swiperRef as SwiperClass;
    swipe.slideTo(index - 1, 0);
  };

  const newRing = async (): Promise<void> => {
    await setEditSlide(!editSlide);
    slideTo(lastSlide + 2);
  };

  return (
    <>
      <ContainerApp>
        <Swiper
          pagination={pagination}
          onSwiper={setSwiperRef}
          effect={"coverflow"}
          grabCursor={true}
          //   loop={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: false,
          }}
          slideToClickedSlide={true}
          modules={[EffectCoverflow, Pagination, Virtual, Navigation]}
          className="mySwiper"
          navigation={true}
        >
          {data &&
            data.map((anel: IAnel, index) => {
              {
                lastSlide < index && setLastSlide(index);
              }
              return (
                <SwiperSlide key={index}>
                  <Card
                    imgRing={String(index + 1)}
                    id={anel.id}
                    name={anel.name}
                    forger={anel.forger}
                    holder={anel.forger}
                    power={anel.power}
                  />
                </SwiperSlide>
              );
            })}
          {editSlide && (
            <SwiperSlide>
              <Card
                imgRing={String(lastSlide + 2)}
                name={""}
                forger={""}
                holder={""}
                power={""}
                newRing={editSlide}
                edicaoAtivada={setEditSlide}
                setErrorMessage={setErrorMessage}
                modalMessage={modalMessage}
                setModalMessage={setModalMessage}
              />
            </SwiperSlide>
          )}
        </Swiper>
        {!editSlide && (
          <ButtonStyled slot="wrapper-end" onClick={newRing}>
            <PlusCircle size={42} strokeWidth={1}></PlusCircle>
          </ButtonStyled>
        )}
        {modalMessage && (
          <OverlayStyled  onClick={()=>setModalMessage(!modalMessage)}>
            <dialog open={modalMessage}>
              <h1>{errorMessage}</h1>
              <ContainerIconStyled onClick={()=>setModalMessage(!modalMessage)}>
                <Check size={42} strokeWidth={1} />
              </ContainerIconStyled>
            </dialog>
          </OverlayStyled>
        )}
      </ContainerApp>
    </>
  );
};
