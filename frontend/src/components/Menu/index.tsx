import * as S from "./styles";

export function Menu() {
  return (
    <S.Container>
      <S.NavLink href="/">Home</S.NavLink>
      <S.NavLink href="/create">Novo Anel</S.NavLink>
    </S.Container>
  );
}
