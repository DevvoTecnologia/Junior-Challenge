"use-client";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import RingModal from "@/app/components/RingModal";
import { FaTrash, FaEdit } from "react-icons/fa";
import Api from "@/../src/services/api";
import { useSession } from "next-auth/react";
import { NextArrow, PrevArrow } from "@/app/components/Arrows";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SliderRing({ rings = [], setRings }: any) {
  const session = useSession();
  const user: any = session.data;

  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [selectedRing, setSelectedRing] = useState<any>(null);

  let sliderRef: any = useRef(null);

  const next = () => {
    sliderRef.slickNext();
  };

  const previous = () => {
    sliderRef.slickPrev();
  };

  useEffect(() => {
    const fetchRings = async () => {
      if (user?.token) {
        const api = new Api(user.token);
        try {
          const updatedRings = await api.getRing();
          setRings(updatedRings);
        } catch (error: any) {
          toast(error.response.data.message, { type: "error" });
        }
      }
    };

    fetchRings().then();
  }, [user?.token]);

  const settings = {
    dots: true,
    infinite: rings.length == 1 ? false : true,
    speed: 500,
    autoplay: false,
    arrows: false,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: rings.length >= 3 ? 3 : rings.length,
          slidesToScroll: rings.length >= 3 ? 3 : rings.length,
          dots: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: rings.length >= 2 ? 2 : rings.length,
          slidesToScroll: rings.length >= 2 ? 2 : rings.length,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: rings.length >= 1 ? 1 : rings.length,
          slidesToScroll: rings.length >= 1 ? 1 : rings.length,
          dots: true,
        },
      },
    ],
  };

  const handleEditClick = (ring: any) => {
    console.log("Dados do anel selecionado:", ring);
    setSelectedRing(ring);
    setModalOpenEdit(true);
  };

  const handleDeletClick = (ring: any) => {
    if (!user?.token) {
      console.error("Usuário não autenticado ou token inválido.");
      return;
    }
    const api = new Api(user.token);
    api
      .deleteRing(ring.id)
      .then((response) => {
        const updatedRings = rings.filter((r: any) => r.id !== ring.id);
        setRings(updatedRings);
        toast(`${response.data.message}`, { type: "success" });
      })
      .catch((error) => {
        console.error("Erro ao deletar o anel:", error);
        toast(`${error.response.data.message}`, { type: "error" });
      })
      .finally(() => {});
  };

  return (
    <div className={"w-[97%]"}>
      {Array.isArray(rings) && rings.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-lg font-normal">
            Nenhum anel disponível para exibir, crie um!
          </p>
        </div>
      ) : (
        <div>
          <Slider centerMode={true}
            {...settings}
            ref={(slider) => {
              sliderRef = slider;
            }}
          >
            {Array.isArray(rings) &&
              rings.map((ring: any) => (
                <div key={ring.id} className={"relative px-4"}>
                  <div
                    className={"top-2 right-2 flex gap-3 justify-end mb-3"}
                  >
                    <button
                      className={
                        "bg-[#4A9EFF] w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                      }
                      onClick={() => handleEditClick(ring)}
                    >
                      <FaEdit className={"-mr-0.5"} color="white" size={15}/>
                    </button>
                    <button
                      className={
                        "bg-red-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                      }
                      onClick={() => handleDeletClick(ring)}
                    >
                      <FaTrash color="white" size={15} />
                    </button>
                  </div>
                  <div
                    className={
                      "bg-[#142a47] rounded-lg p-4 text-white shadow-lg"
                    }
                  >
                    <div
                      className={
                        "bg-[#4A9EFF] text-center py-2 rounded-lg text-lg font-medium mb-4"
                      }
                    >
                      {ring.nome}
                    </div>
                    <div className={"flex justify-center mb-4"}>
                      <img
                        src={ring.imagem}
                        alt={ring.nome}
                        className={
                          "rounded-full w-[100px] h-[100px] object-cover"
                        }
                      />
                    </div>
                    <div className={"bg-[#d3a346] text-center p-4 rounded-md"}>
                      <p className={"mb-1 font-light"}>
                        Forjado por{" "}
                        <span className={"font-bold"}>{ring.forjadoPor}</span>
                      </p>
                      <p className={"mb-1 font-light"}>
                        Portador{" "}
                        <span className={"font-bold"}>{ring.portador}</span>
                      </p>
                      <p className={"italic"}>{ring.poder}</p>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>

          <div className={"w-full flex flex-row items-center justify-center gap-4 mt-8"}>
            <PrevArrow onClick={previous} />
            <NextArrow onClick={next} />
          </div>
        </div>
      )}
      {selectedRing && (
        <RingModal
          initiaData={selectedRing}
          setRings={setRings}
          mode="edit"
          modalOpen={modalOpenEdit}
          setModalOpen={setModalOpenEdit}
        />
      )}
    </div>
  );
}
