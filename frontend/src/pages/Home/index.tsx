import { Menu } from "../../components/Menu";
import { RingCarousel } from "../../components/RingCarousel";
import { useRings } from "../../hooks/useRings";
import * as S from "./styles";

export function Home() {
  const { rings } = useRings();
  console.log("🚀 ~ Home ~ rings:", rings);
  return (
    <>
      <Menu />
      <S.Container>
        <RingCarousel />
      </S.Container>
    </>
  );
}
