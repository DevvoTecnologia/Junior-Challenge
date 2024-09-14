"use client";
import Footer from "@/components/footer";
import NavBar from "@/components/navBar";
import styles from "./ringsPage.module.css";
import RingCard from "@/components/ringCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import { AnelModel } from "@/models/ring";
import Modal from "@/components/modal";
import NextImage from "next/image";

export default function ViewRingsPage() {
  const [rings, setRings] = useState<AnelModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedRing, setSelectedRing] = useState<number | null>(null);

  const fetchRings = async () => {
    try {
      const response = await fetch("/api");
      const data = await response.json();
      setRings(data.data);
    } catch (error) {
      console.error("Não foi possível dar GET nos aneis", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRings();
  }, []);

  const handleDelete = (id: number) => {
    setSelectedRing(id);
    setModalMessage(`Anel ${id} deletado com sucesso!`);
    setShowModal(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  if (loading)
    return (
      <main className={styles.main}>
        <NavBar selectedPage={2} />
        <p>Carregando...</p>
        <Footer />
      </main>
    );

  return (
    <main className={styles.main}>
      <NavBar selectedPage={2} />
      <CardsSlider rings={rings} onDelete={handleDelete} />
      <Footer />
      {showModal && <Modal
        message="Insira o novo valor para o campo"
        withInput={true}
        onClose={() => setShowModal(false)}
        onConfirm={(inputValue) => console.log("User entered:", inputValue)} />}
    </main>
  );
}

export function CardsSlider({
  rings,
  onDelete,
}: {
  rings: AnelModel[];
  onDelete: (id: number) => void;
}) {
  const settings = {
    dots: true,
    infinite: rings.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ maxWidth: "50%", overflow: "hidden" }}>
      <Slider {...settings}>
        {rings.length === 0 ? (
          <div>
            <h1>Nenhum anel cadastrado :(</h1>
            <NextImage
              width={284}
              alt="A ring vector with a line crossing it"
              height={272}
              src={"/static/images/no-ring-art.png"}
            />
          </div>
        ) : (
          rings.map((ring, index) => (
            <div className={styles.carrousel} key={index}>
              <RingCard
                id={ring.id}
                nome={ring.nome}
                poder={ring.poder}
                portador={ring.portador}
                forjadoPor={ring.forjadoPor}
                imagem={ring.imagem}
              />
            </div>
          ))
        )}
      </Slider>
      <svg width={20} height={20}></svg>
    </div>
  );
}
