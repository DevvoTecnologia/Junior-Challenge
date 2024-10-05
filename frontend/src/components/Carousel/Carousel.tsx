import React from 'react';
import Slider from 'react-slick';
import styles from './Carousel.module.css';
import Text from '../Text/Text';

const Carousel: React.FC = () => {
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

  return (
    <div className={styles.carousel}>
      <Slider {...settings}>
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.img}>
              <img src="img/anel_1.png" alt="Imagem 1" />
            </div>
            <div className={styles.infoCard}>
              <div className={styles.titleCard}>
                <Text content={"O anel do poder:"} color={"#000"} size={"medium"} bold={true}/>
              </div>
              <div className={styles.ringInfo}>
                <div className={styles.dFlex}>
                  <Text className={styles.bold} content={"Poder:"} color={"#000"} size={"small"} bold={true}/>
                  <Text content={"Controlar os outros anéis"} color={"#4c2e03"} size={"small"} bold={false}/>
                </div>
                <div className={styles.dFlex}>
                  <Text className={styles.bold} content={"Portador:"} color={"#000"} size={"small"} bold={true}/>
                  <Text content={"Sauron"} color={"#4c2e03"} size={"small"} bold={false}/>
                </div>
                <div className={styles.dFlex}>
                  <Text className={styles.bold} content={"Forjado por:"} color={"#000"} size={"small"} bold={true}/>
                  <Text content={"Sauron"} color={"#4c2e03"} size={"small"} bold={false}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.img}>
              <img src="img/anel_2.png" alt="Imagem 2" />
            </div>
            <div className={styles.infoCard}>
              <div className={styles.titleCard}>
                <Text content={"Nenya, o Anel da Água"} color={"#000"} size={"medium"} bold={true}/>
              </div>
              <div className={styles.ringInfo}>
                <div className={styles.dFlex}>
                  <Text className={styles.bold} content={"Poder:"} color={"#000"} size={"small"} bold={true}/>
                  <Text content={"Controlar as águas"} color={"#4c2e03"} size={"small"} bold={false}/>
                </div>
                <div className={styles.dFlex}>
                  <Text className={styles.bold} content={"Portador:"} color={"#000"} size={"small"} bold={true}/>
                  <Text content={"Galadriel"} color={"#4c2e03"} size={"small"} bold={false}/>
                </div>
                <div className={styles.dFlex}>
                  <Text className={styles.bold} content={"Forjado por:"} color={"#000"} size={"small"} bold={true}/>
                  <Text content={"Celebrimbor"} color={"#4c2e03"} size={"small"} bold={false}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.img}>
              <img src="img/anel_3.png" alt="Imagem 3" />
            </div>
            <div className={styles.infoCard}>
              <div className={styles.titleCard}>
                <Text content={"Vilya, o Anel do Ar"} color={"#000"} size={"medium"} bold={true}/>
              </div>
              <div className={styles.ringInfo}>
                <div className={styles.dFlex}>
                  <Text className={styles.bold} content={"Poder:"} color={"#000"} size={"small"} bold={true}/>
                  <Text content={"Controlar o vento"} color={"#4c2e03"} size={"small"} bold={false}/>
                </div>
                <div className={styles.dFlex}>
                  <Text className={styles.bold} content={"Portador:"} color={"#000"} size={"small"} bold={true}/>
                  <Text content={"Elrond"} color={"#4c2e03"} size={"small"} bold={false}/>
                </div>
                <div className={styles.dFlex}>
                  <Text className={styles.bold} content={"Forjado por:"} color={"#000"} size={"small"} bold={true}/>
                  <Text content={"Celebrimbor"} color={"#4c2e03"} size={"small"} bold={false}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;