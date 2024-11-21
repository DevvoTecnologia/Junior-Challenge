import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const RingCarousel = () => {
  const [rings, setRings] = useState([]);

  useEffect(() => {
    const fetchRings = async () => {
      const response = await axios.get("http://localhost:5000/api/rings");
      setRings(response.data);
    };
    fetchRings();
  }, []);

  <Slider
  dots={true}
  infinite={true}
  speed={500}
  slidesToShow={3}
  slidesToScroll={1}
>
  <div>
    <h3>Slide 1</h3>
  </div>
  <div>
    <h3>Slide 2</h3>
  </div>
  <div>
    <h3>Slide 3</h3>
  </div>
</Slider>

  return (
    <Slider {...setRings}>
      {rings.map((ring: any) => (
        <div key={ring._id}>
          <img src={ring.imagem} alt={ring.nome} />
          <h3>{ring.nome}</h3>
          <p>{ring.poder}</p>
          <p>{ring.portador}</p>
          <p>{ring.forjadoPor}</p>
        </div>
      ))}
    </Slider>
  );
};

export default RingCarousel;
