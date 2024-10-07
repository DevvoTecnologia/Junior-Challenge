import React from 'react';
import Slider from 'react-slick';
import styles from './Carousel.module.css';
import Card from '../Card/Card';
import { useNavigate } from 'react-router-dom';

interface RingData {
  id: number;
  imgSrc: string;
  name: string;
  power: string;
  carrier: string;
  forgedBy: string;
}

const Carousel: React.FC = () => {
  const navigate = useNavigate();

  const ringData: RingData[] = [
    {
      id: 1,
      imgSrc: "img/anel_1.png",
      name: "O anel do poder",
      power: "Controlar os outros anéis",
      carrier: "Sauron",
      forgedBy: "Sauron"
    },
    {
      id: 2,
      imgSrc: "img/anel_2.png",
      name: "Nenya, o Anel da Água",
      power: "Controlar as águas",
      carrier: "Galadriel",
      forgedBy: "Celebrimbor"
    },
    {
      id: 3,
      imgSrc: "img/anel_3.png",
      name: "Vilya, o Anel do Ar",
      power: "Controlar o vento",
      carrier: "Elrond",
      forgedBy: "Celebrimbor"
    }
  ];

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 3,
    speed: 2000,
    dots: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerPadding: "50px",
        }
      },
      {
        breakpoint: 1090,
        settings: {
          slidesToShow: 2,
          centerPadding: "50px",
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "10px",
          arrows: false,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "30px",
          arrows: false,
        }
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "15px",
          arrows: false,
        }
      }
    ]
  };

  const handleCardClick = (ring: RingData) => {
    navigate('/register', { state: ring });
  };

  return (
    <div className={styles.carousel}>
      <Slider {...settings}>
        {ringData.map((ring) => (
          <div key={ring.id} onClick={() => handleCardClick(ring)}>
            <Card
              imgSrc={ring.imgSrc}
              name={ring.name}
              power={ring.power}
              carrier={ring.carrier}
              forgedBy={ring.forgedBy}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;