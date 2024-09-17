import Slider from "react-slick";
import { Card } from "./components/Card";
import { useRing } from "../../hooks/useRing";
import { SETTINGS } from "../../constants";

import styles from "./styles.module.css";
import { CreateRing } from "../CreateRing";

export function RingCarousel() {
  const { rings } = useRing()

  return (
    <main className={styles['carousel-container']}>
      <h1 className={styles.title}>Lord of the Rings</h1>

      <CreateRing />

      <div>
        <Slider {...SETTINGS}>
          {rings.map(ring => (
            <Card key={ring.id} item={ring} />
          ))}
        </Slider>
      </div>
    </main>
  )
}