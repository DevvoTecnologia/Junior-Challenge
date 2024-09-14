"use-client"
import React, {useState, useEffect, useRef} from "react";
import Slider from "react-slick";
import RingModal from "@/app/components/RingModal";
import { FaTrash, FaEdit } from 'react-icons/fa';
import Api from "@/../src/services/api";
import ModalMensagens from "@/app/components/ModalMensagens";
import { useSession } from "next-auth/react";
import {useComponentSize} from "@/hooks/useComponentSize.hooks";
import {useWindowSize} from "@/hooks/useWindowSize.hooks";
import {NextArrow, PrevArrow} from "@/app/components/Arrows";

export default function SliderRing({ rings = [], setRings }: any) {

    const swiperRef = useRef(null);
    const windowSize = useWindowSize();
    const swiperSize = useComponentSize(swiperRef);

    const numberOfSlidesRender = (winSize: number) => {
        if (winSize > 1400) {
            return 3;
        }
        if (winSize > 1000) {
            return 2;
        }
        return 1;
    };

    const session = useSession();
    const user: any = session.data;

    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const [selectedRing, setSelectedRing] = useState<any>(null);
    const [modalOpenMsg, setModalOpenMsg] = useState(false);
    const [mensagens, setMensagens] = useState<string[]>([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: windowSize.width ? numberOfSlidesRender(windowSize.width) : 3,
        slidesToScroll: windowSize.width ? numberOfSlidesRender(windowSize.width) : 1,
        autoplay: true,
        arrows: true,
        nextArrow: <NextArrow className={''} style={{}} onClick={() => { }} />,
        prevArrow: <PrevArrow className={''} style={{}} onClick={() => { }} />,
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
        api.deleteRing(ring.id)
            .then(data => {
                console.log("response", data);
                const updatedRings = rings.filter((r: any) => r.id !== ring.id);
                setRings(updatedRings);
                setMensagens([data.message]);
            })
            .catch(error => {
                console.error("Erro ao deletar o anel:", error);
                setMensagens([error.message]);
            })
            .finally(() => {
                setModalOpenMsg(true);
            });
    };

    useEffect(() => {
        const fetchRings = async () => {
            if (user?.token) {
                const api = new Api(user.token);
                try {
                    const updatedRings = await api.getRing();
                    setRings(updatedRings);
                } catch (error) {
                    console.error("Erro ao buscar anéis:", error);
                }
            }
        };

        fetchRings().then();
    }, [user?.token]);

    return (
        <div className={"w-[90%] mx-auto "}>
            {Array.isArray(rings) && rings.length === 0 ? (
                <div className="text-center py-4">
                    <p className="text-lg font-bold text-black-700">Nenhum anel disponível para exibir, crie um!</p>
                </div>
            ) : (
                <Slider {...settings}>
                    {Array.isArray(rings) && rings.map((ring: any) => (
                        <div key={ring.id} className={"relative px-4"}>
                            <div className={"top-2 right-2 flex gap-3 justify-end mb-1.5"}>
                                <button
                                    className={"bg-amber-400 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"}
                                    onClick={() => handleDeletClick(ring)}
                                >
                                    <FaTrash />
                                </button>
                                <button
                                    className={"bg-cyan-400 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"}
                                    onClick={() => handleEditClick(ring)}
                                >
                                    <FaEdit />
                                </button>
                            </div>
                            <div className={"bg-[#142a47] rounded-lg p-4 text-white shadow-lg"}>
                                <div className={"bg-[#4A9EFF] text-center py-2 rounded-lg text-lg font-bold mb-4"}>
                                    {ring.nome}
                                </div>
                                <div className={"flex justify-center mb-4"}>
                                    <img
                                        src={ring.imagem}
                                        alt={ring.nome}
                                        className={"rounded-full w-[100px] h-[100px] object-cover"}
                                    />
                                </div>
                                <div className={"bg-[#d3a346] text-center p-4 rounded-md"}>
                                    <p className={"mb-1 font-semibold"}>
                                        Forjado por <span className={"font-bold"}>{ring.forjadoPor}</span>
                                    </p>
                                    <p className={"mb-1 font-semibold"}>
                                        Portador <span className={"font-bold"}>{ring.portador}</span>
                                    </p>
                                    <p className={"italic"}>
                                        {ring.poder}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
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
            <ModalMensagens
                mensagens={mensagens}
                modalOpen={modalOpenMsg}
                setModalOpen={setModalOpenMsg}
            />
        </div>
    );
}
