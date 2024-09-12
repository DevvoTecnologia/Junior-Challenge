import NextImage from "next/image";
import styles from "./ringCard.module.css";
import MadeBy from "@/models/madeBy";

export default function RingCard(props: {
  ringName: string,
  power: string,
  holder: string,
  madeBy: MadeBy,
  imageUrl: string
}) {
  return (
    <div className={styles.ringCard}>
      <NextImage
        src={props.imageUrl}
        alt={`${props.ringName} ring image`}
        width={100}
        height={100}
      />
      <h1>"{props.ringName}"</h1>
      <div>
        <h2>Poder: </h2>
        <span>{props.power}</span>
      </div>
      <div>
        <h3>Pertence a:</h3>
        <span>{props.holder}</span>
      </div>
      <div>
        <h4>Feito por: </h4>
        <span>{props.madeBy}</span>
      </div>
    </div>
  )
}