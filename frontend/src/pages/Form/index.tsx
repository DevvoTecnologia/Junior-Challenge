import { Menu } from "../../components/Menu";
import * as S from "./styles";

import { RingForm } from "../../components/RingForm";

export function Form() {
  return (
    <>
      <Menu />
      <S.Container>
        <RingForm />
      </S.Container>
    </>
  );
}
