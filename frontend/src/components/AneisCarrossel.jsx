import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getAneis } from '../services/AnelService';
import styles from './css/AneisCarrrossel.module.css';
import { useNavigate } from 'react-router-dom';

const AneisCarrossel = () => {
  const [aneis, setAneis] = useState([]);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getAneisData = async () => {
    try {
      const aneisData = await getAneis();

      setAneis(aneisData);
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao retornar os aneis');
    }
  };

  useEffect(() => {
    if (!aneis.length) getAneisData();
  }, []);

  if (aneis.length)
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {aneis.map((anel) => {
            return (
              <div key={anel._id}>
                {anel.imagem_url ? (
                  <img src={anel.imagem_url} className={styles.img} alt="" />
                ) : (
                  <div className={styles.imgFallback}></div>
                )}
              </div>
            );
          })}
        </Slider>
      </div>
    );

  return <div>Carregando...</div>;
};

export default AneisCarrossel;
