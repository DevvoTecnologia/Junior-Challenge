import Slider from "react-slick";
import NextImage from "next/image";
import styles from "./Card-slider.module.css";
import { AnelModel } from "@/models/ring";
import RingCard from "@/components/ringCard";

export default function CardsSlider({
  rings,
}: {
  rings: AnelModel[];
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
