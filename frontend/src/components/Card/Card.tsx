import React, { useState } from 'react';
import Text from '../Text/Text';
import styles from './Card.module.css';

interface CardProps {
  imgSrc: string;
  name: string;
  power: string;
  carrier: string;
  forgedBy: string;
}

const Card: React.FC<CardProps> = ({ imgSrc, name, power, carrier, forgedBy }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className={styles.cardWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.card}>
        <div className={styles.img}>
          <img src={imgSrc} alt={name} />
        </div>
        <div className={styles.infoCard}>
          <div className={styles.titleCard}>
            <Text content={name} color={"#000"} size={"medium"} bold={true} />
          </div>
          <div className={styles.ringInfo}>
            <div className={styles.dFlex}>
              <Text className={styles.bold} content={"Poder:"} color={"#000"} size={"small"} bold={true} />
              <Text content={power} color={"#4c2e03"} size={"small"} bold={false} />
            </div>
            <div className={styles.dFlex}>
              <Text className={styles.bold} content={"Portador:"} color={"#000"} size={"small"} bold={true} />
              <Text content={carrier} color={"#4c2e03"} size={"small"} bold={false} />
            </div>
            <div className={styles.dFlex}>
              <Text className={styles.bold} content={"Forjado por:"} color={"#000"} size={"small"} bold={true} />
              <Text content={forgedBy} color={"#4c2e03"} size={"small"} bold={false} />
            </div>
          </div>
        </div>
      </div>

      {showTooltip && (
        <div className={styles.tooltip}>
          <Text content="Clique no anel para editar" color={"#fff"} size={"small"} bold={false} />
        </div>
      )}
    </div>
  );
};

export default Card;