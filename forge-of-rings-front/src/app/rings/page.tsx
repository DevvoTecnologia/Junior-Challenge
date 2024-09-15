import { useEffect, useState } from "react";
import { CustomSlider } from "../../components/CustomSlider/CustomSlider";
import { CreateNewRingModal } from "./components/CreateNewRingModal/CreateNewRingModal";

import styles from './styles.module.css';

type Ring = {
  id: string;
  name: string;
  power: string;
  bearer: string;
  forgedBy: string;
  image: string;
}

export function Rings() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isRealod, setIsReload] = useState(false);
  const [rings, setRings] = useState<Ring[]>([]);

  useEffect(() => {
    fetchRings();
  }, [isOpenModal, isRealod]);

  const fetchRings = async () => {
    const response = await fetch('http://localhost:3000/rings', {
      method: 'GET'
    });

    if (response.status === 200) {
      const data = await response.json();

      setRings(data);
    }
  };

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal);
  }

  return (
    <main className={styles.Container}>
      <div className={styles.ContainerHeader}>
        <CreateNewRingModal
          isOpen={isOpenModal}
          toggleModal={handleToggleModal}
        />
        <h2>ANÉIS FORJADOS</h2>
      </div>

      <CustomSlider
        cards={rings}
        reload={() => setIsReload(!isRealod)}
      />
    </main>
  );
}
