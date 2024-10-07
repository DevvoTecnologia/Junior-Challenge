
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import Button from '../../components/Button/Button';
import styles from './Home.module.css';
import { LiaRingSolid } from "react-icons/lia";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleAddRing = () => {
    navigate('/register');
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <Carousel />
      </div>
      <div className={styles.buttonContainer}>
        <Button type={"button"} onClick={handleAddRing} text={"Adicionar anel"} color={"#714411"} icon={LiaRingSolid} />
      </div>
    </div>
  );
};

export default Home;