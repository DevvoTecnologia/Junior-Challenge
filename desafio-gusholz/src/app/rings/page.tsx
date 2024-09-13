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

export default function ViewRingsPage() {
  const [rings, setRings] = useState<AnelModel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRings = async () => {
    try {
      const response = await fetch('/api');
      const data = await response.json();
      setRings(data.data);
    } catch (error) {
      console.error('Error fetching rings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRings();
  }, []);


  if (loading) return (
    <main className={styles.main}>
      <NavBar selectedPage={2} />
      <p>Loading...</p>
      <Footer />
    </main>
  )

  return (
    <main className={styles.main}>
      <NavBar selectedPage={2} />
      <CardsSlider rings={rings} />
      <Footer />
    </main>
  );
}

export function CardsSlider({ rings }: { rings: AnelModel[] }) {
  const settings = {
    dots: true,
    infinite: rings.length > 1, // Ensure infinite scroll is based on the number of items
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ maxWidth: '50%', overflow: "hidden" }}>
      <Slider {...settings}>
        {rings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>ta vazio paizao</p>
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
