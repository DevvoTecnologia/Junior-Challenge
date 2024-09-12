"use client";
import Footer from "@/components/footer";
import NavBar from "@/components/navBar";
import styles from "./ringsPage.module.css";
import RingCard from "@/components/ringCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MadeBy from "@/models/madeBy";

const mockRings = [
  {
    ringName: "The one ring",
    power: "Make you go to the dark realms",
    holder: "Sauron",
    madeBy: MadeBy.elfs,
    imageUrl: "/static/images/one_ring_second_art.png",
  },
  {
    ringName: "The white ring",
    power: "Make you bright during dark times",
    holder: "Gandalf",
    madeBy: MadeBy.dwarfs,
    imageUrl: "/static/images/one_ring_second_art.png",
  },
  {
    ringName: "The red ring",
    power: "Make you immune to high temperatures",
    holder: "Bilbo",
    madeBy: MadeBy.dwarfs,
    imageUrl: "/static/images/one_ring_second_art.png",
  },
  {
    ringName: "The blue ring",
    power: "Make you breathe underwater",
    holder: "Legolas",
    madeBy: MadeBy.elfs,
    imageUrl: "/static/images/one_ring_second_art.png",
  },
];

export default function ViewRingsPage() {
  return (
    <main className={styles.main}>
      <NavBar isHomepage={false} />
      <CardsSlider />
      <Footer />
    </main>
  );
}

export function CardsSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ maxWidth: '50%', overflow: "hidden" }}>
      <Slider {...settings}>
        {mockRings.map((ring, index) => (
          <div className={styles.carrousel} key={index} >
            <RingCard
              ringName={ring.ringName}
              power={ring.power}
              holder={ring.holder}
              madeBy={ring.madeBy}
              imageUrl={ring.imageUrl}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
