// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CardComponent from "./card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CarouselComponent() {
  const [data, setData] = useState([]);

  axios.defaults.baseURL = "http://localhost:3000";
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("/cards", {
      headers: {
        Accept: "/",
        "Content-Type": "application/json",
      },
    });

    setData(response.data);
  };

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={60}
      slidesPerView={6}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay
      className="fixed left-96 top-52"
    >
      {data.map((card) => {
        return (
          <SwiperSlide key={card}>
            <CardComponent
              id={card.id}
              ring={card.ring}
              power={card.power}
              proper={card.proper}
              blacksmith={card.blacksmith}
              isDelete
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
