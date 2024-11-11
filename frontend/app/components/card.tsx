"use client";

import axios from "axios";
import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";

interface CardProps {
  id?: number;
  ring: string;
  power: number;
  proper: string;
  blacksmith: string;
  isDelete?: boolean;
}

export default function CardComponent(props: CardProps) {
  return (
    <div
      style={{
        backgroundImage: `url(/card.png)`,
        width: "320px",
        height: "490px",
        objectFit: "contain",
      }}
      className="mx-5 flex flex-col"
    >
      {props.isDelete && (
        <a
          onClick={() => {
            axios.delete(`/cards/${props.id}`).then(() => {
              location.reload();
            });
          }}
          className="absolute flex h-10 w-10 cursor-pointer items-center justify-center self-end rounded-b-2xl rounded-l-2xl bg-red-600"
        >
          <IoTrashOutline className="text-white" />
        </a>
      )}
      <Image
        src={"/ring.png"}
        alt="card"
        width={300}
        height={300}
        className="-z-10 mt-3 h-1/2 w-full object-cover"
      />
      <div className="from-orange-950 -z-10 h-2 bg-gradient-to-br to-orange-300 px-5" />
      <div className="from-orange-950 -z-10 flex h-1/2 w-full flex-1 flex-col items-center justify-start bg-opacity-50 bg-gradient-to-br to-yellow-800 px-3 py-3">
        <div className="grid w-full grid-cols-1 divide-y divide-orange-500 px-10 text-white">
          <p>Anél: {props.ring}</p>
          <p>Poder: {props.power}</p>
          <p>Proprietário: {props.proper}</p>
          <p>Ferreiro: {props.blacksmith}</p>
        </div>
      </div>
    </div>
  );
}
