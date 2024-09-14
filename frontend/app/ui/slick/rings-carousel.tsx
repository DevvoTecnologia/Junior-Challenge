'use client';

import type { Ring } from '@/app/lib/definitions';
import Slide from '@/app/ui/slick/slide';
import Slider from 'react-slick';

export default function RingsCarousel({ rings }: { rings: Ring[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {rings.map((ring) => (
          <Slide key={ring.id} ring={ring} />
        ))}
      </Slider>
    </div>
  );
}
