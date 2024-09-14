import Slider, { Settings as SliderSettings } from 'react-slick';
import { ReactNode } from 'react';

import './styles.css';

interface CustomSlideProps {
  children: ReactNode;
}

export function CustomSlide({ children }: CustomSlideProps) {
  const settings: SliderSettings = {
    className: 'center',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: '60px', // Espaçamento lateral para mostrar partes dos cards
    responsive: [
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          arrows: false,
          centerPadding: '40px', // Ajuste para mobile, para mostrar partes dos cards
        },
      },
      {
        breakpoint: 1024, // Desktop
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px', // Controla o espaçamento entre os cards
        },
      },
    ],
  };

  return (
    <div
      style={{ maxWidth: '1000px', padding: '0 25px 50px 25px', width: '100%' }}
    >
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
