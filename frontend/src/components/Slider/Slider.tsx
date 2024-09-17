import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../Card/Card";
import { ringAPI } from "../../api/api";
import "./Slider.css";
import { useRingContext } from "../../context/RingContext";

export default function CardSlider() {
  const { setEditingRingId, fetchRings, rings} = useRingContext();

  const handleDelete = async (id: string) => {
    try {
      await ringAPI.deleteRing(id);
      console.log("Deletado com sucesso");
      fetchRings(); 
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 520,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1420,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const handleEditClick =
    (id: string) => {
      setEditingRingId(id);
    };

  return (
    <div className="slider">
      <Slider {...settings}>
        {rings.map((ring) => (
          <Card
            key={ring._id}
            onClickFunction={() => handleEditClick(ring._id)}
            ring={ring}
            onDelete={handleDelete} 
          />
        ))}
      </Slider>
    </div>
  );
}
